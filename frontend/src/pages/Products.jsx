import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Products() {
  return (
    <div className="min-h-screen bg-bg">
      <section className="bg-secondary pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="container-custom relative z-10 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Explore Our <span className="text-primary">Products</span>.</h1>
              <p className="text-white/60 text-lg max-w-xl mx-auto font-medium">Browse our range of high-quality custom printing solutions designed to make your brand stand out.</p>
            </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="p-12 md:p-16 rounded-[40px] bg-surface border border-border flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-black mb-4">Don't see what you need?</h2>
              <p className="text-muted font-medium">We offer fully custom printing services for unique requirements. Speak to our team.</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
               <a href="tel:+919999999999" className="btn-outline flex-1 md:flex-none">Call Us</a>
               <Link to="/contact" className="btn-primary flex-1 md:flex-none">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
