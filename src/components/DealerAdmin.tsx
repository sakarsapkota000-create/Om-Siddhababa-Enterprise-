import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { 
  Building, Phone, MapPin, Tag, RefreshCw, Layers, CheckSquare, 
  Sparkles, CheckCircle, HelpCircle, BarChart3, TrendingUp, Users, Calendar, ShieldCheck, Mail, ArrowUpRight,
  Clock
} from 'lucide-react';

interface DealerAdminProps {
  onRefreshStats?: () => void;
}

export default function DealerAdmin({ onRefreshStats }: DealerAdminProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Load inquiries from Express backend api
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error('Failed to load inquiries from API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Update status in the Express API state
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setInquiries(inquiries.map(i => i.id === id ? updated : i));
        if (onRefreshStats) onRefreshStats();
      }
    } catch (err) {
      console.error('Failed to update status on API:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100/80 text-amber-900 border-amber-200/50';
      case 'Contacted':
        return 'bg-blue-100/80 text-blue-900 border-blue-200/50';
      case 'Quotation Sent':
        return 'bg-purple-100/80 text-purple-900 border-purple-200/50';
      case 'Scheduled':
        return 'bg-indigo-100/80 text-indigo-900 border-indigo-200/50';
      case 'Sold':
        return 'bg-emerald-600 text-white border-emerald-700 shadow-xs shadow-emerald-500/10';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Search and status filters
  const searchedInquiries = inquiries.filter(i => {
    const term = searchTerm.toLowerCase();
    return (
      i.name.toLowerCase().includes(term) ||
      i.phone.toLowerCase().includes(term) ||
      i.location.toLowerCase().includes(term) ||
      i.vehicleInterest.toLowerCase().includes(term)
    );
  });

  const filteredInquiries = filterStatus === 'All' 
    ? searchedInquiries 
    : searchedInquiries.filter(i => i.status === filterStatus);

  // Advanced KPIs
  const totalLeads = inquiries.length;
  const pendingLeads = inquiries.filter(i => i.status === 'Pending').length;
  const closedCount = inquiries.filter(i => i.status === 'Sold').length;
  const contactProgressCount = inquiries.filter(i => i.status !== 'Pending' && i.status !== 'Sold').length;
  
  // Estimate total pipeline volume based on estimated customer vehicle valuations
  const estimatedPipelineValue = inquiries.reduce((sum, inq) => {
    const isEV = inq.vehicleInterest.toLowerCase().includes('e-');
    const estimatedValue = isEV ? 650000 : 490000;
    return sum + (inq.status === 'Sold' ? estimatedValue : estimatedValue * 0.3); // closed sale counts fully, lead counts fractional
  }, 0);

  return (
    <div className="space-y-8 bg-slate-50 border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 pointer-events-none"></div>

      <div className="relative space-y-8">
        {/* Top Header layout */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border-b border-gray-200 pb-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-brand-green text-[10px] font-black uppercase tracking-widest bg-brand-green-light px-3 py-1.5 rounded-full border border-brand-green/15 inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
              <span>Secure Live Admin Terminal</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none flex items-center gap-2">
              <span>Piaggio Sarlahi Branch Administration</span>
            </h2>
            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
              Authorized backend workspace connected to Express API. Monitor customer intents, assign sales stages, and evaluate Terai region dealership performance.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full xl:w-auto">
            <button
              onClick={fetchInquiries}
              className="flex items-center gap-2 justify-center w-full xl:w-auto bg-brand-green hover:bg-brand-green-dark text-white font-black py-3 px-5 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Force Sync Leads</span>
            </button>
          </div>
        </div>

        {/* Corporate KPI Dashboard Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-2 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Total Registered Leads</span>
              <span className="bg-brand-green-light text-brand-green p-1.5 rounded-lg border border-brand-green/10">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">{totalLeads}</p>
              <p className="text-[10px] text-gray-500 font-bold mt-1">100% active database match</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-2 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Under Evaluation</span>
              <span className="bg-amber-100 text-amber-800 p-1.5 rounded-lg">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <div>
              <p className="text-3xl font-black text-amber-600">{pendingLeads}</p>
              <p className="text-[10px] text-gray-500 font-bold mt-1">Awaiting immediate callback</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-2 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Closed Sales (Sold!)</span>
              <span className="bg-emerald-100 text-emerald-800 p-1.5 rounded-lg">
                <CheckCircle className="w-4 h-4" />
              </span>
            </div>
            <div>
              <p className="text-3xl font-black text-emerald-650">{closedCount}</p>
              <p className="text-[10px] text-gray-500 font-bold mt-1">
                Conversion rate: {totalLeads > 0 ? `${Math.round((closedCount / totalLeads) * 100)}%` : '0%'}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-2 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Estimated Pipeline Volume</span>
              <span className="bg-blue-100 text-blue-800 p-1.5 rounded-lg">
                <BarChart3 className="w-4 h-4" />
              </span>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-slate-800">NPR {estimatedPipelineValue.toLocaleString()}</p>
              <p className="text-[10px] text-emerald-650 font-bold mt-1 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> High fleet conversion index
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters Hub */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 shadow-3xs">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1 w-full">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Quick search directory</label>
              <input
                type="text"
                placeholder="Search by client name, mobile phone number, location or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs font-semibold px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green text-gray-850"
              />
            </div>
            
            <div className="shrink-0 w-full lg:w-auto">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Filter by progress stage</label>
              <div className="flex flex-wrap gap-1">
                {['All', 'Pending', 'Contacted', 'Quotation Sent', 'Scheduled', 'Sold'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-2 text-[11px] font-black rounded-lg border transition-all cursor-pointer ${
                      filterStatus === status
                        ? 'bg-brand-green text-white border-brand-green shadow-xs'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Inquiries Card Listing layout */}
          {loading ? (
            <div className="text-center py-20 space-y-3">
              <RefreshCw className="w-9 h-9 text-brand-green animate-spin mx-auto" />
              <p className="text-xs text-gray-400 font-extrabold tracking-wide uppercase">Contacting Express database gateway...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <Layers className="w-12 h-12 text-gray-350 mx-auto mb-2" />
              <p className="text-xs font-black text-gray-750">No enquiries match your specification.</p>
              <p className="text-[10px] text-gray-400 mt-1 max-w-sm mx-auto">When clients request custom quotes or test drives from any of our stores, their data will propagate dynamically within this desk panel.</p>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-gray-100">
              {filteredInquiries.map((inq, index) => (
                <div
                  key={inq.id}
                  className={`pt-4 first:pt-0 group flex flex-col md:flex-row justify-between items-start md:items-center gap-5 transition-all duration-300`}
                >
                  {/* Lead Information */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[9px] font-black text-brand-green bg-brand-green-light px-2.5 py-0.5 rounded-md border border-brand-green/20">
                        {inq.id.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {new Date(inq.submittedAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${getStatusColor(inq.status)}`}>
                        {inq.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-1 gap-x-4">
                      <p className="text-xs font-black text-gray-900 mb-0.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        <span>Client: {inq.name}</span>
                      </p>
                      <p className="text-xs text-gray-650 font-bold flex items-center gap-1">
                        <span>Phone:</span>
                        <a href={`tel:${inq.phone}`} className="text-brand-green hover:underline font-extrabold flex items-center gap-0.5">
                          {inq.phone}
                        </a>
                      </p>
                      <p className="text-xs text-gray-650 font-bold flex items-center gap-1 truncate">
                        <span>Vehicles Interest:</span>
                        <span className="text-slate-800 font-extrabold">{inq.vehicleInterest}</span>
                      </p>
                    </div>

                    <p className="text-xs text-gray-550 border-l-2 border-brand-amber bg-slate-50 p-3 rounded-r-xl italic font-medium">
                      &quot;{inq.message}&quot;
                    </p>

                    <p className="text-[11px] text-gray-450 font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-green" />
                      <span>Inquiry Territory Point: {inq.location}</span>
                    </p>
                  </div>

                  {/* Actions Column */}
                  <div className="shrink-0 flex flex-wrap md:flex-col gap-1.5 items-end justify-start w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-3 md:pt-0">
                    <span className="text-[8px] font-black uppercase text-gray-405 tracking-wider mb-1 hidden md:block">Sales Action Pipeline</span>
                    <div className="flex flex-wrap gap-1.5 justify-start md:justify-end w-full">
                      {['Contacted', 'Quotation Sent', 'Scheduled', 'Sold'].map((stage) => (
                        <button
                          key={stage}
                          onClick={() => handleUpdateStatus(inq.id, stage)}
                          disabled={updatingId === inq.id || inq.status === stage}
                          className={`px-2.5 py-1.5 text-[10px] font-black rounded-lg cursor-pointer transition-all ${
                            inq.status === stage
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                              : 'bg-white hover:bg-brand-green hover:text-white text-gray-700 border border-gray-200'
                          }`}
                        >
                          {updatingId === inq.id ? '...' : `Mark ${stage}`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
