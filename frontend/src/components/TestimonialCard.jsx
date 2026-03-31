import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-white rounded-2xl p-7 shadow-sm border border-[#F0EDE6] flex flex-col h-full relative overflow-hidden group hover:shadow-lg hover:border-[#FF6B00]/20 transition-all duration-300"
    >
      {/* Decorative quote icon */}
      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Quote size={80} className="text-[#FF6B00]" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={16} className="text-[#FFD700] fill-[#FFD700]" />
        ))}
      </div>

      {/* Review text */}
      <p className="text-[#4B5563] font-dm text-sm leading-relaxed flex-1 mb-6 italic">
        "{testimonial.review}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4 border-t border-[#F0EDE6]">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FFD700] flex items-center justify-center shadow-md">
          <span className="font-syne font-black text-white text-sm">{testimonial.avatar}</span>
        </div>
        <div>
          <p className="font-syne font-bold text-[#1A1A1A] text-sm">{testimonial.name}</p>
          <p className="text-[#9CA3AF] font-dm text-xs">{testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
}
