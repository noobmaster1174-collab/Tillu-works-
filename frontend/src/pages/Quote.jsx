import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CheckCircle, ChevronRight, ChevronLeft, Upload, Loader, ShoppingBag, Trash2 } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const step1Schema = z.object({
  selectedProducts: z.array(z.string()).min(1, 'Select at least one product'),
});

const step2Schema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email'),
  company: z.string().optional(),
  requirements: z.string().optional(),
});

const steps = ['Product Selection', 'Registration', 'Order Confirmation'];

export default function Quote() {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(cart.length > 0 ? 1 : 0);
  const [formData, setFormData] = useState({
    selectedProducts: [],
    quantities: {},
    name: '', phone: '', email: '', company: '', requirements: '',
    file: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const form1 = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: { selectedProducts: formData.selectedProducts },
  });

  const form2 = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: { name: formData.name, phone: formData.phone, email: formData.email, company: formData.company, requirements: formData.requirements },
  });

  // If cart is empty and we are on step 1+, go back to 0
  useEffect(() => {
    if (cart.length === 0 && step > 0 && formData.selectedProducts.length === 0) {
        setStep(0);
    }
  }, [cart]);

  const toggleProduct = (id) => {
    const current = form1.getValues('selectedProducts');
    const updated = current.includes(id) ? current.filter((p) => p !== id) : [...current, id];
    form1.setValue('selectedProducts', updated, { shouldValidate: true });
    setFormData((fd) => ({ ...fd, selectedProducts: updated }));
  };

  const handleNext = async () => {
    if (step === 0) {
      const valid = await form1.trigger();
      if (!valid) return;
      setFormData((fd) => ({ ...fd, selectedProducts: form1.getValues('selectedProducts') }));
      setStep(1);
    } else if (step === 1) {
      const valid = await form2.trigger();
      if (!valid) return;
      setFormData((fd) => ({ ...fd, ...form2.getValues() }));
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('phone', formData.phone);
      fd.append('company', formData.company || '');
      fd.append('requirements', formData.requirements || '');

      if (cart.length > 0) {
        // Multi-Cart Submission
        const cartProducts = cart.map(item => item.id);
        const cartQtys = cart.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {});
        
        // We just take the first item's metadata for now in a simple MVP
        // In a real app, we'd handle a list of configurations
        const metadata = cart[0].metadata || {};
        
        fd.append('products', JSON.stringify(cartProducts));
        fd.append('quantities', JSON.stringify(cartQtys));
        fd.append('metadata_info', JSON.stringify(metadata));
        fd.append('total_price', cartTotal);

        if (cart[0].design_file && (cart[0].design_file instanceof File || cart[0].design_file instanceof Blob)) {
          fd.append('design_file', cart[0].design_file);
        }
        if (cart[0].data_file && (cart[0].data_file instanceof File || cart[0].data_file instanceof Blob)) {
          fd.append('data_file', cart[0].data_file);
        }
      } else {
        // Generic Quote Submission
        fd.append('products', JSON.stringify(formData.selectedProducts));
        fd.append('quantities', JSON.stringify(formData.quantities));
        if (formData.file) fd.append('file', formData.file);
      }

      const res = await axios.post(`${API}/api/quote`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setTrackingId(res.data.tracking_id);
      setSubmitted(true);
      clearCart();
      toast.success('Order placed successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Submission failed. Check your data and connection.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-sm w-full bg-white p-12 rounded-[40px] border border-border shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/30">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-secondary mb-2">Order Confirmed!</h2>
          <p className="text-xs font-black text-primary uppercase tracking-widest mb-6">ID: {trackingId}</p>
          <p className="text-muted font-medium mb-10 leading-relaxed text-sm">Thank you for choosing Tillu Works. You can track your order using this ID or your email.</p>
          <div className="space-y-4">
            <button onClick={() => navigate('/orders')} className="btn-primary w-full py-4 text-lg">Track My Order</button>
            <button onClick={() => navigate('/')} className="text-muted font-bold hover:text-primary transition-colors">Back to Home</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-32 pb-20 font-poppins">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-10 text-secondary">
            {cart.length > 0 ? 'Review & Checkout' : 'Get a Custom Quote'}
          </h1>
          <div className="flex items-center justify-between relative max-w-md mx-auto">
             <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border z-0" />
             {steps.map((s, i) => (
                <div key={s} className="relative z-10 flex flex-col items-center gap-3">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all duration-500 ${i <= step ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-surface text-muted border border-border'}`}>
                      {i < step ? <CheckCircle size={18} /> : i + 1}
                   </div>
                   <span className={`text-[10px] font-black uppercase tracking-widest ${i <= step ? 'text-secondary' : 'text-muted'}`}>{s}</span>
                </div>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-border shadow-2xl overflow-hidden p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h3 className="text-2xl font-black mb-8 text-secondary">What do you need printed?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((p) => {
                    const selected = form1.watch('selectedProducts').includes(p.id);
                    return (
                      <div key={p.id} onClick={() => toggleProduct(p.id)} className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-3 ${selected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}>
                        <div className="flex items-center justify-between">
                           <span className="text-3xl">{p.icon}</span>
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected ? 'bg-primary border-primary' : 'border-border'}`}>
                              {selected && <CheckCircle size={12} className="text-white" />}
                           </div>
                        </div>
                        <h4 className="font-black text-secondary">{p.name}</h4>
                        {selected && (
                          <input type="number" min={1} placeholder="Quantity" value={formData.quantities[p.id] || ''} onChange={(e) => { e.stopPropagation(); setFormData(fd => ({ ...fd, quantities: { ...fd.quantities, [p.id]: e.target.value } })) }} onClick={e => e.stopPropagation()} className="mt-2 w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs font-bold font-poppins focus:border-primary" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                {cart.length > 0 && (
                    <section className="bg-surface/50 rounded-3xl p-6 border border-border">
                        <h4 className="text-xs font-black text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                           <ShoppingBag size={14} className="text-primary" /> Products in Cart
                        </h4>
                        <div className="space-y-3">
                            {cart.map(item => (
                                <div key={item.cartId} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-border shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} className="w-12 h-12 rounded-xl object-cover" />
                                        <div>
                                            <p className="font-bold text-secondary text-sm">{item.name}</p>
                                            <p className="text-[10px] text-muted font-bold">Qty: {item.quantity} • ₹{item.price}/unit</p>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.cartId)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <h3 className="text-2xl font-black text-secondary">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 ml-1">Full Name</label>
                      <input {...form2.register('name')} placeholder="e.g. Rahul Sharma" className="form-input" />
                      {form2.formState.errors.name && <p className="text-xs text-red-500 mt-1">{form2.formState.errors.name.message}</p>}
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 ml-1">Phone Number</label>
                      <input {...form2.register('phone')} placeholder="+91 00000 00000" className="form-input" />
                      {form2.formState.errors.phone && <p className="text-xs text-red-500 mt-1">{form2.formState.errors.phone.message}</p>}
                   </div>
                   <div className="md:col-span-2">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 ml-1">Delivery Email</label>
                       <input {...form2.register('email')} placeholder="name@company.com" className="form-input" />
                       {form2.formState.errors.email && <p className="text-xs text-red-500 mt-1">{form2.formState.errors.email.message}</p>}
                   </div>
                   <div className="md:col-span-2">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 ml-1">Additional Requirements (Optional)</label>
                       <textarea {...form2.register('requirements')} rows={4} className="form-input resize-none" />
                   </div>
                   
                   {cart.length === 0 && (
                    <div className="md:col-span-2">
                        <label className="block text-center p-8 border-2 border-dashed border-border rounded-3xl cursor-pointer hover:border-primary/40 transition-colors bg-surface">
                            <Upload className="mx-auto mb-3 text-muted" />
                            <span className="text-xs font-black uppercase tracking-widest text-muted">{formData.file ? formData.file.name : 'Upload logo/design'}</span>
                            <input type="file" className="hidden" onChange={e => setFormData(fd => ({ ...fd, file: e.target.files[0] }))} />
                        </label>
                    </div>
                   )}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <h3 className="text-2xl font-black text-secondary">One last check.</h3>
                <div className="bg-surface rounded-3xl p-8 space-y-4">
                   <div className="flex justify-between items-center pb-4 border-b border-white">
                      <span className="text-xs font-black text-muted uppercase tracking-widest">Name</span>
                      <span className="font-bold text-secondary">{formData.name}</span>
                   </div>
                   <div className="flex justify-between items-center pb-4 border-b border-white">
                      <span className="text-xs font-black text-muted uppercase tracking-widest">Total Amount</span>
                      <span className="text-2xl font-black text-primary">₹{cart.length > 0 ? cartTotal.toLocaleString() : 'TBD'}</span>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 flex justify-between gap-4">
             <button onClick={() => setStep(s => s - 1)} disabled={step === 0} className={`btn-outline flex-1 md:flex-none ${step === 0 ? 'invisible' : ''}`}>
                <ChevronLeft size={20} /> Back
             </button>
             <button onClick={step < 2 ? handleNext : handleSubmit} disabled={submitting} className="btn-primary flex-1 md:flex-none">
                {submitting ? <Loader className="animate-spin" /> : <>{step < 2 ? 'Review Order' : 'Place Order Now'} <ChevronRight size={20} /></>}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
