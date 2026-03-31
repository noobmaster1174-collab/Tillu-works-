import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, MessageCircle, Camera, Globe, Send, Loader, ArrowRight } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-bg">
      <section className="bg-surface pt-40 pb-20 border-b border-border">
        <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-primary font-black text-xs uppercase tracking-widest mb-4 block">Get In Touch</span>
              <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">Let's start your <br /><span className="gradient-text">Project</span> Together.</h1>
              <p className="text-muted text-lg max-w-xl font-medium leading-relaxed">Have a question or a specific bulk requirement? We're here to help. Reach out through any of the channels below.</p>
            </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
               <div className="bg-white rounded-[40px] p-10 border border-border shadow-2xl">
                  <h2 className="text-3xl font-black mb-8">Send Message.</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2 ml-1">Full Name *</label>
                           <input {...register('name')} placeholder="Rahul Sharma" className="form-input" />
                           {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name.message}</p>}
                        </div>
                        <div>
                           <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2 ml-1">Phone *</label>
                           <input {...register('phone')} placeholder="9999999999" type="tel" className="form-input" />
                           {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone.message}</p>}
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2 ml-1">Email *</label>
                        <input {...register('email')} placeholder="rahul@business.in" type="email" className="form-input" />
                        {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email.message}</p>}
                     </div>
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2 ml-1">How can we help? *</label>
                        <textarea {...register('message')} rows={4} placeholder="Tell us about your requirement..." className="form-input resize-none" />
                        {errors.message && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.message.message}</p>}
                     </div>
                     <button type="submit" disabled={submitting} className="btn-primary w-full py-5 text-lg">
                        {submitting ? <Loader className="animate-spin" /> : <><Send size={18} /> Send Message <ArrowRight size={18} /></>}
                     </button>
                  </form>
               </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
               <div className="space-y-12 h-full flex flex-col pt-4">
                  <div>
                     <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Contact Details</h3>
                     <div className="space-y-8 font-poppins">
                        <a href="tel:+919999999999" className="flex items-center gap-6 group">
                           <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center text-secondary border border-border group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                              <Phone size={24} />
                           </div>
                           <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-muted">Direct Call</p>
                              <p className="text-xl font-bold text-secondary tracking-tight">+91 99999 99999</p>
                           </div>
                        </a>
                        <a href="mailto:hello@tilluworks.in" className="flex items-center gap-6 group">
                           <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center text-secondary border border-border group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                              <Mail size={24} />
                           </div>
                           <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-muted">Email Us</p>
                              <p className="text-xl font-bold text-secondary tracking-tight">hello@tilluworks.in</p>
                           </div>
                        </a>
                        <div className="flex items-start gap-6 group">
                           <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center text-secondary border border-border group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                              <MapPin size={24} />
                           </div>
                           <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-muted">Visit Office</p>
                              <p className="text-xl font-bold text-secondary tracking-tight">Kukatpally, Hyderabad, India 500072</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-auto">
                     <div className="flex gap-4">
                         <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-border text-secondary font-black hover:border-primary hover:text-primary transition-all">
                            <MessageCircle size={18} /> WhatsApp
                         </a>
                         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-border text-secondary font-black hover:border-primary hover:text-primary transition-all">
                            <Camera size={18} /> Instagram
                         </a>
                     </div>
                  </div>

                  <div className="rounded-3xl overflow-hidden shadow-2xl border border-border h-64 grayscale hover:grayscale-0 transition-all duration-700">
                     <iframe title="Tillu Works Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5316!2d78.4071!3d17.4947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91d7b5d7c5e5%3A0x0!2sKukatpally%2C+Hyderabad!5e0!3m2!1sen!2sin!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
                  </div>
               </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
