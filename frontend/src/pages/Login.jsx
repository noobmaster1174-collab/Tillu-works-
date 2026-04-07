import { useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Lock, Zap, Star, Printer, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const trustBadges = [
  { icon: ShieldCheck, label: 'SSL Secured', sub: '256-bit encryption' },
  { icon: Clock,       label: 'Auto Logout',  sub: '15-min idle timeout' },
  { icon: Lock,        label: 'Privacy Safe',  sub: 'No password stored' },
];

const floatingStats = [
  { value: '500+', label: 'Happy Clients' },
  { value: '100k+', label: 'Products Printed' },
  { value: '4.9★', label: 'Average Rating' },
];

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // If already logged in, redirect
  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  // Listen for auth events and show toasts
  useEffect(() => {
    const onError = (e) => toast.error(e.detail?.message || 'Login failed');
    window.addEventListener('auth:error', onError);
    return () => window.removeEventListener('auth:error', onError);
  }, []);

  const handleSuccess = (credentialResponse) => {
    login(credentialResponse);
    toast.success('Welcome to Tillu Works! 🎉');
  };

  const handleError = () => {
    toast.error('Google Sign-In failed. Please try again.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: 'Poppins, sans-serif',
      background: '#F8FAFC',
    }}>
      {/* ---- LEFT PANEL (branding) ---- */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          flex: 1,
          background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 56px',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="login-left-panel"
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,107,0,0.1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: 240, height: 240, borderRadius: '50%', border: '1px solid rgba(255,107,0,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-80px', width: 350, height: 350, borderRadius: '50%', border: '1px solid rgba(255,107,0,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 200, right: 0, width: 200, height: 200, background: 'radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: '#FF6B00',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(255,107,0,0.4)',
          }}>
            <span style={{ fontWeight: 800, color: '#fff', fontSize: 20 }}>T</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: 22, color: '#fff', letterSpacing: '-0.5px' }}>Tillu Works</span>
        </div>

        {/* Main copy */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,107,0,0.15)', borderRadius: 100,
              padding: '6px 14px', marginBottom: 28,
            }}>
              <Printer size={14} color="#FF6B00" />
              <span style={{ color: '#FF6B00', fontWeight: 700, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>
                Customer Portal
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              marginBottom: 20,
            }}>
              Your Brand,<br />
              <span style={{ color: '#FF6B00' }}>Beautifully</span><br />
              Printed.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.7, maxWidth: 360, fontWeight: 500 }}>
              Sign in to track your orders, manage quotes, and access exclusive printing deals for businesses across Hyderabad.
            </p>
          </motion.div>

          {/* Floating stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}
          >
            {floatingStats.map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: '14px 20px',
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{ color: '#FF6B00', fontWeight: 800, fontSize: 20 }}>{s.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Trust badges bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 1 }}
        >
          {trustBadges.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(255,107,0,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <b.icon size={16} color="#FF6B00" />
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1 }}>{b.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 500, marginTop: 2 }}>{b.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ---- RIGHT PANEL (sign-in card) ---- */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          width: '100%',
          maxWidth: 520,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px',
          background: '#fff',
          position: 'relative',
        }}
        className="login-right-panel"
      >
        {/* Back link */}
        <Link
          to="/"
          style={{
            position: 'absolute', top: 32, left: 48,
            display: 'flex', alignItems: 'center', gap: 6,
            color: '#64748B', fontWeight: 600, fontSize: 13,
            textDecoration: 'none', transition: 'color 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.color = '#FF6B00'}
          onMouseOut={e => e.currentTarget.style.color = '#64748B'}
        >
          <ArrowLeft size={15} /> Back to site
        </Link>

        <div style={{ maxWidth: 380, margin: '0 auto', width: '100%' }}>
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 style={{
              fontSize: 32, fontWeight: 900, color: '#0F172A',
              letterSpacing: '-1px', marginBottom: 8, lineHeight: 1.15,
            }}>
              Welcome back 👋
            </h2>
            <p style={{ color: '#64748B', fontSize: 15, fontWeight: 500, marginBottom: 40, lineHeight: 1.6 }}>
              Sign in with your Google account to access your Tillu Works dashboard.
            </p>
          </motion.div>

          {/* Google Sign In button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{ marginBottom: 32 }}
          >
            {/* Custom styled container for Google button */}
            <div style={{
              border: '2px solid #E2E8F0',
              borderRadius: 16,
              overflow: 'hidden',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,107,0,0.12)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
            >
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                width="100%"
                size="large"
                shape="rectangular"
                logo_alignment="center"
                text="signin_with_google"
                useOneTap={false}
              />
            </div>
          </motion.div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
            <span style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
              SECURED BY GOOGLE
            </span>
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
          </div>

          {/* Security info cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}
          >
            {[
              { icon: ShieldCheck, text: 'We never store your Google password', color: '#10B981' },
              { icon: Clock,       text: 'Auto-logout after 15 minutes of inactivity', color: '#FF6B00' },
              { icon: Lock,        text: 'Session ends when you close the browser tab', color: '#6366F1' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                background: '#F8FAFC', borderRadius: 12, padding: '12px 14px',
                border: '1px solid #E2E8F0',
              }}>
                <item.icon size={16} color={item.color} style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ color: '#475569', fontSize: 13, fontWeight: 500, lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Footer note */}
          <p style={{ color: '#94A3B8', fontSize: 12, textAlign: 'center', lineHeight: 1.7, fontWeight: 500 }}>
            By signing in, you agree to our{' '}
            <a href="#" style={{ color: '#FF6B00', textDecoration: 'none' }}>Terms of Service</a>{' '}
            and{' '}
            <a href="#" style={{ color: '#FF6B00', textDecoration: 'none' }}>Privacy Policy</a>.
            <br />Your data is protected under enterprise security standards.
          </p>
        </div>

        {/* Mobile: bottom branding */}
        <div style={{
          display: 'none',
          position: 'absolute', bottom: 24, left: 0, right: 0,
          textAlign: 'center',
        }} className="login-mobile-footer">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, background: '#FF6B00', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>T</span>
            </div>
            <span style={{ fontWeight: 700, color: '#0F172A', fontSize: 15 }}>Tillu Works</span>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .login-left-panel { display: none !important; }
          .login-right-panel { max-width: 100% !important; padding: 80px 28px 60px !important; }
          .login-mobile-footer { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
