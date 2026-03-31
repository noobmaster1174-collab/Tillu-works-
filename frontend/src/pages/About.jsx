import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Heart, Target, Users, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  { icon: <ShieldCheck size={28} className="text-primary" />, title: "Quality First", desc: "Every print is inspected for perfection. No fading, no peeling, only the best quality." },
  { icon: <Zap size={28} className="text-primary" />, title: "Rapid Delivery", desc: "We understand that time is money. Most of our projects are delivered within 2-4 working days." },
  { icon: <Gem size={28} className="text-primary" />, title: "Premium Pricing", desc: "We offer the most competitive prices in Hyderabad for bulk corporate orders." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-bg">
      <section className="bg-secondary pt-40 pb-32 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary/20 rounded-full text-primary font-black text-xs uppercase tracking-[0.2em] mb-6">Our Story</span>
              <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">Your Brand, <br /><span className="gradient-text">Beautifully Printed</span>.</h1>
            </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="relative group overflow-hidden rounded-[40px] shadow-2xl">
                <div className="aspect-[4/3] bg-surface flex items-center justify-center">
                   <div className="text-[12rem] animate-float select-none grayscale group-hover:grayscale-0 transition-all duration-700">🏢</div>
                </div>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             
             <div>
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[1.2]">The Tillu Works <br />Legacy in Hyderabad.</h2>
                <p className="text-muted text-lg font-medium leading-relaxed mb-6">
                  Tillu Works was founded on a simple principle: to make professional custom printing accessible to every business in Hyderabad, from small startups to large corporate houses.
                </p>
                <p className="text-muted text-lg font-medium leading-relaxed mb-10">
                  Over the past few years, we have grown from a small workshop into a leading provider of custom ID cards, luxury corporate gifts, and branded apparal. Our focus remains on combining cutting-edge printing technology with old-school craftsmanship.
                </p>
                
                <div className="grid grid-cols-2 gap-8 border-t border-border pt-10">
                   <div>
                      <div className="text-4xl font-black text-secondary">500+</div>
                      <div className="text-muted font-bold text-xs uppercase tracking-widest mt-1">Clients Served</div>
                   </div>
                   <div>
                      <div className="text-4xl font-black text-secondary">100k+</div>
                      <div className="text-muted font-bold text-xs uppercase tracking-widest mt-1">Prints Delivered</div>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      <section className="bg-surface py-24 section-padding">
        <div className="container-custom">
           <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-black mb-6">Our Values.</h2>
              <p className="text-muted font-medium">These core values drive every decision we make at Tillu Works.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-10 rounded-[32px] shadow-sm border border-border group hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                   <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                      {v.icon}
                   </div>
                   <h4 className="text-xl font-bold mb-4">{v.title}</h4>
                   <p className="text-muted font-medium text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>
      
      <section className="py-24">
         <div className="container-custom text-center">
            <h2 className="text-3xl font-black mb-10">Want to work with us?</h2>
            <Link to="/contact" className="btn-primary inline-flex">Join the Family</Link>
         </div>
      </section>
    </div>
  );
}
