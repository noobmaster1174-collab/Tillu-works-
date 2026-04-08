import { useState, useEffect, Fragment } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Package, RefreshCw, ChevronDown, ChevronUp, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/admin/quotes`, {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to fetch data');
      
      const data = await res.json();
      setQuotes(data.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const toggleRow = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-surface pt-28 pb-16 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <ShieldCheck className="text-primary" size={24} />
              </div>
              <h1 className="text-3xl font-black text-secondary">Admin Dashboard</h1>
            </div>
            <p className="text-muted font-medium">Manage and review all customer orders and quotes.</p>
          </div>
          <button 
            onClick={fetchQuotes}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-border text-secondary font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh Data
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Package size={24} />
                </div>
                <div>
                    <div className="text-sm font-bold text-muted uppercase tracking-wider">Total Quotes</div>
                    <div className="text-2xl font-black text-secondary">{quotes.length}</div>
                </div>
            </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
            {loading && quotes.length === 0 ? (
                <div className="p-12 text-center text-muted font-semibold flex flex-col items-center gap-4">
                    <RefreshCw className="animate-spin text-primary" size={32} />
                    Loading secure data...
                </div>
            ) : quotes.length === 0 ? (
                <div className="p-12 text-center text-muted font-semibold">
                    No orders found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface/50 border-b border-border">
                                <th className="py-4 px-6 font-bold text-secondary text-sm">Quote ID</th>
                                <th className="py-4 px-6 font-bold text-secondary text-sm">Customer</th>
                                <th className="py-4 px-6 font-bold text-secondary text-sm">Date</th>
                                <th className="py-4 px-6 font-bold text-secondary text-sm">Total</th>
                                <th className="py-4 px-6 font-bold text-secondary text-sm">Status</th>
                                <th className="py-4 px-6 text-right font-bold text-secondary text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map((quote) => (
                                <Fragment key={quote.id}>
                                    <tr 
                                      className={`border-b border-border transition-colors hover:bg-surface/50 ${expandedId === quote.id ? 'bg-surface/30' : ''}`}
                                    >
                                        <td className="py-4 px-6 font-bold text-secondary">#{quote.id}</td>
                                        <td className="py-4 px-6">
                                            <div className="font-semibold text-secondary">{quote.name}</div>
                                            <div className="text-xs text-muted font-medium">{quote.email} • {quote.phone}</div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-muted">
                                            {new Date(quote.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6 font-black text-secondary">
                                            {quote.total_price ? `₹${quote.total_price.toLocaleString()}` : '—'}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-3 py-1 font-bold text-[10px] rounded-full uppercase tracking-wider ${
                                                quote.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                quote.status === 'finished' ? 'bg-green-100 text-green-700' :
                                                quote.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                                'bg-slate-100 text-slate-600'
                                            }`}>
                                                {quote.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button 
                                                onClick={() => toggleRow(quote.id)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            >
                                                {expandedId === quote.id ? 'Hide details' : 'View order'}
                                                {expandedId === quote.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Expanded Details Row */}
                                    {expandedId === quote.id && (
                                        <tr className="bg-surface border-b border-border">
                                            <td colSpan="6" className="p-0">
                                                <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                    
                                                    {/* What they ordered */}
                                                    <div className="space-y-6">
                                                        <div>
                                                            <h4 className="flex items-center gap-2 font-black text-secondary text-xs uppercase tracking-widest mb-4">
                                                            <Package size={14} className="text-primary"/> 
                                                            Order Details
                                                            </h4>
                                                            <div className="bg-white border border-border rounded-2xl p-4 divide-y divide-border">
                                                                {Array.isArray(quote.products) ? quote.products.map((prodId, idx) => {
                                                                    const qty = quote.quantities ? quote.quantities[prodId] : 'N/A';
                                                                    return (
                                                                        <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                                                                            <span className="font-bold text-secondary text-sm">{prodId}</span>
                                                                            <span className="text-xs font-black text-muted bg-surface px-2 py-1 rounded-md">Qty: {qty}</span>
                                                                        </div>
                                                                    )
                                                                }) : <div className="text-sm">Raw: {JSON.stringify(quote.products)}</div>}
                                                            </div>
                                                        </div>

                                                        {quote.metadata_info && Object.keys(quote.metadata_info).length > 0 && (
                                                            <div>
                                                                <h4 className="flex items-center gap-2 font-black text-secondary text-xs uppercase tracking-widest mb-4">
                                                                🎨 Configurations
                                                                </h4>
                                                                <div className="bg-white border border-border rounded-2xl p-4 space-y-2">
                                                                    {Object.entries(quote.metadata_info).map(([k, v]) => (
                                                                        <div key={k} className="flex justify-between text-xs font-bold">
                                                                            <span className="text-muted capitalize">{k}:</span>
                                                                            <span className="text-secondary capitalize">{v}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Requirements & Files */}
                                                    <div className="space-y-6">
                                                        <div>
                                                            <h4 className="flex items-center gap-2 font-black text-secondary text-xs uppercase tracking-widest mb-4">
                                                            <FileText size={14} className="text-primary"/> 
                                                            Notes
                                                            </h4>
                                                            <div className="bg-white border border-border rounded-2xl p-4 text-xs text-secondary font-bold leading-relaxed min-h-[80px]">
                                                                {quote.requirements || <span className="text-muted italic">No special requirements.</span>}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <h4 className="font-black text-secondary text-xs uppercase tracking-widest mb-2">Attachments</h4>
                                                            {quote.design_file_path && (
                                                                <a href={`${API_URL}/${quote.design_file_path}`} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white border border-border rounded-xl group hover:border-primary transition-all">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary"><ShieldCheck size={16}/></div>
                                                                        <span className="text-xs font-bold">Design Artwork</span>
                                                                    </div>
                                                                    <ChevronRight size={14} className="text-muted group-hover:text-primary transition-all"/>
                                                                </a>
                                                            )}
                                                            {quote.data_file_path && (
                                                                <a href={`${API_URL}/${quote.data_file_path}`} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white border border-border rounded-xl group hover:border-primary transition-all">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500"><FileText size={16}/></div>
                                                                        <span className="text-xs font-bold">Employee Data</span>
                                                                    </div>
                                                                    <ChevronRight size={14} className="text-muted group-hover:text-primary transition-all"/>
                                                                </a>
                                                            )}
                                                            {quote.file_path && (
                                                                <a href={`${API_URL}/${quote.file_path}`} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white border border-border rounded-xl group hover:border-primary transition-all">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500"><Package size={16}/></div>
                                                                        <span className="text-xs font-bold">Generic File</span>
                                                                    </div>
                                                                    <ChevronRight size={14} className="text-muted group-hover:text-primary transition-all"/>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Admin Actions */}
                                                    <div className="space-y-6">
                                                        <h4 className="flex items-center gap-2 font-black text-secondary text-xs uppercase tracking-widest mb-4">
                                                        🚀 Manage Status
                                                        </h4>
                                                        <div className="grid grid-cols-1 gap-3">
                                                            {[
                                                                { id: 'processing', label: 'Start Processing', color: 'bg-amber-500' },
                                                                { id: 'finished', label: 'Mark Finished', color: 'bg-green-500' },
                                                                { id: 'shipped', label: 'Mark Dispatched', color: 'bg-blue-500' },
                                                            ].map(btn => (
                                                                <button
                                                                    key={btn.id}
                                                                    disabled={quote.status === btn.id}
                                                                    onClick={async () => {
                                                                        try {
                                                                            const res = await fetch(`${API_URL}/api/admin/quotes/${quote.id}/status`, {
                                                                                method: 'PATCH',
                                                                                headers: { 
                                                                                    'Content-Type': 'application/json',
                                                                                    'Authorization': `Bearer ${user.token}`
                                                                                },
                                                                                body: JSON.stringify({ status: btn.id })
                                                                            });
                                                                            if (res.ok) {
                                                                                toast.success(`Marked as ${btn.id}`);
                                                                                fetchQuotes();
                                                                            }
                                                                        } catch (e) {
                                                                            toast.error("Failed to update status");
                                                                        }
                                                                    }}
                                                                    className={`p-4 rounded-2xl text-white font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:grayscale ${btn.color} shadow-lg shadow-${btn.color.split('-')[1]}-500/20`}
                                                                >
                                                                    {btn.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}
