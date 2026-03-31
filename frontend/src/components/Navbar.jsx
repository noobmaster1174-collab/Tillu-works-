import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const isHome = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? 'bg-[#1A1A1A]/95 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FFD700] flex items-center justify-center shadow-lg group-hover:shadow-[#FF6B00]/40 transition-all duration-300">
                <span className="font-syne font-black text-white text-sm tracking-tight">TW</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-syne font-bold text-white text-lg leading-tight">Tillu Works</p>
                <p className="text-[10px] text-[#FFD700] font-dm leading-none">Your Brand, Beautifully Printed</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-dm font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'text-[#FF6B00] bg-[#FF6B00]/10'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/quote"
                className="btn-press px-5 py-2.5 bg-gradient-to-r from-[#FF6B00] to-[#FFD700] text-white font-syne font-bold text-sm rounded-xl shadow-lg shadow-[#FF6B00]/30 hover:shadow-[#FF6B00]/50 transition-all duration-200"
              >
                Get Free Quote
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#1A1A1A]/98 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-dm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-[#FF6B00] bg-[#FF6B00]/10'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/quote"
                className="mt-3 px-5 py-3 bg-gradient-to-r from-[#FF6B00] to-[#FFD700] text-white font-syne font-bold text-center rounded-xl shadow-lg"
              >
                Get Free Quote
              </Link>
              <a
                href="tel:+919999999999"
                className="flex items-center justify-center gap-2 px-5 py-3 border border-white/20 text-white/80 rounded-xl font-dm text-sm hover:bg-white/5 transition-colors"
              >
                <Phone size={15} />
                +91 99999 99999
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
