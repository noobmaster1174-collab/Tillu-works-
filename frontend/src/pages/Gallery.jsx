import { motion } from 'framer-motion';
import { useState } from 'react';
import GalleryGrid from '../components/GalleryGrid';

const categories = ['All', 'ID Cards', 'Corporate', 'Apparal', 'Gifting'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="min-h-screen bg-bg">
      <section className="bg-surface pt-32 pb-20 border-b border-border">
        <div className="container-custom text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">Our <span className="text-primary">Showcase</span>.</h1>
              <p className="text-muted text-lg max-w-xl mx-auto font-medium">Take a look at some of our recent custom printing projects delivered to happy clients across India.</p>
            </motion.div>
            
            {/* Filter */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
               {categories.map((cat) => (
                 <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeCategory === cat ? 'bg-secondary text-white shadow-xl shadow-secondary/20' : 'bg-white border border-border text-muted hover:border-primary hover:text-primary'}`}
                 >
                    {cat}
                 </button>
               ))}
            </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
           <GalleryGrid category={activeCategory} />
        </div>
      </section>

      <section className="pb-24 container-custom">
         <div className="p-12 rounded-[40px] bg-primary text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl font-black mb-6 relative z-10">Inspired by our work?</h2>
            <Link to="/quote" className="inline-block px-10 py-4 bg-white text-primary font-black rounded-2xl shadow-xl shadow-white/20 hover:scale-105 active:scale-95 transition-all relative z-10">
               Start Your Project
            </Link>
         </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
