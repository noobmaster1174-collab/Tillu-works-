import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-6 z-50 w-11 h-11 bg-[#1A1A1A] border border-[#FF6B00]/30 rounded-xl flex items-center justify-center shadow-lg hover:bg-[#FF6B00] hover:border-[#FF6B00] transition-all duration-200 group"
        >
          <ArrowUp size={18} className="text-[#FF6B00] group-hover:text-white transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
