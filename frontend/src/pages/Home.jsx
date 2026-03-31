import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Award, Palette, BadgeIndianRupee } from 'lucide-react';
import TestimonialCard from '../components/TestimonialCard';
import HowItWorks from '../components/HowItWorks';
import ProductCard from '../components/ProductCard';
import { products, testimonials } from '../data/products';

/* ── Word-by-word headline animation ── */
const headline = 'Print Your Identity. Brand Your World.';
const words = headline.split(' ');

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

/* ── Why Choose Us data ── */
const features = [
  { icon: Zap, title: 'Fast Delivery', desc: 'Express printing with delivery across Hyderabad in 24–48 hrs for most products.', color: '#FF6B00' },
  { icon: Palette, title: 'Custom Designs', desc: 'Our in-house designers bring your brand vision to life with pixel-perfect artwork.', color: '#FFD700' },
  { icon: Award, title: 'Premium Quality', desc: 'Industry-grade materials and printing technology for products that impress.', color: '#FF6B00' },
  { icon: BadgeIndianRupee, title: 'Affordable Pricing', desc: 'Competitive bulk pricing with no hidden charges. Quality you can afford.', color: '#FFD700' },
];

export default function Home() {
  const productsRef = useRef(null);

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
        {/* Animated geometric background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#FF6B00]/10 blur-3xl ripple-circle" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#FFD700]/8 blur-3xl ripple-circle" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#FF6B00]/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#FFD700]/5" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(#FF6B00 1px, transparent 1px), linear-gradient(90deg, #FF6B00 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B00]/20 border border-[#FF6B00]/30 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            <span className="text-[#FF6B00] font-dm text-sm font-medium">Hyderabad's #1 Custom Printing Studio</span>
          </motion.div>

          {/* Animated headline */}
          <h1 className="font-syne font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-4xl mx-auto">
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block mr-3 ${
                  word === 'Identity.' || word === 'World.' ? 'gradient-text' : ''
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-white/60 font-dm text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From ID cards to branded mugs, laser bottles to custom diaries — we print your vision with precision and passion, right here in Hyderabad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-press px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-[#FFD700] text-white font-syne font-bold text-base rounded-2xl shadow-2xl shadow-[#FF6B00]/30 hover:shadow-[#FF6B00]/50 flex items-center gap-2 group"
            >
              View Our Products
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/quote"
              className="btn-press px-8 py-4 border-2 border-white/20 text-white font-syne font-bold text-base rounded-2xl hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/10 transition-all duration-200"
            >
              Get a Free Quote
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-20 pt-10 border-t border-white/10"
          >
            {[
              { val: '500+', label: 'Happy Clients' },
              { val: '50K+', label: 'Items Printed' },
              { val: '24hr', label: 'Fast Delivery' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-syne font-black text-2xl gradient-text">{s.val}</p>
                <p className="text-white/50 font-dm text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#FF6B00] rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ─── WHY CHOOSE US ────────────────────────────── */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#FF6B00]/10 rounded-full text-[#FF6B00] font-dm text-sm font-medium mb-4">
              Why Tillu Works
            </span>
            <h2 className="font-syne font-bold text-[#1A1A1A] text-3xl md:text-4xl lg:text-5xl mb-4">
              Why Choose <span className="gradient-text">Tillu Works?</span>
            </h2>
            <p className="text-[#6B7280] font-dm max-w-xl mx-auto">
              We combine creativity, quality, and speed to deliver custom merchandise that makes your brand unforgettable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-hover bg-white rounded-2xl p-7 border border-[#F0EDE6] shadow-sm text-center group"
              >
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                  style={{ background: `${f.color}15`, border: `1.5px solid ${f.color}30` }}
                >
                  <f.icon size={26} style={{ color: f.color }} />
                </div>
                <h3 className="font-syne font-bold text-[#1A1A1A] text-lg mb-2">{f.title}</h3>
                <p className="text-[#6B7280] font-dm text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCT SHOWCASE ─────────────────────────── */}
      <section ref={productsRef} className="py-24 bg-[#F0EDE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#FF6B00]/10 rounded-full text-[#FF6B00] font-dm text-sm font-medium mb-4">
              Our Products
            </span>
            <h2 className="font-syne font-bold text-[#1A1A1A] text-3xl md:text-4xl lg:text-5xl mb-4">
              Custom <span className="gradient-text">Printed Products</span>
            </h2>
            <p className="text-[#6B7280] font-dm max-w-xl mx-auto">
              From office essentials to corporate gifts — we customize everything with your brand identity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/products"
              className="btn-press inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white font-syne font-bold rounded-2xl hover:bg-[#FF6B00] transition-all duration-200 group"
            >
              View All Products
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────── */}
      <HowItWorks />

      {/* ─── TESTIMONIALS ─────────────────────────────── */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#FF6B00]/10 rounded-full text-[#FF6B00] font-dm text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="font-syne font-bold text-[#1A1A1A] text-3xl md:text-4xl lg:text-5xl mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-[#6B7280] font-dm max-w-xl mx-auto">
              Don't just take our word for it — here's what our happy clients across Hyderabad have to say.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-[#FF6B00] to-[#FFD700] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syne font-black text-white text-3xl md:text-4xl lg:text-5xl mb-4">
              Ready to Print? Contact Us Today!
            </h2>
            <p className="text-white/80 font-dm text-lg mb-8">
              Get your free quote in minutes. We serve businesses across Hyderabad and all of Telangana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote"
                className="btn-press px-8 py-4 bg-white text-[#FF6B00] font-syne font-bold text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200"
              >
                Get Free Quote Now
              </Link>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press px-8 py-4 border-2 border-white text-white font-syne font-bold text-base rounded-2xl hover:bg-white/10 transition-all duration-200"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
