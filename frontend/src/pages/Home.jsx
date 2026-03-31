import { motion } from 'framer-motion';
import { ChevronRight, Printer, Star, ShieldCheck, Zap, ArrowRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import HowItWorks from '../components/HowItWorks';
import TestimonialCard from '../components/TestimonialCard';

const testimonials = [
  { name: "Phani Kumar", role: "Business Owner", content: "The ID cards we ordered were of exceptional quality. The print is sharp and doesn't fade. Best in Hyderabad!", rating: 5 },
  { name: "Rahul S.", role: "Event Manager", content: "Needed custom keychains in bulk for an event on short notice. Tillu Works delivered them in 2 days. Amazing speed!", rating: 5 },
  { name: "Sneha Reddy", role: "Start-up Founder", content: "The branded mugs and pens are a big hit with our team. Very professional and reliable service.", rating: 5 },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
        {/* Decorative background Elements */}
        <div className="absolute inset-0 bg-surface z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-primary/5 rounded-full opacity-50" />
        </div>
        
        <div className="container-custom relative z-10 flex flex-col lg:flex-row items-center gap-16 py-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-xs uppercase tracking-widest mb-6">
                <Printer size={14} /> Custom Printing Excellence
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                Print Your <br />
                <span className="gradient-text">Success</span> Today.
              </h1>
              <p className="text-muted text-lg md:text-xl max-w-2xl lg:mx-0 mx-auto mb-10 leading-relaxed">
                Hyderabad's premium destination for custom branding and printing. From ID cards to luxury corporate gifts—we bring your brand to life with perfection.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/products" className="btn-primary w-full sm:w-auto px-10 py-5 text-lg">
                  Explore Products <ArrowRight size={20} />
                </Link>
                <Link to="/quote" className="btn-outline w-full sm:w-auto px-10 py-5 text-lg">
                  Get a Free Quote
                </Link>
              </div>
              
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 font-bold"><Zap size={18} /> Fast Delivery</div>
                <div className="flex items-center gap-2 font-bold"><ShieldCheck size={18} /> Top Quality</div>
                <div className="flex items-center gap-2 font-bold"><Star size={18} /> 4.9/5 Rating</div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="flex-1 relative hidden lg:block"
          >
            <div className="relative z-10 p-8 bg-white rounded-[40px] shadow-2xl border border-border">
               <div className="aspect-square bg-surface rounded-[32px] flex items-center justify-center overflow-hidden">
                  <div className="text-[12rem] animate-float select-none">🖨️</div>
               </div>
               
               {/* Stats float */}
               <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-border animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="text-primary font-black text-3xl">100k+</div>
                  <div className="text-muted text-sm font-bold uppercase">Products Printed</div>
               </div>

               <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl border border-border animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-1 text-accent">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <div className="text-secondary font-black text-lg">500+ Happy Clients</div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-bg">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <span className="text-primary font-bold text-sm uppercase tracking-widest mb-3 block">Premium Collection</span>
              <h2 className="text-4xl md:text-5xl font-black">Our Featured <br />Solutions.</h2>
            </div>
            <Link to="/products" className="text-primary font-bold flex items-center gap-2 group">
              View All Products <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-surface py-24">
        <HowItWorks />
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-widest mb-3 block">Success Stories</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Trusted by Thousands.</h2>
            <p className="text-muted font-medium">Join our community of happy customers who trust Tillu Works for all their branding needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <TestimonialCard {...t} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 container-custom">
        <div className="bg-secondary rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl">
           <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
           <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to bring your brand to life?</h2>
              <p className="text-white/60 text-lg mb-12 font-medium">Get a custom quote within 24 hours. Our experts are ready to help you choose the best products for your business.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Link to="/quote" className="btn-primary w-full sm:w-auto px-12 py-5 text-xl">
                   Get a Free Quote
                 </Link>
                 <Link to="/contact" className="w-full sm:w-auto px-12 py-5 border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-xl">
                    Contact Sales
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
