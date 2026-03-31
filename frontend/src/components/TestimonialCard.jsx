import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

export default function TestimonialCard({ name, role, content, rating = 5 }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-surface p-8 rounded-3xl border border-border flex flex-col h-full transition-all duration-300"
    >
      <div className="flex gap-1 text-accent mb-6">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>
      
      <div className="relative mb-8">
        <Quote className="absolute -top-4 -left-4 text-primary/10 w-12 h-12" />
        <p className="text-secondary font-medium leading-relaxed relative z-10 italic">
          "{content}"
        </p>
      </div>
      
      <div className="mt-auto flex items-center gap-4">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-primary/20">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-secondary text-sm">{name}</h4>
          <p className="text-muted text-xs font-semibold uppercase tracking-wider">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
