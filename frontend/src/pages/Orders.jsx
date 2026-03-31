import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Search, Package, Clock, Truck, CheckCircle2, AlertCircle, Loader } from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const statusMap = {
  pending: { label: 'Pending', icon: <Clock size={16} />, color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
  processing: { label: 'Processing', icon: <Package size={16} />, color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  printing: { label: 'Printing', icon: <Loader size={16} className="animate-spin" />, color: 'bg-primary/10 text-primary border-primary/20' },
  shipped: { label: 'Shipped', icon: <Truck size={16} />, color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  delivered: { label: 'Delivered', icon: <CheckCircle2 size={16} />, color: 'bg-green-500/10 text-green-600 border-green-500/20' },
};

export default function Orders() {
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!identifier) return;
    setLoading(true);
    setError('');
    setOrders(null);
    try {
      const res = await axios.get(`${API}/api/orders/${identifier}`);
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.status === 404 ? 'No orders found for this Email or Tracking ID.' : 'Failed to fetch tracking data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <section className="bg-secondary pt-40 pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
               <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Track Your <span className="text-primary">Order</span>.</h1>
               <p className="text-white/60 text-lg max-w-xl mx-auto font-medium">Enter your Email address or the Tracking ID from your confirmation to check the current delivery status.</p>
            </motion.div>
            
            <form onSubmit={handleSearch} className="mt-12 max-w-xl mx-auto relative">
               <input 
                 type="text" 
                 value={identifier}
                 onChange={(e) => setIdentifier(e.target.value)}
                 placeholder="Email or Tracking ID (e.g. TW-XXXXXX)" 
                 className="w-full px-8 py-5 rounded-[24px] bg-white border-2 border-transparent focus:border-primary text-secondary font-poppins font-semibold shadow-2xl transition-all"
               />
               <button 
                 type="submit" 
                 disabled={loading}
                 className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30"
               >
                 {loading ? <Loader className="animate-spin" /> : <Search size={24} />}
               </button>
            </form>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-4xl">
           <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-20 text-muted gap-4">
                   <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                   <span className="font-black text-xs uppercase tracking-widest">Searching orders...</span>
                </motion.div>
              )}

              {error && (
                <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-500/5 border border-red-500/20 rounded-[32px] p-8 flex items-center gap-6 text-red-600">
                   <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center">
                      <AlertCircle size={32} />
                   </div>
                   <div>
                      <h4 className="font-black text-lg">Not Found.</h4>
                      <p className="font-medium text-sm text-red-500/70">{error}</p>
                   </div>
                </motion.div>
              )}

              {orders && (
                <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                   {orders.map((order) => {
                     const status = statusMap[order.status] || statusMap.pending;
                     return (
                       <div key={order.id} className="bg-white rounded-[40px] border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 p-8 md:p-12">
                          <div className="flex flex-col md:flex-row justify-between gap-8 mb-10 pb-10 border-b border-border">
                             <div>
                                <div className="flex items-center gap-3 mb-2">
                                   <span className="text-muted font-black text-[10px] uppercase tracking-widest">Tracking ID</span>
                                   <span className="px-3 py-1 bg-surface font-black text-xs rounded-lg text-secondary">{order.tracking_id || order.id}</span>
                                </div>
                                <h3 className="text-2xl font-black text-secondary">
                                   {order.products.length} Products Ordered
                                </h3>
                                <p className="text-muted text-sm font-medium mt-1">Submitted on {new Date(order.created_at).toLocaleDateString()}</p>
                             </div>
                             
                             <div className="flex flex-col items-start md:items-end gap-3">
                                <span className="text-muted font-black text-[10px] uppercase tracking-widest">Estimated Status</span>
                                <div className={`px-5 py-2.5 rounded-2xl border flex items-center gap-2 font-black text-sm uppercase tracking-wider ${status.color}`}>
                                   {status.icon} {status.label}
                                </div>
                             </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                             <div className="md:col-span-2">
                                <span className="text-muted font-black text-[10px] uppercase tracking-widest block mb-4">Delivery Overview</span>
                                <div className="relative h-2 bg-surface rounded-full overflow-hidden">
                                   <div 
                                     className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000" 
                                     style={{ width: 
                                       order.status === 'pending' ? '10%' : 
                                       order.status === 'processing' ? '30%' : 
                                       order.status === 'printing' ? '60%' : 
                                       order.status === 'shipped' ? '85%' : '100%' 
                                     }} 
                                   />
                                </div>
                                <div className="flex justify-between mt-4 text-[10px] font-black uppercase text-muted tracking-tighter">
                                   <span>Ordered</span>
                                   <span>In Print</span>
                                   <span>Shipped</span>
                                   <span>Arrived</span>
                                </div>
                             </div>

                             <div>
                                <span className="text-muted font-black text-[10px] uppercase tracking-widest block mb-4">Need Help?</span>
                                <button className="w-full py-4 rounded-2xl border-2 border-border text-secondary font-black hover:border-primary hover:text-primary transition-all text-xs">
                                   Contact Support
                                </button>
                             </div>
                          </div>
                       </div>
                     );
                   })}
                </motion.div>
              )}

              {!orders && !loading && !error && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 flex flex-col items-center gap-6">
                   <div className="w-24 h-24 bg-surface rounded-[40px] flex items-center justify-center text-muted">
                      <Package size={48} />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-secondary">Search History.</h3>
                      <p className="text-muted font-medium mt-1">Use the search box above to find your order status.</p>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
