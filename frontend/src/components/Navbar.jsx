import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, PhoneCall, LogOut, ChevronDown, User, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/orders', label: 'Track Order' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [location]);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout('manual');
    setProfileOpen(false);
    setIsOpen(false);
    toast.success('Signed out successfully');
    navigate('/');
  };

  const isDarkHeader = ['/products', '/about', '/orders'].includes(location.pathname);
  const isLoginPage = location.pathname === '/login';
  const textColor = scrolled ? 'text-secondary' : isDarkHeader ? 'text-white' : 'text-secondary';
  const textMutedColor = scrolled ? 'text-secondary/70' : isDarkHeader ? 'text-white/80' : 'text-secondary/70';

  // Don't render navbar on login page
  if (isLoginPage) return null;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-border py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
              <span className="font-bold text-white text-lg">T</span>
            </div>
            <span className={`font-bold text-xl tracking-tight ${textColor}`}>
              Tillu Works
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold transition-all hover:text-primary ${location.pathname === link.to ? 'text-primary' : textMutedColor}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Auth section */}
            {user ? (
              // ---- Logged in: Profile dropdown ----
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(p => !p)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-surface transition-all group"
                >
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-primary/20 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User size={16} className="text-primary" />
                    </div>
                  )}
                  <div className="text-left">
                    <div className={`text-xs font-bold leading-tight ${textColor}`}>
                      {user.name?.split(' ')[0]}
                    </div>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''} ${textMutedColor}`}
                  />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-white border border-border rounded-2xl shadow-2xl overflow-hidden"
                    >
                      {/* User info */}
                      <div className="p-4 border-b border-border bg-surface">
                        <div className="flex items-center gap-3">
                          {user.picture ? (
                            <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full border-2 border-primary/20" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <User size={18} className="text-primary" />
                            </div>
                          )}
                          <div className="overflow-hidden">
                            <div className="font-bold text-secondary text-sm truncate">{user.name}</div>
                            <div className="text-muted text-xs font-medium truncate">{user.email}</div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-green-600 font-semibold">
                          <ShieldCheck size={12} />
                          Verified via Google
                        </div>
                      </div>

                      {/* Admin Link */}
                      {user.isAdmin && (
                        <Link 
                          to="/admin"
                          onClick={() => setProfileOpen(false)}
                          className="w-full border-b border-border flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-secondary hover:bg-surface transition-colors"
                        >
                          <ShieldCheck size={16} className="text-primary" />
                          Admin Portal
                        </Link>
                      )}

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // ---- Logged out: Login button ----
              <Link
                to="/login"
                className="px-5 py-2.5 border-2 border-primary text-primary font-bold rounded-xl text-sm hover:bg-primary hover:text-white transition-all"
              >
                Sign In
              </Link>
            )}

            {/* Shopping Cart */}
            <Link to="/quote" className="relative p-2 rounded-xl group transition-colors hover:bg-surface">
              <ShoppingBag size={20} className={textColor} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link to="/quote" className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              Get a Quote
            </Link>
          </div>

          {/* Mobile UI */}
          <div className="lg:hidden flex items-center gap-3">
            <Link to="/quote" className="relative p-2">
              <ShoppingBag size={22} className={scrolled || !isDarkHeader ? 'text-secondary' : 'text-white'} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-4.5 h-4.5 bg-primary text-white text-[8px] font-black rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            {user && (
              <button onClick={handleLogout} className={`p-2 rounded-xl transition-colors ${scrolled || !isDarkHeader ? 'text-secondary' : 'text-white'}`}>
                <LogOut size={20} />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-colors ${scrolled || !isDarkHeader ? 'hover:bg-surface text-secondary' : 'hover:bg-white/10 text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-[76px] bg-white z-40 lg:hidden"
          >
            <div className="flex flex-col p-8 gap-6 h-full font-poppins">
              {/* User info on mobile */}
              {user && (
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  {user.picture ? (
                    <img src={user.picture} alt={user.name} className="w-12 h-12 rounded-full border-2 border-primary/20" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User size={20} className="text-primary" />
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-secondary text-base">{user.name}</div>
                    <div className="text-muted text-xs">{user.email}</div>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-3xl font-bold transition-all ${location.pathname === link.to ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {user?.isAdmin && (
                <Link
                  to="/admin"
                  className={`text-3xl font-bold transition-all flex items-center gap-3 ${location.pathname === '/admin' ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                  onClick={() => setIsOpen(false)}
                >
                  <ShieldCheck size={28} className="text-primary"/> Admin Portal
                </Link>
              )}
              
              <hr className="border-border my-2" />
              <Link to="/quote" className="w-full py-5 bg-primary text-white text-center rounded-2xl font-bold text-xl shadow-xl shadow-primary/20">
                Get a Quote
              </Link>
              {!user ? (
                <Link to="/login" className="w-full py-4 border-2 border-primary text-primary text-center rounded-2xl font-bold text-lg">
                  Sign In
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full py-4 border-2 border-red-200 text-red-500 text-center rounded-2xl font-bold text-lg flex items-center justify-center gap-2"
                >
                  <LogOut size={20} /> Sign Out
                </button>
              )}
              <div className="mt-auto flex items-center gap-4 text-muted">
                <PhoneCall size={20} className="text-primary" />
                <span className="font-semibold">+91 99999 99999</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
