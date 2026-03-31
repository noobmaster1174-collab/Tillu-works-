import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, PhoneCall } from 'lucide-react';

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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [location]);

  const isDarkHeader = ['/products', '/about', '/orders'].includes(location.pathname);
  const textColor = scrolled ? 'text-secondary' : isDarkHeader ? 'text-white' : 'text-secondary';
  const textMutedColor = scrolled ? 'text-secondary/70' : isDarkHeader ? 'text-white/80' : 'text-secondary/70';

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
            <Link to="/quote" className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              Get a Quote
            </Link>
          </div>

          {/* Mobile UI */}
          <div className="lg:hidden flex items-center gap-4">
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
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-3xl font-bold transition-all ${location.pathname === link.to ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-border my-2" />
              <Link to="/quote" className="w-full py-5 bg-primary text-white text-center rounded-2xl font-bold text-xl shadow-xl shadow-primary/20">
                Get a Quote
              </Link>
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
