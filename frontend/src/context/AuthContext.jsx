/**
 * AuthContext — Enterprise-Grade Session Management
 *
 * Security Features:
 *  - Google OAuth 2.0 via @react-oauth/google
 *  - sessionStorage (cleared on tab/browser close)
 *  - 15-minute idle timeout (resets on user interaction)
 *  - 8-hour absolute session expiry
 *  - Tamper detection (validates stored session shape)
 *  - Dispatches custom events for UI warnings
 */

import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

// ----- Constants -----
const IDLE_TIMEOUT_MS    = 15 * 60 * 1000;   // 15 minutes
const ABS_EXPIRY_MS      = 8  * 60 * 60 * 1000; // 8 hours
const WARN_BEFORE_MS     = 60 * 1000;          // Show warning 60 s before idle logout
const SESSION_KEY        = 'tw_session';

const USER_EVENTS = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

// ----- Helpers -----
function saveSession(user) {
  const payload = {
    user,
    loginAt: Date.now(),
    _v: 1,
  };
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  } catch {
    // sessionStorage full or blocked
  }
}

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const payload = JSON.parse(raw);
    // Tamper detection: must have expected structure
    if (!payload?._v || !payload?.loginAt || !payload?.user?.email) return null;
    // Absolute expiry check
    if (Date.now() - payload.loginAt > ABS_EXPIRY_MS) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return payload;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

// ----- Context -----
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWarn, setShowWarn] = useState(false);

  // Refs for timers (survive re-renders without triggering them)
  const idleTimer    = useRef(null);
  const warnTimer    = useRef(null);
  const absTimer     = useRef(null);

  // ----- Logout -----
  const logout = useCallback((reason = 'manual') => {
    clearSession();
    setUser(null);
    setShowWarn(false);
    clearTimeout(idleTimer.current);
    clearTimeout(warnTimer.current);
    clearTimeout(absTimer.current);

    // Fire event so any component can react (e.g. show a toast)
    window.dispatchEvent(new CustomEvent('auth:logout', { detail: { reason } }));
  }, []);

  // ----- Reset idle timer on user activity -----
  const resetIdleTimer = useCallback(() => {
    setShowWarn(false);
    clearTimeout(idleTimer.current);
    clearTimeout(warnTimer.current);

    // Warn 60 s before idle logout
    warnTimer.current = setTimeout(() => {
      setShowWarn(true);
      window.dispatchEvent(new CustomEvent('auth:idle-warning'));
    }, IDLE_TIMEOUT_MS - WARN_BEFORE_MS);

    // Force logout on idle
    idleTimer.current = setTimeout(() => {
      logout('idle');
    }, IDLE_TIMEOUT_MS);
  }, [logout]);

  // ----- Start absolute expiry timer -----
  const startAbsTimer = useCallback((loginAt) => {
    clearTimeout(absTimer.current);
    const remaining = ABS_EXPIRY_MS - (Date.now() - loginAt);
    if (remaining <= 0) { logout('expired'); return; }
    absTimer.current = setTimeout(() => logout('expired'), remaining);
  }, [logout]);

  // ----- Login (called by Google callback) -----
  const login = useCallback((credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        email:   decoded.email,
        name:    decoded.name,
        picture: decoded.picture,
        sub:     decoded.sub,          // Google user ID
        token:   credentialResponse.credential, // the raw JWT
        isAdmin: decoded.email.toLowerCase() === 'phanindra1174@gmail.com'
      };
      saveSession(userData);
      setUser(userData);
      resetIdleTimer();
      startAbsTimer(Date.now());
      window.dispatchEvent(new CustomEvent('auth:login', { detail: { user: userData } }));
    } catch (err) {
      console.error('[Auth] Failed to decode Google credential:', err);
      window.dispatchEvent(new CustomEvent('auth:error', { detail: { message: 'Login failed. Please try again.' } }));
    }
  }, [resetIdleTimer, startAbsTimer]);

  // ----- Restore session on mount -----
  useEffect(() => {
    const payload = loadSession();
    if (payload) {
      setUser(payload.user);
      resetIdleTimer();
      startAbsTimer(payload.loginAt);
    }
    setLoading(false);
  }, [resetIdleTimer, startAbsTimer]);

  // ----- Attach/detach activity listeners -----
  useEffect(() => {
    if (!user) return;
    USER_EVENTS.forEach(evt => window.addEventListener(evt, resetIdleTimer, { passive: true }));
    return () => {
      USER_EVENTS.forEach(evt => window.removeEventListener(evt, resetIdleTimer));
    };
  }, [user, resetIdleTimer]);

  // ----- Cleanup on unmount -----
  useEffect(() => {
    return () => {
      clearTimeout(idleTimer.current);
      clearTimeout(warnTimer.current);
      clearTimeout(absTimer.current);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, showWarn, setShowWarn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
