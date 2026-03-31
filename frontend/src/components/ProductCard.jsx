import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ id, name, description, category, price, icon, image }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col"
    >
      <div className="relative aspect-square bg-surface overflow-hidden flex items-center justify-center p-8">
        <div className="text-6xl group-hover:scale-110 transition-transform duration-500 select-none">
          {icon}
        </div>
        
        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-border rounded-full text-[10px] font-bold uppercase tracking-wider text-muted">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-xl mb-2 text-secondary group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted text-sm line-clamp-2 mb-6 font-medium">
          {description}
        </p>
        
        <div className="mt-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted font-bold uppercase tracking-tighter">Starting from</p>
            <p className="text-xl font-black text-secondary">{price}</p>
          </div>
          
          <Link 
            to={`/quote?product=${id}`}
            className="w-12 h-12 rounded-2xl bg-secondary text-white flex items-center justify-center hover:bg-primary transition-all duration-300 shadow-lg group-hover:rotate-12"
          >
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
