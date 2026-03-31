import { motion } from 'framer-motion';
import { Heart, Zap, Palette, Users } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Quality First', desc: 'We never compromise on material quality or print precision. Every order goes through rigorous quality checks before dispatch.', color: '#FF6B00' },
  { icon: Zap, title: 'Speed & Reliability', desc: 'Fast turnaround without cutting corners. Most orders ready within 24-48 hours with real-time updates.', color: '#FFD700' },
  { icon: Palette, title: 'Creative Excellence', desc: 'Our in-house design team brings fresh, on-brand creativity to every product, making your brand shine.', color: '#FF6B00' },
];

const team = [
  { name: 'Tillu Raju', role: 'Founder & Head of Operations', avatar: 'TR', desc: 'With 10+ years in the printing industry, Tillu started this venture to bring affordable premium printing to Hyderabad businesses.' },
  { name: 'Sunitha Devi', role: 'Lead Designer', avatar: 'SD', desc: 'Creative director with a passion for brand identity. Sunitha transforms every brief into stunning visual merchandise.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Hero */}
      <section className="bg-[#1A1A1A] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#FFD700 1px, transparent 1px), linear-gradient(90deg, #FFD700 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-[#FF6B00]/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-[#FFD700]/20 rounded-full text-[#FFD700] font-dm text-sm font-medium mb-4">Our Story</span>
            <h1 className="font-syne font-black text-white text-4xl md:text-5xl lg:text-6xl mb-5">
              About <span className="gradient-text">Tillu Works</span>
            </h1>
            <p className="text-white/60 font-dm text-lg max-w-2xl mx-auto">Hyderabad's trusted custom printing and branding studio — built on passion, quality, and the love of great design.</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1.5 bg-[#FF6B00]/10 rounded-full text-[#FF6B00] font-dm text-sm font-medium mb-5">Who We Are</span>
              <h2 className="font-syne font-bold text-[#1A1A1A] text-3xl md:text-4xl mb-6">
                Printing Dreams,<br /><span className="gradient-text">Building Brands</span>
              </h2>
              <div className="space-y-4 text-[#4B5563] font-dm text-base leading-relaxed">
                <p>Tillu Works was born in the heart of Hyderabad with a simple mission — to help local businesses and entrepreneurs put their brand on premium quality products, without breaking the bank.</p>
                <p>Started as a small ID card printing shop in Kukatpally, we've grown into a full-service custom branding studio offering everything from laser-engraved water bottles to full-color sublimation mugs, printed pens, diaries, and keychains.</p>
                <p>Today, we serve 500+ happy clients across Hyderabad and Telangana — from startups and SMEs to large corporations and educational institutions. Every order, big or small, gets our full attention and care.</p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-[#F0EDE6]">
                {[{ val: '8+', label: 'Years Experience' }, { val: '500+', label: 'Happy Clients' }, { val: '50K+', label: 'Items Printed' }].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-syne font-black text-2xl gradient-text">{s.val}</p>
                    <p className="text-[#9CA3AF] font-dm text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-[#FF6B00]/10">
                <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80" alt="Tillu Works printing studio" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-[#F0EDE6]">
                <p className="font-syne font-black text-[#FF6B00] text-3xl">❤️</p>
                <p className="font-syne font-bold text-[#1A1A1A] text-sm">Made in Hyderabad</p>
                <p className="text-[#9CA3AF] font-dm text-xs">with pride & passion</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F0EDE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-[#FF6B00]/10 rounded-full text-[#FF6B00] font-dm text-sm font-medium mb-4">Our Values</span>
            <h2 className="font-syne font-bold text-[#1A1A1A] text-3xl md:text-4xl">What Drives <span className="gradient-text">Us</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card-hover bg-white rounded-2xl p-8 shadow-sm border border-[#F0EDE6] text-center">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: `${v.color}15`, border: `1.5px solid ${v.color}30` }}>
                  <v.icon size={28} style={{ color: v.color }} />
                </div>
                <h3 className="font-syne font-bold text-[#1A1A1A] text-xl mb-3">{v.title}</h3>
                <p className="text-[#6B7280] font-dm text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-[#FF6B00]/10 rounded-full text-[#FF6B00] font-dm text-sm font-medium mb-4">Our Team</span>
            <h2 className="font-syne font-bold text-[#1A1A1A] text-3xl md:text-4xl">Meet the <span className="gradient-text">People</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="card-hover bg-white rounded-2xl p-8 shadow-sm border border-[#F0EDE6] text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FFD700] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#FF6B00]/20">
                  <span className="font-syne font-black text-white text-xl">{member.avatar}</span>
                </div>
                <h3 className="font-syne font-bold text-[#1A1A1A] text-lg">{member.name}</h3>
                <p className="text-[#FF6B00] font-dm text-sm mb-3">{member.role}</p>
                <p className="text-[#6B7280] font-dm text-sm leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
