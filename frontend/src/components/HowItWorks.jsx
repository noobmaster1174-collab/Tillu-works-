import { motion } from 'framer-motion';
import { Search, PenTool, CheckCircle2, ChevronRight } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "Select Products",
    description: "Browse our premium collection and choose the items that represent your brand."
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "Consult Experts",
    description: "Submit your quote and our experts will consult with you on design and pricing."
  },
  {
    icon: <CheckCircle2 className="w-8 h-8" />,
    title: "Get Delivered",
    description: "Once approved, we print and deliver your custom products in record time."
  }
];

export default function HowItWorks() {
  return (
    <div className="container-custom">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-primary font-bold text-sm uppercase tracking-widest mb-3 block">Simple Process</span>
        <h2 className="text-4xl md:text-5xl font-black mb-6">How It Works.</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Connection line for desktop */}
        <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-0.5 bg-border z-0" />
        
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center text-center relative z-10"
          >
            <div className="w-20 h-20 rounded-[28px] bg-white text-primary flex items-center justify-center shadow-2xl border border-border mb-8 group hover:scale-110 transition-transform">
               {step.icon}
               <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-xs font-black shadow-lg">
                  {i + 1}
               </div>
            </div>
            <h4 className="text-xl font-bold mb-4 text-secondary">{step.title}</h4>
            <p className="text-muted font-medium text-sm leading-relaxed max-w-xs">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
