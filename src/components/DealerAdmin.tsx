import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { Terminal, Phone, MapPin, Tag, RefreshCw, Layers, CheckSquare, Sparkles, CheckCircle } from 'lucide-react';

export default function DealerAdmin() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Load inquiries
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Update logic
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
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Contacted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Quotation Sent':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Scheduled':
        return 'bg-emerald-150 text-indigo-800 border-indigo-200';
      case 'Sold':
        return 'bg-emerald-600 text-white border-emerald-700';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredInquiries = filterStatus === 'All' 
    ? inquiries 
    : inquiries.filter(i => i.status === filterStatus);

  // Performance metrics calculation
  const totalLeads = inquiries.length;
  const pendingLeads = inquiries.filter(i => i.status === 'Pending').length;
  const conversionCount = inquiries.filter(i => i.status === 'Sold').length;
  const evLeads = inquiries.filter(i => i.vehicleInterest.toLowerCase().includes('e-')).length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 p-6 sm:p-8 rounded-2xl text-white shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-brand-gold">
              <Terminal className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-black">Dealer Administrative Desk</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">Lead Capture & CRM Management</h2>
            <p className="text-xs text-gray-400">
              Track live internet inquiries, adjust conversion statuses, and map sales funnel achievements for Om Siddhababa Enterprises.
            </p>
          </div>
          <button
            onClick={fetchInquiries}
            className="flex items-center gap-1.5 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer shadow-md transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Lead Board</span>
          </button>
        </div>

        {/* Dynamic Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-gray-400">Total Leads Received</span>
            <p className="text-2xl font-black text-brand-gold mt-1">{totalLeads}</p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-gray-400">Pending Action</span>
            <p className="text-2xl font-black text-amber-500 mt-1">{pendingLeads}</p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-gray-400">Closed Sales (Sold!)</span>
            <p className="text-2xl font-black text-emerald-400 mt-1 flex items-center gap-1">
              <span>{conversionCount}</span>
              {conversionCount > 0 && <CheckCircle className="w-4 h-4" />}
            </p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-gray-400">EV Interest Index</span>
            <p className="text-2xl font-black text-emerald-300 mt-1">
              {totalLeads > 0 ? `${Math.round((evLeads / totalLeads) * 100)}%` : '0%'}
            </p>
          </div>
        </div>
      </div>

      {/* Main CRM interface */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-50 pb-4">
          <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-green" />
            <span>Interactive Customer Enquiries</span>
          </h3>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Pending', 'Contacted', 'Quotation Sent', 'Scheduled', 'Sold'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-brand-green text-white border-brand-green shadow-xs'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-center py-16 space-y-2">
            <RefreshCw className="w-8 h-8 text-brand-green animate-spin mx-auto" />
            <p className="text-xs text-gray-400 font-bold">Downloading leads repository...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-xl">
            <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-700">No leads match the status: &quot;{filterStatus}&quot;</p>
            <p className="text-xs text-gray-400 mt-1">When customers submit the inquiry forms, their data records list instantly here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                className="hover:border-brand-green transition-all border border-gray-100 rounded-xl p-5 sm:p-6 bg-gradient-to-br from-white to-gray-50/50 hover:shadow-md relative group space-y-4"
              >
                {/* ID and Submission Date */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-brand-green bg-brand-green-light px-2 py-0.5 rounded">
                      {inq.id}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold">
                      {new Date(inq.submittedAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  {/* Mobile Actions / Status selection */}
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md border ${getStatusColor(inq.status)}`}>
                      {inq.status}
                    </span>
                  </div>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Customer Name</span>
                    <p className="text-gray-900 font-extrabold text-sm flex items-center gap-1.5">
                      <span>{inq.name}</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Phone & Contact</span>
                    <a href={`tel:${inq.phone}`} className="text-brand-green hover:underline font-extrabold flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      <span>+977 {inq.phone}</span>
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Vehicle Type / Interest</span>
                    <p className="text-gray-800 font-bold flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-gray-400" />
                      <span>{inq.vehicleInterest}</span>
                    </p>
                  </div>
                </div>

                {/* Location and Message */}
                <div className="text-xs text-gray-600 space-y-1 bg-white p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-1 font-bold text-gray-700">
                    <MapPin className="w-3.5 h-3.5 text-brand-green" />
                    <span>Inquiry Origin: {inq.location}</span>
                  </div>
                  <p className="italic text-gray-500 leading-relaxed font-medium block pt-1">
                    &quot;{inq.message}&quot;
                  </p>
                </div>

                {/* Actions Row to promote customer status */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100/60 text-xs">
                  <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Pipeline Action Desk</span>
                  </span>

                  <div className="flex flex-wrap gap-1">
                    {['Contacted', 'Quotation Sent', 'Scheduled', 'Sold'].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(inq.id, st as any)}
                        disabled={updatingId === inq.id || inq.status === st}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded cursor-pointer transition-all ${
                          inq.status === st
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                            : 'bg-white hover:bg-brand-green hover:text-white text-gray-700 border border-gray-300'
                        }`}
                      >
                        {updatingId === inq.id ? '...' : `Mark ${st}`}
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
  );
}
