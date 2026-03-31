import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook, Send, Loader } from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  message: z.string().min(10, 'Please write at least 10 characters'),
});

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await axios.post(`${API}/api/contact`, data);
      toast.success('Message sent! We\'ll reply within a few hours.');
      reset();
    } catch {
      toast.error('Could not send message. Please WhatsApp us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-[#F0EDE6] font-dm text-sm text-[#1A1A1A] form-input bg-[#FAF9F6]";

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Hero */}
      <section className="bg-[#1A1A1A] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#FF6B00 1px, transparent 1px), linear-gradient(90deg, #FF6B00 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-[#FF6B00]/20 rounded-full text-[#FF6B00] font-dm text-sm font-medium mb-4">Get In Touch</span>
            <h1 className="font-syne font-black text-white text-4xl md:text-5xl lg:text-6xl mb-4">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-white/60 font-dm text-lg max-w-xl mx-auto">Have questions? We'd love to hear from you. Reach out through any channel that's convenient!</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#F0EDE6]">
                <h2 className="font-syne font-bold text-[#1A1A1A] text-2xl mb-2">Send Us a Message</h2>
                <p className="text-[#6B7280] font-dm text-sm mb-7">Fill in the form below and we'll respond within a few hours.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-dm text-sm font-medium text-[#374151] mb-1.5">Full Name *</label>
                      <input {...register('name')} placeholder="Priya Kumar" className={inputClass} />
                      {errors.name && <p className="text-red-500 text-xs mt-1 font-dm">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block font-dm text-sm font-medium text-[#374151] mb-1.5">Phone *</label>
                      <input {...register('phone')} placeholder="9999999999" type="tel" className={inputClass} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 font-dm">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block font-dm text-sm font-medium text-[#374151] mb-1.5">Email Address *</label>
                    <input {...register('email')} placeholder="priya@company.in" type="email" className={inputClass} />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-dm">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block font-dm text-sm font-medium text-[#374151] mb-1.5">Message *</label>
                    <textarea {...register('message')} rows={4} placeholder="Tell us about your requirement..." className={`${inputClass} resize-none`} />
                    {errors.message && <p className="text-red-500 text-xs mt-1 font-dm">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={submitting}
                    className="btn-press w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#FFD700] text-white font-syne font-bold rounded-2xl shadow-lg hover:shadow-[#FF6B00]/30 transition-all disabled:opacity-70">
                    {submitting ? <><Loader size={16} className="animate-spin" /> Sending...</> : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Info + map */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-6">
              {/* Info card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#F0EDE6]">
                <h3 className="font-syne font-bold text-[#1A1A1A] text-xl mb-6">Business Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-[#FF6B00]" />
                    </div>
                    <div>
                      <p className="font-dm font-medium text-[#1A1A1A] text-sm">Address</p>
                      <p className="text-[#6B7280] font-dm text-sm">Tillu Works, Kukatpally,<br />Hyderabad, Telangana 500072</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-[#FF6B00]" />
                    </div>
                    <div>
                      <p className="font-dm font-medium text-[#1A1A1A] text-sm">Phone</p>
                      <a href="tel:+919999999999" className="text-[#6B7280] hover:text-[#FF6B00] font-dm text-sm transition-colors">+91 99999 99999</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-[#FF6B00]" />
                    </div>
                    <div>
                      <p className="font-dm font-medium text-[#1A1A1A] text-sm">Email</p>
                      <a href="mailto:hello@tilluworks.in" className="text-[#6B7280] hover:text-[#FF6B00] font-dm text-sm transition-colors">hello@tilluworks.in</a>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6 pt-6 border-t border-[#F0EDE6]">
                  {[
                    { href: 'https://wa.me/91XXXXXXXXXX', icon: MessageCircle, color: '#25D366', label: 'WhatsApp' },
                    { href: 'https://instagram.com', icon: Instagram, color: '#E1306C', label: 'Instagram' },
                    { href: 'https://facebook.com', icon: Facebook, color: '#1877F2', label: 'Facebook' },
                  ].map(({ href, icon: Icon, color, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#F0EDE6] text-sm font-dm hover:scale-105 transition-transform"
                      style={{ color }}>
                      <Icon size={16} /> {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-3xl overflow-hidden shadow-sm border border-[#F0EDE6] h-72">
                <iframe
                  title="Tillu Works Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5316!2d78.4071!3d17.4947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91d7b5d7c5e5%3A0x0!2sKukatpally%2C+Hyderabad!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
