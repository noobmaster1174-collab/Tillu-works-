import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuoteModal({ isOpen, onClose, product }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const waMessage = encodeURIComponent(
    `Hi Tillu Works! I'd like to get a quote for ${product?.name || 'custom printing'}. Please send me the details.`
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] p-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FFD700] flex items-center justify-center text-xl">
                    {product?.icon || '🖨️'}
                  </div>
                  <div>
                    <p className="text-[#FFD700] font-dm text-xs uppercase tracking-widest">Quick Quote</p>
                    <h3 className="font-syne font-bold text-white text-xl">{product?.name}</h3>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="bg-[#FAF9F6] rounded-2xl p-4 mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#6B7280] font-dm text-sm">Starting Price</span>
                    <span className="font-syne font-bold text-[#FF6B00] text-lg">{product?.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280] font-dm text-sm">Minimum Order</span>
                    <span className="font-dm font-medium text-[#1A1A1A]">{product?.minQty} {product?.unit}s</span>
                  </div>
                </div>

                <p className="text-[#4B5563] font-dm text-sm leading-relaxed mb-6">
                  For accurate pricing based on your quantity and customization requirements, please use our quote form or reach out directly via WhatsApp.
                </p>

                <div className="space-y-3">
                  {/* Full quote form */}
                  <Link
                    to="/quote"
                    onClick={onClose}
                    className="btn-press w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#FFD700] text-white font-syne font-bold rounded-2xl shadow-lg hover:shadow-[#FF6B00]/30 transition-all"
                  >
                    Fill Quote Form
                    <ArrowRight size={18} />
                  </Link>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/91XXXXXXXXXX?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white font-syne font-bold rounded-2xl hover:bg-[#20b858] transition-all"
                  >
                    <MessageCircle size={18} />
                    Chat on WhatsApp
                  </a>

                  {/* Call */}
                  <a
                    href="tel:+919999999999"
                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#F0EDE6] text-[#1A1A1A] font-dm font-medium rounded-2xl hover:border-[#FF6B00]/30 transition-colors text-sm"
                  >
                    <Phone size={16} />
                    Call +91 99999 99999
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
