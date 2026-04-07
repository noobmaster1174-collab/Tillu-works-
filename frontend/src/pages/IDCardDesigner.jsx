import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  CreditCard, 
  Maximize, 
  Layers, 
  Tag, 
  Cpu, 
  Upload, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  ShoppingCart,
  FileText,
  AlertCircle,
  Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const OPTIONS = {
  type: [
    { id: 'standard', label: 'Standard PVC', price: 0, desc: 'High-quality everyday PVC cards' },
    { id: 'premium', label: 'Premium Metallic', price: 10, desc: 'Premium feel with metallic finish' },
  ],
  size: [
    { id: 'atm', label: 'ATM Size', price: 0, desc: 'Standard 85.6mm x 54mm' },
    { id: 'big', label: 'Large Size', price: 10, desc: 'Bigger visibility for events' },
    { id: 'custom', label: 'Custom Size', price: 15, desc: 'Tailored to your needs' },
  ],
  finish: [
    { id: 'matte', label: 'Matte Finish', price: 2, desc: 'Smooth, non-reflective elegant look' },
    { id: 'glossy', label: 'Glossy Finish', price: 0, desc: 'Shiny, vibrant and professional' },
    { id: 'textured', label: 'Textured', price: 5, desc: 'Unique tactile feel' },
  ],
  holder: [
    { id: 'none', label: 'No Holder', price: 0 },
    { id: 'plastic', label: 'Plastic Holder', price: 10 },
    { id: 'metal', label: 'Metal Holder', price: 30 },
    { id: 'retractable', label: 'Retractable Badge', price: 25 },
    { id: 'lanyard', label: 'Lanyard with Holder', price: 20 },
  ],
  chip: [
    { id: 'none', label: 'No Chip', price: 0 },
    { id: 'rfid', label: 'RFID Smart Chip', price: 50 },
    { id: 'magnetic', label: 'Magnetic Strip', price: 20 },
  ]
};

const BASE_PRICE = 15;

export default function IDCardConfigurator() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    type: 'standard',
    size: 'atm',
    finish: 'glossy',
    holder: 'none',
    chip: 'none',
    quantity: 50
  });

  const [files, setFiles] = useState({
    design: null,
    data: null
  });

  const [previews, setPreviews] = useState({
    design: null,
    data: null
  });

  // Calculate Price
  const calculateUnitPrice = () => {
    let price = BASE_PRICE;
    price += OPTIONS.type.find(o => o.id === config.type).price;
    price += OPTIONS.size.find(o => o.id === config.size).price;
    price += OPTIONS.finish.find(o => o.id === config.finish).price;
    price += OPTIONS.holder.find(o => o.id === config.holder).price;
    price += OPTIONS.chip.find(o => o.id === config.chip).price;
    return price;
  };

  const unitPrice = calculateUnitPrice();
  const totalAmount = unitPrice * config.quantity;

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        toast.error("File is too large (max 5MB)");
        return;
    }

    setFiles(prev => ({ ...prev, [type]: file }));
    
    if (type === 'design') {
        const reader = new FileReader();
        reader.onloadend = () => setPreviews(prev => ({ ...prev, design: reader.result }));
        reader.readAsDataURL(file);
    } else {
        setPreviews(prev => ({ ...prev, data: file.name }));
    }
  };

  const handleAddToCart = () => {
    if (!files.design || !files.data) {
        toast.error("Please upload both design and data files.");
        return;
    }

    const cartItem = {
        id: 'id-cards',
        name: 'Custom ID Card Package',
        price: unitPrice,
        quantity: config.quantity,
        metadata: config,
        design_file: files.design,
        data_file: files.data,
        image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?w=600&q=80'
    };

    addToCart(cartItem);
    navigate('/quote'); // Take them to the checkout form (which we'll update)
  };

  const SelectionOption = ({ category, options }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setConfig(prev => ({ ...prev, [category]: opt.id }))}
          className={`p-6 rounded-3xl border-2 text-left transition-all duration-300 flex flex-col gap-2 ${
            config[category] === opt.id 
              ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' 
              : 'border-border bg-white hover:border-primary/30'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className="font-bold text-secondary">{opt.label}</span>
            {opt.price > 0 && (
              <span className="text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                +₹{opt.price}
              </span>
            )}
          </div>
          {opt.desc && <p className="text-xs text-muted font-medium">{opt.desc}</p>}
          {config[category] === opt.id && (
            <motion.div layoutId={`${category}-check`} className="mt-2 text-primary">
              <CheckCircle2 size={20} />
            </motion.div>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-bg pt-28 pb-20 font-poppins">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 text-primary font-bold mb-4"
                >
                    <CreditCard size={20} />
                    <span>Product Designer</span>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-black text-secondary leading-tight">
                    Configure your <span className="text-primary italic underline decoration-secondary">ID Cards</span>
                </h1>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-border shadow-sm">
                {[1, 2, 3].map(num => (
                    <div key={num} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${step === num ? 'bg-primary text-white' : 'bg-surface text-muted'}`}>
                            {num}
                        </div>
                        {num < 3 && <div className="w-8 h-0.5 bg-border rounded-full" />}
                    </div>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Content Areas */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* STEP 1: Specs */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <section>
                    <h2 className="text-xl font-black text-secondary mb-6 flex items-center gap-2">
                        <Layers size={24} className="text-primary"/> 
                        1. Select Card Type & Size
                    </h2>
                    <SelectionOption category="type" options={OPTIONS.type} />
                    <div className="mt-6">
                        <SelectionOption category="size" options={OPTIONS.size} />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-black text-secondary mb-6 flex items-center gap-2">
                        <Maximize size={24} className="text-primary"/> 
                        2. Choose Finish & Tech
                    </h2>
                    <SelectionOption category="finish" options={OPTIONS.finish} />
                    <div className="mt-6">
                        <SelectionOption category="chip" options={OPTIONS.chip} />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-black text-secondary mb-6 flex items-center gap-2">
                        <Tag size={24} className="text-primary"/> 
                        3. Add Accessories (Holders)
                    </h2>
                    <SelectionOption category="holder" options={OPTIONS.holder} />
                </section>

                <div className="flex justify-end pt-6">
                    <button 
                        onClick={() => setStep(2)}
                        className="btn-primary flex items-center gap-2 group px-10"
                    >
                        Next: Upload Artwork <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Uploads */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <section>
                    <h2 className="text-xl font-black text-secondary mb-2 flex items-center gap-2">
                        <Upload size={24} className="text-primary"/> 
                        Upload Design & Info
                    </h2>
                    <p className="text-muted font-medium mb-8">We need your design file and the employee list (Data file).</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-poppins">
                        {/* Design Upload */}
                        <div className={`relative p-10 border-2 border-dashed rounded-[40px] transition-all text-center ${files.design ? 'border-green-500 bg-green-50/20' : 'border-border hover:border-primary/50 bg-white'}`}>
                            <input 
                                type="file" 
                                accept="image/*,.pdf" 
                                onChange={(e) => handleFileChange(e, 'design')}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            {previews.design ? (
                                <div className="space-y-4">
                                    <div className="w-24 h-32 mx-auto rounded-lg overflow-hidden border-2 border-green-500 shadow-md">
                                        <img src={previews.design} className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-green-600 font-bold text-sm">Design Uploaded!</p>
                                </div>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-6 text-muted">
                                        <Layers size={28} />
                                    </div>
                                    <p className="font-bold text-secondary mb-1">Card Background Design</p>
                                    <p className="text-xs text-muted font-medium">Click to upload JPG, PNG or PDF (Max 5MB)</p>
                                </>
                            )}
                        </div>

                        {/* Data Upload */}
                        <div className={`relative p-10 border-2 border-dashed rounded-[40px] transition-all text-center ${files.data ? 'border-green-500 bg-green-50/20' : 'border-border hover:border-primary/50 bg-white'}`}>
                            <input 
                                type="file" 
                                accept=".csv,.xlsx,.xls" 
                                onChange={(e) => handleFileChange(e, 'data')}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            {files.data ? (
                                <div className="space-y-4">
                                    <div className="w-16 h-16 bg-green-500 text-white rounded-2xl flex items-center justify-center mx-auto">
                                        <FileText size={28} />
                                    </div>
                                    <p className="text-green-600 font-bold text-sm">{files.data.name}</p>
                                </div>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-6 text-muted">
                                        <FileText size={28} />
                                    </div>
                                    <p className="font-bold text-secondary mb-1">Employee Data File</p>
                                    <p className="text-xs text-muted font-medium">Click to upload Excel or CSV file</p>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <div className="flex justify-between items-center pt-6">
                    <button onClick={() => setStep(1)} className="text-secondary font-bold flex items-center gap-2 hover:text-primary transition-colors">
                        <ChevronLeft size={20} /> Back to selection
                    </button>
                    <button 
                        onClick={() => setStep(3)}
                        disabled={!files.design || !files.data}
                        className="btn-primary flex items-center gap-2 group px-12 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Review Order <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Review */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10"
              >
                <div className="bg-white rounded-[40px] border border-border overflow-hidden shadow-sm">
                    <div className="p-10 border-b border-border bg-surface/30">
                        <h2 className="text-2xl font-black text-secondary">Final Review</h2>
                        <p className="text-muted font-medium">Please verify your order configuration before adding to cart.</p>
                    </div>

                    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <h3 className="font-black text-secondary text-sm uppercase tracking-widest text-primary">Specs Card</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Card Type', val: OPTIONS.type.find(o => o.id === config.type).label },
                                    { label: 'Card Size', val: OPTIONS.size.find(o => o.id === config.size).label },
                                    { label: 'Finish', val: OPTIONS.finish.find(o => o.id === config.finish).label },
                                    { label: 'Holder', val: OPTIONS.holder.find(o => o.id === config.holder).label },
                                    { label: 'Chip', val: OPTIONS.chip.find(o => o.id === config.chip).label },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                                        <span className="text-muted font-bold text-sm tracking-tight">{item.label}</span>
                                        <span className="text-secondary font-black">{item.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-black text-secondary text-sm uppercase tracking-widest text-primary">Quantity & Price</h3>
                            <div className="bg-surface rounded-3xl p-8 space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted font-bold text-sm">Unit Price</span>
                                    <span className="text-xl font-black text-secondary">₹{unitPrice}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-muted font-black uppercase tracking-tighter">Order Quantity</label>
                                    <input 
                                        type="number" 
                                        min="50"
                                        value={config.quantity}
                                        onChange={(e) => setConfig(prev => ({ ...prev, quantity: parseInt(e.target.value) || 50 }))}
                                        className="w-full bg-white border border-border rounded-xl px-4 py-3 font-black text-secondary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-2xl"
                                    />
                                    <p className="text-[10px] text-muted font-bold">Minimum order 50 units for this config.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-6">
                    <button onClick={() => setStep(2)} className="text-secondary font-bold flex items-center gap-2 hover:text-primary transition-colors">
                        <ChevronLeft size={20} /> Edit files
                    </button>
                    <button 
                        onClick={handleAddToCart}
                        className="btn-primary flex items-center gap-3 px-12 text-lg shadow-2xl shadow-primary/30"
                    >
                        <ShoppingCart size={24} /> Add to Cart — ₹{totalAmount.toLocaleString()}
                    </button>
                </div>
              </motion.div>
            )}

          </div>

          {/* Sticky Summary Widget */}
          <div className="lg:col-span-4 sticky top-32 space-y-6">
            <div className="bg-secondary p-8 rounded-[40px] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary blur-[80px] opacity-20 -mr-16 -mt-16" />
                
                <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <ShieldCheck size={28} className="text-primary"/>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-white/50">Live Proposal</p>
                            <p className="font-bold">Instant Quote</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-white/80 font-medium">
                            <span>Unit Base</span>
                            <span>₹{unitPrice}</span>
                        </div>
                        <div className="flex justify-between text-white/80 font-medium">
                            <span>Quantity</span>
                            <span>x {config.quantity}</span>
                        </div>
                        <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                            <span className="text-lg font-bold">Total Est.</span>
                            <span className="text-4xl font-black text-primary">₹{totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-semibold text-white/60 bg-white/5 p-4 rounded-xl">
                        <AlertCircle size={16} />
                        Final price may vary based on complex artwork.
                    </div>
                </div>
            </div>

            <div className="bg-white border border-border p-6 rounded-[30px] flex items-center gap-4">
                <div className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center text-primary">
                    <Package size={20} />
                </div>
                <div>
                   <p className="text-secondary font-black text-sm">Estimated Delivery</p> 
                   <p className="text-muted text-xs font-bold">Within 3-5 Working Days</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
