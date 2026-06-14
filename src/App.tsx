import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EMICalculator from './components/EMICalculator';
import DealerAdmin from './components/DealerAdmin';
import SiddhababaAI from './components/SiddhababaAI';
import { VEHICLES, BLOGS, COUNTERS, TESTIMONIALS } from './data';
import { Vehicle, BlogPost } from './types';
import { 
  ChevronRight, ArrowRight, CheckCircle2, Phone, Briefcase, 
  MapPin, ShieldCheck, Mail, Calendar, Clock, BookOpen, 
  Settings, Eye, Heart, MessageSquare, Award, UserCheck, 
  HelpCircle, Wrench, Package, Cpu, Milestone
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [aiOpen, setAiOpen] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('piaggio-ape-city');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Inquiry Form Fields
  const [inquiryName, setInquiryName] = useState<string>('');
  const [inquiryPhone, setInquiryPhone] = useState<string>('');
  const [inquiryVehicle, setInquiryVehicle] = useState<string>('Piaggio Ape E-City FX');
  const [inquiryLocation, setInquiryLocation] = useState<string>('Kathmandu');
  const [inquiryMessage, setInquiryMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Quick navigation helpers
  const handleOpenInquiry = (vehicleName: string) => {
    setInquiryVehicle(vehicleName);
    setActiveTab('contact');
    setTimeout(() => {
      const el = document.getElementById('inquiry-form-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpenFinanceForVehicle = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    setActiveTab('finance');
  };

  // Submit Inquiry handler
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone || !inquiryLocation) {
      alert('Please fill out the required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiryName,
          phone: inquiryPhone,
          vehicleInterest: inquiryVehicle,
          location: inquiryLocation,
          message: inquiryMessage
        })
      });

      if (res.ok) {
        setSubmitSuccess(true);
        // Clear fields
        setInquiryName('');
        setInquiryPhone('');
        setInquiryMessage('');
        
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 8000);
      }
    } catch (err) {
      console.error('Failed to submit lead:', err);
      alert('Failed to send inquiry due to network issue. Please call directly!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      {/* Top sticky navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenConsultant={() => setAiOpen(true)} 
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-fade-in">
            
            {/* HERO SECTION */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[460px] flex items-center shadow-2xl">
              {/* Geometric pattern overlay */}
              <div className="absolute inset-0 bg-radial-gradient from-brand-green/30 to-slate-950 opacity-90 z-0"></div>
              
              <div className="relative z-10 px-8 sm:px-12 py-16 max-w-2xl space-y-6">
                <span className="bg-brand-gold text-slate-900 font-extrabold px-3 py-1.5 rounded-full text-xs uppercase tracking-wider">
                  Om Siddhababa Enterprises
                </span>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                  Driving Nepal’s <span className="text-brand-green">Commercial Mobility</span> Future
                </h1>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-semibold">
                  Authorized Piaggio dealer in Kathmandu. Empowers your logistics and passenger transport routes with high-mileage three-wheelers & cost-efficient electric vehicles.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('vehicles')}
                    className="bg-brand-green hover:bg-brand-green-dark text-white font-extrabold px-6 py-3.5 rounded-xl text-xs transition-all tracking-wide cursor-pointer active:scale-95 shadow-lg"
                  >
                    Explore Vehicles
                  </button>
                  <button
                    onClick={() => handleOpenInquiry('Piaggio Ape E-City FX')}
                    className="bg-white/10 hover:bg-white/15 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs transition-all tracking-wide cursor-pointer active:scale-95 border border-white/20"
                  >
                    Book Test Drive
                  </button>
                  <button
                    onClick={() => setActiveTab('finance')}
                    className="bg-brand-gold hover:bg-[#c29828] text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-xs transition-all tracking-wide cursor-pointer active:scale-95"
                  >
                    Calculate EMI
                  </button>
                </div>
              </div>

              {/* Graphical illustration for Hero background right-side */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:flex items-center justify-center p-8 bg-gradient-to-l from-brand-green/20 to-transparent">
                <div className="text-center space-y-4">
                  <div className="w-40 h-40 rounded-full border-4 border-dashed border-brand-green flex items-center justify-center text-brand-gold bg-brand-green/10">
                    <Cpu className="w-16 h-16 text-brand-gold animate-spin-slow" />
                  </div>
                  <div className="text-xs">
                    <p className="font-extrabold text-brand-gold uppercase tracking-widest">Ape E-City Electric</p>
                    <p className="text-gray-400">Zero Emissions, Instant Profit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TRUST BUILDING COUNTERS */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {COUNTERS.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-extrabold text-brand-green tracking-tight">
                    {item.value}
                  </p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* WHY CHOOSE US */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <span className="text-brand-green text-xs font-bold uppercase tracking-widest">The Dealership Advantage</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Why Commercial Businesses Trust Us
                </h2>
                <div className="w-16 h-1 bg-brand-green mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[
                  {
                    icon: <Award className="w-6 h-6 text-brand-gold" />,
                    title: 'Authorized Piaggio Dealer',
                    desc: 'Direct import of genuine passenger & cargo rickshaws with brand warranty.'
                  },
                  {
                    icon: <Wrench className="w-6 h-6 text-brand-gold" />,
                    title: 'Genuine Spare Parts',
                    desc: 'Fully stocked service warehouse in Kathmandu insuring absolute uptime.'
                  },
                  {
                    icon: <HelpCircle className="w-6 h-6 text-brand-gold" />,
                    title: 'Finance & EMI Assistance',
                    desc: 'Prioritized loan approvals in alliance with major Nepalese banks.'
                  },
                  {
                    icon: <UserCheck className="w-6 h-6 text-brand-gold" />,
                    title: 'After-Sales Service',
                    desc: 'Certified engineers trained on state-of-the-art diagnostic machines.'
                  },
                  {
                    icon: <Briefcase className="w-6 h-6 text-brand-gold" />,
                    title: 'Mobility Experts',
                    desc: 'Guiding local delivery brands and operators to lower their cost per kilometer.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all space-y-3">
                    <div className="w-11 h-11 bg-brand-green-light rounded-lg flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SPECIAL FOCUS FEATURED VEHICLES */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-gray-150 pb-4">
                <div className="space-y-1">
                  <span className="text-brand-green text-xs font-bold uppercase tracking-widest block">Premium Showroom Fleet</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Featured Piaggio Auto Rickshaws
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('vehicles')}
                  className="font-bold text-xs text-brand-green hover:text-brand-green-dark flex items-center gap-1 transition-colors"
                >
                  <span>View All Specifications</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {VEHICLES.map((vehicle) => (
                  <div 
                    key={vehicle.id} 
                    className="bg-white rounded-2xl border border-gray-150 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    {/* Header banner */}
                    <div className="bg-slate-900 text-white p-6 relative">
                      <span className={`absolute right-4 top-4 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${
                        vehicle.category === 'electric' ? 'bg-emerald-600 text-white' : 'bg-brand-gold text-slate-900'
                      }`}>
                        {vehicle.fuelType}
                      </span>
                      <h3 className="text-xl font-black text-white">{vehicle.name}</h3>
                      <p className="text-xs text-brand-gold mt-1 uppercase font-bold tracking-widest">{vehicle.tagline}</p>
                    </div>

                    {/* Specifications Body */}
                    <div className="p-6 space-y-4">
                      {/* Cost metrics */}
                      <div className="p-3 bg-brand-green-light hover:bg-[#e4f6ee] transition-colors rounded-xl flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-700">Estimated Price (Kathmandu):</span>
                        <span className="font-extrabold text-brand-green text-sm">{vehicle.priceRange}</span>
                      </div>

                      {/* Display specs */}
                      <div className="grid grid-cols-2 gap-4 text-xs font-semibold py-2">
                        {vehicle.specs.engine && (
                          <div className="border border-gray-100 p-2.5 rounded-lg bg-gray-50/50">
                            <span className="text-[10px] text-gray-400 block font-bold uppercase">Engine Power</span>
                            <span className="text-gray-800">{vehicle.specs.engine}</span>
                          </div>
                        )}
                        {vehicle.specs.range && (
                          <div className="border border-gray-100 p-2.5 rounded-lg bg-emerald-50/30">
                            <span className="text-[10px] text-emerald-700 block font-bold uppercase">Certified Range</span>
                            <span className="text-emerald-800">{vehicle.specs.range}</span>
                          </div>
                        )}
                        {vehicle.specs.runningCost && (
                          <div className="border border-gray-100 p-2.5 rounded-lg bg-emerald-50/30">
                            <span className="text-[10px] text-emerald-700 block font-bold uppercase">Running Cost / KM</span>
                            <span className="text-emerald-800">{vehicle.specs.runningCost}</span>
                          </div>
                        )}
                        {vehicle.specs.payloadCapacity && (
                          <div className="border border-gray-100 p-2.5 rounded-lg bg-gray-50/50">
                            <span className="text-[10px] text-gray-400 block font-bold uppercase">Payload Capacity</span>
                            <span className="text-gray-800 font-extrabold">{vehicle.specs.payloadCapacity}</span>
                          </div>
                        )}
                        {vehicle.specs.seatingCapacity && (
                          <div className="border border-gray-100 p-2.5 rounded-lg bg-gray-50/50">
                            <span className="text-[10px] text-gray-400 block font-bold uppercase">Seating Comfort</span>
                            <span className="text-gray-800">{vehicle.specs.seatingCapacity}</span>
                          </div>
                        )}
                        {vehicle.specs.mileage && (
                          <div className="border border-gray-100 p-2.5 rounded-lg bg-gray-50/50">
                            <span className="text-[10px] text-gray-400 block font-bold uppercase">Fuel Mileage</span>
                            <span className="text-gray-800">{vehicle.specs.mileage}</span>
                          </div>
                        )}
                      </div>

                      {/* Features Bullet */}
                      <div className="space-y-1.5">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Top Features</p>
                        <div className="grid grid-cols-1 gap-1 text-xs">
                          {vehicle.features.slice(0, 3).map((f, i) => (
                            <div key={i} className="flex items-start gap-1.5 font-semibold text-gray-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-green mt-0.5" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Cards */}
                    <div className="px-6 pb-6 pt-3 grid grid-cols-2 gap-3 border-t border-gray-50">
                      <button
                        onClick={() => handleOpenFinanceForVehicle(vehicle.id)}
                        className="border border-brand-green hover:bg-brand-green-light text-brand-green font-extrabold py-2.5 px-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
                      >
                        Calculate Loans
                      </button>
                      <button
                        onClick={() => handleOpenInquiry(vehicle.name)}
                        className="bg-brand-green hover:bg-brand-green-dark text-white font-extrabold py-2.5 px-3 rounded-xl text-xs transition-all cursor-pointer text-center shadow-xs"
                      >
                        Inquire Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CUSTOMER TESTIMONIALS */}
            <div className="space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-xs">
              <div className="text-center space-y-2">
                <span className="text-brand-green text-xs font-bold uppercase tracking-widest">Entrepreneurs Vouch For Us</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  What Our Customers Say
                </h2>
                <div className="w-16 h-1 bg-brand-green mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-xl p-5 space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow bg-gray-50/30">
                    <p className="text-xs text-gray-500 italic leading-relaxed font-semibold">
                      &quot;{t.quote}&quot;
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-9 h-9 rounded-full bg-brand-green text-brand-gold font-bold flex items-center justify-center text-xs">
                        {t.name[0]}
                      </div>
                      <div className="text-xs">
                        <h4 className="font-black text-gray-800">{t.name}</h4>
                        <p className="text-[10px] text-gray-400 font-bold">{t.role} - <span className="text-brand-green">{t.location}</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA BANNER */}
            <div className="bg-gradient-to-r from-teal-950 to-brand-green text-center text-white p-12 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 -translate-y-12"></div>
              <h2 className="text-3xl font-black text-white leading-tight">
                Ready to Start Customizing Your Business Journey with Piaggio?
              </h2>
              <p className="text-sm text-gray-200 max-w-lg mx-auto font-semibold">
                Speak directly with transport sales advisors today. Receive verified quotes, bank pre-approvals, or request immediate delivery in Kathmandu.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setActiveTab('contact')}
                  className="bg-brand-gold hover:bg-[#cda429] text-slate-900 font-extrabold px-6 py-3.5 rounded-xl text-xs transition-colors cursor-pointer shadow-lg inline-flex items-center gap-2 active:scale-95"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ABOUT US */}
        {activeTab === 'about' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-brand-green text-xs font-bold uppercase tracking-widest">Our Heritage</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">About Om Siddhababa Enterprises</h2>
              <p className="text-xs text-gray-500">Authorized Piaggio Commercial Vehicle Dealer in Nepal, empowering transport operations with zero-compromise mechanical capabilities.</p>
              <div className="w-16 h-1 bg-brand-green mx-auto rounded-full mt-3"></div>
            </div>

            {/* Story grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-2xl border border-gray-100 shadow-xs">
              <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">
                <p>
                  At <strong>Om Siddhababa Enterprises</strong>, we believe commercial vehicles are direct tools of progress. More than simple metal boxes on three wheels, they represent livelihoods, route-efficiency, local deliveries, and environmental responsibility inside Nepal.
                </p>
                <p>
                  As an authorized dealership for Piaggio, we maintain high standards across three core divisions: Vehicle Sales, Genuine Spare Parts, and Mechanical Servicing. Our certified workshop features trained mechanics capable of diagnostics for modern emission engines and next-gen electric powertrains (LFP batteries).
                </p>
                <div className="bg-brand-green-light border-l-4 border-brand-green p-3.5 rounded-r-xl">
                  <p className="text-brand-green font-bold text-xs italic">
                    &quot;Our absolute commitments rest in helping transport operators maximize daily profit indices through custom financing policies and robust maintenance vowing.&quot;
                  </p>
                </div>
              </div>

              {/* Graphic Block representing Corporate parameters */}
              <div className="space-y-4">
                {[
                  {
                    title: 'Our Mission',
                    desc: 'To empower Nepalese operators and logistic entities with highly efficient, robust, and cost-effective commercial transport solutions.',
                    bg: 'bg-teal-50'
                  },
                  {
                    title: 'Our Vision',
                    desc: 'To establish Om Siddhababa as the premier, gold-standard dealership for electric and diesel three-wheelers across Nepal.',
                    bg: 'bg-amber-50/50'
                  },
                  {
                    title: 'Corporate Values',
                    desc: 'Guarantees absolute price transparency, genuine factory spares, and long-term diagnostic backups on every single chassis built.',
                    bg: 'bg-emerald-50'
                  }
                ].map((v, i) => (
                  <div key={i} className={`${v.bg} p-4 rounded-xl border border-gray-100/50`}>
                    <h4 className="font-extrabold text-gray-900 text-sm mb-1">{v.title}</h4>
                    <p className="text-xs text-gray-600 font-semibold leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership Message Section */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="max-w-2xl space-y-4">
                <span className="text-brand-gold text-xs uppercase tracking-wider font-extrabold">Executive Commitment</span>
                <h3 className="text-lg font-bold">Leading the Go-Green Transit Switch</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  &quot;Nepal’s fuel import bill poses heavy weight on public operators. Moving our taxi and cargo fleets over to custom-configured lithium electric powertrains directly supports our local economies. Om Siddhababa is proud to be at the forefront of this industrial transformation in Nepal.&quot;
                </p>
                <div className="pt-2">
                  <p className="text-sm font-black text-brand-gold">Board of Directors</p>
                  <p className="text-[10px] text-gray-400">Om Siddhababa Enterprises, Kathmandu</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VEHICLES CATALOG */}
        {activeTab === 'vehicles' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-brand-green text-xs font-bold uppercase tracking-widest">The Showroom</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Explore Our Piaggio Fleet</h2>
              <p className="text-xs text-gray-500 max-w-lg mx-auto">Compare specifications, fuel capabilities, exact payload dimensions, and running costs for local delivery and passenger transport.</p>
              <div className="w-16 h-1 bg-brand-green mx-auto rounded-full mt-3"></div>
            </div>

            {/* Vehicle List Sectioned */}
            <div className="space-y-12">
              {['passenger', 'cargo', 'electric'].map((category) => {
                const categoryVehicles = VEHICLES.filter(v => v.category === category || (category === 'electric' && v.fuelType === 'Electric'));
                if (categoryVehicles.length === 0) return null;
                
                return (
                  <div key={category} className="space-y-6">
                    <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-widest border-b border-gray-200 pb-2 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-brand-green"></span>
                      <span>{category === 'passenger' ? 'Passenger Auto Rickshaws' : category === 'cargo' ? 'Cargo Loading Auto Series' : 'Zero Emission Electric (EV) Autos'}</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {categoryVehicles.map((vehicle) => (
                        <div 
                          key={vehicle.id} 
                          className="bg-white rounded-2xl border border-gray-150 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
                        >
                          {/* Header section with image placeholder avatar */}
                          <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                            <div>
                              <h4 className="text-lg font-black text-white">{vehicle.name}</h4>
                              <p className="text-[10px] text-brand-gold uppercase font-bold tracking-widest mt-0.5">{vehicle.tagline}</p>
                            </div>
                            <span className="text-xs font-black bg-brand-green text-white px-2.5 py-1 rounded">
                              {vehicle.fuelType}
                            </span>
                          </div>

                          {/* Technical Specs Accordion Grid */}
                          <div className="p-6 space-y-6">
                            <div className="space-y-2">
                              <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Operational Specs</p>
                              <div className="grid grid-cols-2 gap-3 text-xs">
                                {vehicle.specs.engine && (
                                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <span className="text-[10px] font-bold text-gray-400 block uppercase">Engine displacement</span>
                                    <span className="font-extrabold text-gray-800">{vehicle.specs.engine}</span>
                                  </div>
                                )}
                                {vehicle.specs.batteryCapacity && (
                                  <div className="bg-emerald-50/20 p-3 rounded-xl border border-emerald-100">
                                    <span className="text-[10px] font-bold text-emerald-800 block uppercase">Battery Storage</span>
                                    <span className="font-extrabold text-emerald-900">{vehicle.specs.batteryCapacity}</span>
                                  </div>
                                )}
                                {vehicle.specs.range && (
                                  <div className="bg-emerald-50/20 p-3 rounded-xl border border-emerald-110">
                                    <span className="text-[10px] font-bold text-emerald-800 block uppercase">Single Charge Range</span>
                                    <span className="font-extrabold text-emerald-900">{vehicle.specs.range}</span>
                                  </div>
                                )}
                                {vehicle.specs.chargingTime && (
                                  <div className="bg-emerald-50/20 p-3 rounded-xl border border-emerald-110">
                                    <span className="text-[10px] font-bold text-emerald-800 block uppercase">Charging Time</span>
                                    <span className="font-extrabold text-emerald-900">{vehicle.specs.chargingTime}</span>
                                  </div>
                                )}
                                {vehicle.specs.runningCost && (
                                  <div className="bg-emerald-50/20 p-3 rounded-xl border border-emerald-110">
                                    <span className="text-[10px] font-bold text-emerald-800 block uppercase">Running cost / KM</span>
                                    <span className="font-extrabold text-brand-green">{vehicle.specs.runningCost}</span>
                                  </div>
                                )}
                                {vehicle.specs.payloadCapacity && (
                                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <span className="text-[10px] font-bold text-gray-400 block uppercase">Approved Payload</span>
                                    <span className="font-extrabold text-gray-800">{vehicle.specs.payloadCapacity}</span>
                                  </div>
                                )}
                                {vehicle.specs.cargoDimensions && (
                                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 col-span-2">
                                    <span className="text-[10px] font-bold text-gray-400 block uppercase">Box Tray Dimensions</span>
                                    <span className="font-extrabold text-gray-800">{vehicle.specs.cargoDimensions}</span>
                                  </div>
                                )}
                                {vehicle.specs.mileage && (
                                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <span className="text-[10px] font-bold text-gray-400 block uppercase">Avg. Fuel Mileage</span>
                                    <span className="font-extrabold text-gray-800">{vehicle.specs.mileage}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Features list */}
                            <div className="space-y-2">
                              <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Machinery & Vetting Details</p>
                              <ul className="grid grid-cols-1 gap-2 text-xs">
                                {vehicle.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-2 font-semibold text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Price Footer action */}
                          <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold block uppercase">Approx. On-Road NPR</span>
                              <span className="text-base font-extrabold text-brand-green leading-none">{vehicle.priceRange}</span>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => handleOpenFinanceForVehicle(vehicle.id)}
                                className="bg-white hover:bg-gray-50 text-brand-green font-bold border border-gray-200 py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                              >
                                Finance EMI
                              </button>
                              <button
                                onClick={() => handleOpenInquiry(vehicle.name)}
                                className="bg-brand-green hover:bg-brand-green-dark text-white font-extrabold py-2.5 px-4 rounded-xl text-xs cursor-pointer shadow-xs transition-all active:scale-95"
                              >
                                Inquire
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-brand-green text-xs font-bold uppercase tracking-widest">Solutions</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Services & Fleet Support</h2>
              <p className="text-xs text-gray-500 max-w-lg mx-auto">We keep your Piaggio autos moving. Fully integrated workshop, spare parts storage, and customized logistics packages.</p>
              <div className="w-16 h-1 bg-brand-green mx-auto rounded-full mt-3"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Vehicle Sales',
                  desc: 'Comprehensive inventory of passenger Rickshaws, Diesel cargo loaders, and Quiet electric autos in stock in Kathmandu showroom.'
                },
                {
                  title: 'Genuine Spare Parts',
                  desc: 'We are certified suppliers of authentic Piaggio spares. Avoid low-quality generic parts to maintain absolute vehicle warranty.'
                },
                {
                  title: 'Specialist Maintenance',
                  desc: 'Our mechanical bays feature professional diagnostic scan tools specifically tailored to recalibrate electric battery controls.'
                },
                {
                  title: 'Finance & Vetting Support',
                  desc: 'Hassle-free loan preparation. Our staff coordinates documents mapping directly to bank checklist policies minimizing delay indices.'
                },
                {
                  title: 'Insurance Vouching',
                  desc: 'Preferential rate negotiations with Nepal premier commercial vehicle insurance agencies to safeguard your investments.'
                },
                {
                  title: 'Commercial Fleet Solutions',
                  desc: 'Dedicated transport coordination packages targeting Schools, municipal local teams, logistics aggregators, and water suppliers.'
                }
              ].map((s, idx) => (
                <div key={idx} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow space-y-3">
                  <div className="w-10 h-10 bg-brand-green-light rounded-xl flex items-center justify-center text-brand-green text-base font-bold font-mono">
                    {idx + 1}
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-sm">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Fleet partners target block */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 md:col-span-2">
                <span className="text-brand-gold text-xs uppercase tracking-widest font-extrabold">Fleet Packages</span>
                <h3 className="text-lg font-black">Targeted Solutions For Municipalities, Schools, and Courier Brands</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-semibold">
                  Transitioning small freight delivery to low running-cost electric three-wheelers can downscale logistics operating budgets by more than 50%. We support bulk orders with custom branding livery, customized cargo tray configurations, and priority mechanic support.
                </p>
              </div>
              <div className="flex flex-col justify-center sm:items-end shrink-0 gap-2">
                <button
                  onClick={() => handleOpenInquiry('Municipal Fleet Solutions')}
                  className="bg-brand-green hover:bg-brand-green-dark text-white font-extrabold py-3 px-5 rounded-xl text-xs cursor-pointer shadow-md text-center transition-all"
                >
                  Request Fleet Proposal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-brand-green text-xs font-bold uppercase tracking-widest">Captured Moments</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Showroom & Customer Success</h2>
              <p className="text-xs text-gray-500">A visual look into our showroom operations, delivery handovers, local transport, and maintenance hubs.</p>
              <div className="w-16 h-1 bg-brand-green mx-auto rounded-full mt-3"></div>
            </div>

            {/* Simulated Gallery categorized under responsive grids */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { title: 'Kathmandu Showroom Lobby', cat: 'Showroom' },
                { title: 'LPG Cargo Client Handover', cat: 'Handovers' },
                { title: 'Electric Ape Delivery Ceremony', cat: 'Handovers' },
                { title: 'Authorized Spares Warehouse', cat: 'Service' },
                { title: 'Certified Diagnostics Workshop', cat: 'Service' },
                { title: 'Happy Water Agency Fleet Owner', cat: 'Success' }
              ].map((g, idx) => (
                <div key={idx} className="bg-white border border-gray-150 rounded-2xl overflow-hidden hover:shadow-md transition-all group">
                  {/* Styled block representing layout gallery picture */}
                  <div className="bg-slate-800 text-white h-44 flex flex-col justify-between p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-slate-950 opacity-90 z-0"></div>
                    <span className="bg-slate-900/80 text-brand-gold text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md self-start border border-white/10 relative z-10">
                      {g.cat}
                    </span>
                    <div className="space-y-1 relative z-10">
                      <p className="text-xs font-black tracking-wide leading-snug">{g.title}</p>
                      <p className="text-[9px] text-gray-400 font-bold">Om Siddhababa Facility</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: BLOG */}
        {activeTab === 'blog' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-brand-green text-xs font-bold uppercase tracking-widest">Industry Insights</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Commercial Mobility Blog</h2>
              <p className="text-xs text-gray-500">Read the latest buying guides, running cost calculations, and business success guides for Nepalese transport.</p>
              <div className="w-16 h-1 bg-brand-green mx-auto rounded-full mt-3"></div>
            </div>

            {/* Conditional Detail view vs Grid view */}
            {selectedBlog ? (
              <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 space-y-6">
                {/* Back button */}
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="font-bold text-xs text-brand-green hover:underline cursor-pointer"
                >
                  &larr; Back to all articles
                </button>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-bold">
                    <span className="bg-brand-green-light text-brand-green px-2.5 py-1 rounded">
                      {selectedBlog.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{selectedBlog.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{selectedBlog.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                    {selectedBlog.title}
                  </h3>
                </div>

                {/* Main Markdown content simulated */}
                <div className="whitespace-pre-line text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold space-y-4 border-t border-gray-100 pt-6">
                  {selectedBlog.content}
                </div>

                <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs">
                    <p className="font-extrabold text-gray-900">Need specific transport counsel?</p>
                    <p className="text-gray-500">Speak anonymously with an AI consultant or book a callback.</p>
                  </div>
                  <button
                    onClick={() => handleOpenInquiry(selectedBlog.title)}
                    className="bg-brand-green hover:bg-brand-green-dark text-white font-extrabold py-3 px-5 rounded-xl text-xs cursor-pointer shadow-xs transition-colors shrink-0 text-center"
                  >
                    Discuss This Article With Us
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BLOGS.map((blog) => (
                  <div key={blog.id} className="bg-white rounded-2xl border border-gray-150 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                      {/* Styled decorative card header */}
                      <div className="bg-slate-900 text-white p-5 h-28 flex flex-col justify-between relative">
                        <div className="absolute inset-0 bg-radial-gradient from-brand-green/30 to-slate-950 opacity-90 z-0"></div>
                        <span className="bg-white/10 text-brand-gold text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md self-start border border-white/25 relative z-10">
                          {blog.category}
                        </span>
                        <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold relative z-10">
                          <span>{blog.date}</span>
                          <span>{blog.readTime}</span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h4 className="font-black text-gray-900 text-sm leading-snug group-hover:text-brand-green transition-colors">
                          {blog.title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 font-semibold">
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-gray-50 mt-3">
                      <button
                        onClick={() => setSelectedBlog(blog)}
                        className="w-full text-brand-green hover:bg-brand-green hover:text-white border border-brand-green font-extrabold py-2 px-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
                      >
                        Read Full Article
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 7: FINANCE */}
        {activeTab === 'finance' && (
          <div className="animate-fade-in">
            <EMICalculator 
              initialVehiclePrice={selectedVehicle ? VEHICLES.find(v => v.id === selectedVehicle)?.approxPriceNPR : undefined}
              initialVehicleId={selectedVehicle || undefined}
              onOpenInquiry={handleOpenInquiry} 
            />
          </div>
        )}

        {/* TAB 8: CONTACT */}
        {activeTab === 'contact' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-brand-green text-xs font-bold uppercase tracking-widest">Get In Touch</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Contact Om Siddhababa</h2>
              <p className="text-xs text-gray-500 max-w-lg mx-auto">Visit our main showroom at Kathmandu. Request immediate product quotations, test runs, or fleet evaluations.</p>
              <div className="w-16 h-1 bg-brand-green mx-auto rounded-full mt-3"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Info Column */}
              <div className="space-y-6">
                
                {/* Contact parameters */}
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-6">
                  <h3 className="text-sm font-black uppercase text-gray-800 tracking-wider border-b border-gray-50 pb-3">
                    Dealership Coordinates
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <div className="text-xs font-semibold">
                        <h4 className="font-bold text-gray-900 text-xs uppercase text-brand-green">Showroom Location</h4>
                        <p className="text-gray-500">Mandev Marg, Ward No. 22,</p>
                        <p className="text-gray-500">Kathmandu, Nepal</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <div className="text-xs font-semibold">
                        <h4 className="font-bold text-gray-900 text-xs uppercase text-brand-green">Direct Hotline</h4>
                        <a href="tel:+9779851123456" className="text-gray-800 hover:underline block font-bold">+977-9851123456</a>
                        <a href="tel:+9779841234567" className="text-gray-800 hover:underline block font-bold">+977-9841234567</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <div className="text-xs font-semibold">
                        <h4 className="font-bold text-gray-900 text-xs uppercase text-brand-green">Inquiry Email</h4>
                        <a href="mailto:info@omsiddhababa.com" className="text-gray-800 hover:underline font-bold block">info@omsiddhababa.com</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Physical timing */}
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-3 font-semibold">
                  <h4 className="text-xs font-bold uppercase text-gray-700">Opening Hours</h4>
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>Sunday - Friday:</span>
                    <span className="font-bold text-gray-800">9:30 AM - 6:00 PM</span>
                  </div>
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-bold text-amber-600">Closed (Service Appt Only)</span>
                  </div>
                </div>

                {/* Instant WhatsApp buttons */}
                <a
                  href="https://wa.me/9779851123456"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold p-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer text-xs"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Contact Dealer on WhatsApp</span>
                </a>
              </div>

              {/* Inquiry form section */}
              <div id="inquiry-form-section" className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-black text-gray-900">Send an Instant inquiry</h3>
                  <p className="text-xs text-gray-500">Need quotation pricing or loan guidance? Fill up the brief form, and get callbacks in under 2 hours!</p>
                </div>

                {submitSuccess && (
                  <div className="bg-brand-green-light border border-brand-green/20 p-4 rounded-xl space-y-1">
                    <p className="text-brand-green font-extrabold text-xs">✓ Inquiry Registered Successfully!</p>
                    <p className="text-gray-500 text-[11px] leading-relaxed font-semibold">
                      Your interest in the {inquiryVehicle} has been recorded by Om Siddhababa Enterprises sales office. <strong>You can review your own live submission instantly inside the &quot;Dealer Board&quot;</strong> tab in the navigation menu!
                    </p>
                  </div>
                )}

                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Bal Bahadur Karki"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs font-semibold focus:outline-none focus:border-brand-green"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                        Mobile Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g., 9851XXXXXX"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs font-semibold focus:outline-none focus:border-brand-green"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                        Vehicle Interest <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={inquiryVehicle}
                        onChange={(e) => setInquiryVehicle(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs font-bold text-gray-800 focus:outline-none focus:border-brand-green cursor-pointer"
                      >
                        {VEHICLES.map((v) => (
                          <option key={v.id} value={v.name}>
                            {v.name} ({v.fuelType})
                          </option>
                        ))}
                        <option value="Municipal Fleet Solutions">Municipal Fleet Solutions (EV Bulk)</option>
                        <option value="Spare Parts Inquiry">Spare Parts Delivery</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                        Your Location (District/City) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Kalanki, Kathmandu"
                        value={inquiryLocation}
                        onChange={(e) => setInquiryLocation(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs font-semibold focus:outline-none focus:border-brand-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                      Business Description & Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Identify your business (e.g. wholesale drinking water agency, public passenger operator, last mile delivery logistics) and specify financing or timeline questions."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs font-semibold focus:outline-none focus:border-brand-green"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-extrabold py-3.5 px-4 rounded-xl text-xs cursor-pointer shadow-md transition-all active:scale-95 disabled:bg-gray-200"
                  >
                    {isSubmitting ? 'Recording Inquiry...' : 'Submit Official Inquiry Now'}
                  </button>
                </form>
              </div>

            </div>

            {/* Google Maps Embed Simulation */}
            <div className="bg-white rounded-2xl border border-gray-150 p-4 space-y-3 shadow-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Interactive Location Map</span>
              <div className="bg-slate-800 text-white p-12 text-center rounded-xl relative overflow-hidden flex flex-col justify-center items-center h-48">
                <div className="absolute inset-0 bg-radial-gradient from-brand-green/30 to-slate-950 opacity-90 z-0"></div>
                <div className="relative z-10 space-y-2">
                  <MapPin className="w-8 h-8 text-brand-gold animate-bounce mx-auto" />
                  <h4 className="text-sm font-extrabold">Om Siddhababa Enterprises Showroom</h4>
                  <p className="text-xs text-gray-450 font-bold max-w-sm">
                    Mandev Marg, Kathmandu 44600, Nepal (Directly adjacent to Piaggio Service and Diagnostics Point)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: REVOLUTIONARY LEAD/CRM DASHBOARD */}
        {activeTab === 'admin' && (
          <div className="animate-fade-in">
            <DealerAdmin />
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 md:col-span-2">
            <h4 className="text-md font-extrabold text-brand-gold uppercase tracking-widest">
              Om Siddhababa Enterprises
            </h4>
            <p className="text-xs text-gray-400 max-w-lg leading-relaxed font-semibold">
              Authorized Piaggio Commercial Vehicle Dealer in Nepal. We supply robust, fuel-saving small-transport vehicle ranges configured to handle challenging terrains with long-term aftersales engineering warranties.
            </p>
            <div className="text-[10px] text-gray-500 font-bold tracking-wider">
              LICENSING: PIAGGIO COMMERCIAL VEHICLES OPERATIONS DIVISION
            </div>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Quick Jump Links</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li><button onClick={() => setActiveTab('vehicles')} className="hover:text-brand-gold">Showroom Vehicles</button></li>
              <li><button onClick={() => setActiveTab('finance')} className="hover:text-brand-gold">EMI Rate Calculator</button></li>
              <li><button onClick={() => setActiveTab('blog')} className="hover:text-brand-gold">Mobility Blogs</button></li>
              <li><button onClick={() => setActiveTab('admin')} className="hover:text-brand-gold">Dealer Leads Desk 🔒</button></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Official Contacts</h4>
            <div className="space-y-1 text-gray-405">
              <p>Hotline: 9851123456</p>
              <p>Email: info@omsiddhababa.com</p>
              <p>Kathmandu, Nepal</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 py-6 text-center text-xs text-gray-500 font-bold max-w-7xl mx-auto px-4">
          <p>© 2026 Om Siddhababa Enterprises. All Rights Reserved. Authorized Piaggio Commercial Dealer.</p>
        </div>
      </footer>

      {/* Floating Smart AI Consultant */}
      <SiddhababaAI 
        isOpen={aiOpen} 
        onClose={() => setAiOpen(false)} 
        onOpen={() => setAiOpen(true)} 
      />
    </div>
  );
}
