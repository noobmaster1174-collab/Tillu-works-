import { motion } from 'framer-motion';
import { MousePointerClick, Palette, Package } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: MousePointerClick,
    title: 'Choose Product',
    desc: 'Browse our catalog and select the product you want customized — ID cards, mugs, bottles, pens, and more.',
    color: '#FF6B00',
  },
  {
    step: '02',
    icon: Palette,
    title: 'Share Your Design',
    desc: 'Upload your logo or artwork, or let our in-house designers create a stunning design for your brand.',
    color: '#FFD700',
  },
  {
    step: '03',
    icon: Package,
    title: 'Receive Your Order',
    desc: 'We print, pack, and deliver your premium branded products right to your doorstep across Hyderabad.',
    color: '#FF6B00',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-[#1A1A1A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 geo-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[#FF6B00]/20 rounded-full text-[#FF6B00] font-dm text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="font-syne font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-white/60 font-dm max-w-xl mx-auto">
            Getting your custom branded merchandise is easier than you think. Just 3 simple steps!
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line for md+ screens */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-[60%] right-[-40%] h-0.5 bg-gradient-to-r from-[#FF6B00]/40 to-[#FFD700]/40" />
              )}

              {/* Icon circle */}
              <div className="relative inline-flex mb-6">
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl"
                  style={{ background: `linear-gradient(135deg, ${step.color}20, ${step.color}40)`, border: `1.5px solid ${step.color}40` }}
                >
                  <step.icon size={36} style={{ color: step.color }} />
                </div>
                {/* Step number badge */}
                <div
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-syne font-black text-xs shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${step.color}, #FFD700)` }}
                >
                  {step.step}
                </div>
              </div>

              <h3 className="font-syne font-bold text-white text-xl mb-3">{step.title}</h3>
              <p className="text-white/60 font-dm text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
