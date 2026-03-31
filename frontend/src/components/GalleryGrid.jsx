import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { galleryItems } from '../data/products';
import { ZoomIn } from 'lucide-react';

const categories = ['All', 'ID Cards', 'Bottles', 'Mugs', 'Pens', 'Keychains', 'Diaries'];

export default function GalleryGrid() {
  const [active, setActive] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = active === 'All' ? galleryItems : galleryItems.filter((g) => g.category === active);
  const slides = filtered.map((g) => ({ src: g.src, alt: g.alt }));

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`btn-press px-5 py-2 rounded-full font-dm font-medium text-sm transition-all duration-200 ${
              active === cat
                ? 'bg-gradient-to-r from-[#FF6B00] to-[#FFD700] text-white shadow-lg shadow-[#FF6B00]/30'
                : 'bg-white border border-[#F0EDE6] text-[#6B7280] hover:border-[#FF6B00]/30 hover:text-[#FF6B00]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        <AnimatePresence>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
              onClick={() => openLightbox(i)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-white font-dm text-sm font-medium">{item.alt}</span>
                <span className="text-[#FFD700] font-dm text-xs">{item.category}</span>
              </div>
              {/* Zoom icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn size={14} className="text-white" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        index={lightboxIndex}
      />
    </>
  );
}
