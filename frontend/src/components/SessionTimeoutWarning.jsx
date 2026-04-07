import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Clock, LogOut, RefreshCw } from 'lucide-react';

const WARN_DURATION_MS = 60 * 1000; // 60 seconds countdown

/**
 * SessionTimeoutWarning — Shows a countdown banner 60 seconds before idle logout.
 * Dismissable by clicking "Stay Logged In" (resets idle timer via any user interaction).
 */
export default function SessionTimeoutWarning() {
  const { showWarn, setShowWarn, logout } = useAuth();
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (!showWarn) { setSeconds(60); return; }

    setSeconds(60);
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showWarn]);

  const handleStay = () => {
    // Any interaction auto-resets the idle timer via the event listener in AuthContext
    setShowWarn(false);
    // Trigger a synthetic activity event
    window.dispatchEvent(new Event('mousemove'));
  };

  return (
    <AnimatePresence>
      {showWarn && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            fontFamily: 'Poppins, sans-serif',
            width: 'calc(100% - 32px)',
            maxWidth: 520,
          }}
        >
          <div style={{
            background: '#0F172A',
            borderRadius: 20,
            padding: '20px 24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,107,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40,
                borderRadius: '50%',
                background: 'rgba(255,107,0,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Clock size={20} color="#FF6B00" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: 0, lineHeight: 1.3 }}>
                  Session Expiring Soon
                </p>
                <p style={{ color: '#94A3B8', fontWeight: 500, fontSize: 13, margin: '2px 0 0' }}>
                  You'll be logged out due to inactivity
                </p>
              </div>
              {/* Countdown ring */}
              <div style={{
                width: 52, height: 52,
                borderRadius: '50%',
                background: seconds <= 15 ? 'rgba(239,68,68,0.15)' : 'rgba(255,107,0,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                border: `3px solid ${seconds <= 15 ? '#EF4444' : '#FF6B00'}`,
              }}>
                <span style={{
                  fontWeight: 800,
                  fontSize: 16,
                  color: seconds <= 15 ? '#EF4444' : '#FF6B00',
                }}>{seconds}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div
                style={{
                  height: '100%',
                  background: seconds <= 15 ? '#EF4444' : '#FF6B00',
                  borderRadius: 4,
                }}
                animate={{ width: `${(seconds / 60) * 100}%` }}
                transition={{ duration: 1, ease: 'linear' }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={handleStay}
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  background: '#FF6B00',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'background 0.2s',
                }}
              >
                <RefreshCw size={16} /> Stay Logged In
              </button>
              <button
                onClick={() => logout('manual')}
                style={{
                  padding: '11px 20px',
                  background: 'rgba(255,255,255,0.07)',
                  color: '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
