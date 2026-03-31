import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import QuoteModal from './QuoteModal';

export default function ProductCard({ product, index = 0, loading = false }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="skeleton h-56 w-full" />
        <div className="p-6 space-y-3">
          <div className="skeleton h-6 w-3/4" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-10 w-full mt-4" />
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        id={product.id}
        className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-[#F0EDE6] group"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          {!imgLoaded && <div className="skeleton absolute inset-0" />}
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-[#1A1A1A]/80 backdrop-blur-sm text-white font-dm text-xs rounded-full">
              {product.icon} {product.category}
            </span>
          </div>
          {/* Price badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FFD700] text-white font-syne font-bold text-xs rounded-full shadow-lg">
              {product.price}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-syne font-bold text-[#1A1A1A] text-xl">{product.name}</h3>
            <div className="flex items-center gap-0.5 shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-[#FFD700] fill-[#FFD700]" />
              ))}
            </div>
          </div>
          <p className="text-[#6B7280] font-dm text-sm leading-relaxed mb-4">{product.shortDesc}</p>

          {/* Features */}
          <ul className="space-y-1.5 mb-5">
            {product.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs font-dm text-[#4B5563]">
                <CheckCircle size={13} className="text-[#FF6B00] shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* Min order info */}
          <p className="text-xs text-[#9CA3AF] font-dm mb-4">Min. order: {product.minQty} {product.unit}s</p>

          <button
            onClick={() => setModalOpen(true)}
            className="btn-press w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#FF6B00] to-[#FFD700] text-white font-syne font-bold text-sm rounded-xl shadow-md hover:shadow-[#FF6B00]/30 transition-all duration-200 group/btn"
          >
            Get Quote
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      <QuoteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} product={product} />
    </>
  );
}
