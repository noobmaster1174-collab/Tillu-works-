import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Products() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Hero */}
      <section className="bg-[#1A1A1A] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#FF6B00 1px, transparent 1px), linear-gradient(90deg, #FF6B00 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FF6B00]/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#FF6B00]/20 rounded-full text-[#FF6B00] font-dm text-sm font-medium mb-4">
              Our Products
            </span>
            <h1 className="font-syne font-black text-white text-4xl md:text-5xl lg:text-6xl mb-5">
              Custom <span className="gradient-text">Printing</span> Solutions
            </h1>
            <p className="text-white/60 font-dm text-lg max-w-2xl mx-auto mb-8">
              Premium quality custom merchandise for your brand. From ID cards to corporate gifts — we've got you covered.
            </p>
            <Link
              to="/quote"
              className="btn-press inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#FFD700] text-white font-syne font-bold rounded-2xl shadow-xl hover:shadow-[#FF6B00]/40 transition-all"
            >
              Get Bulk Quote <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#F0EDE6]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syne font-bold text-[#1A1A1A] text-2xl md:text-3xl mb-3">
              Need Something <span className="gradient-text">Custom?</span>
            </h2>
            <p className="text-[#6B7280] font-dm mb-6">
              Don't see what you're looking for? We handle custom bulk orders too. Contact us and we'll make it happen!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/quote" className="btn-press px-7 py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#FFD700] text-white font-syne font-bold rounded-2xl shadow-lg">
                Request Custom Quote
              </Link>
              <Link to="/contact" className="btn-press px-7 py-3.5 border-2 border-[#1A1A1A] text-[#1A1A1A] font-syne font-bold rounded-2xl hover:bg-[#1A1A1A] hover:text-white transition-all">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
