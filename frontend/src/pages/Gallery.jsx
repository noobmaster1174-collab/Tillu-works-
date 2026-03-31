import { motion } from 'framer-motion';
import GalleryGrid from '../components/GalleryGrid';

export default function Gallery() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Hero */}
      <section className="bg-[#1A1A1A] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#FFD700 1px, transparent 1px), linear-gradient(90deg, #FFD700 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#FFD700]/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#FFD700]/20 rounded-full text-[#FFD700] font-dm text-sm font-medium mb-4">
              Our Work
            </span>
            <h1 className="font-syne font-black text-white text-4xl md:text-5xl lg:text-6xl mb-5">
              Product <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-white/60 font-dm text-lg max-w-2xl mx-auto">
              Browse our printed and engraved products. Every piece is crafted with care and precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
