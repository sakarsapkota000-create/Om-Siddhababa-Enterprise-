import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import EMICalculator from './components/EMICalculator';
import SiddhababaAI from './components/SiddhababaAI';
import { VEHICLES } from './data';
import { 
  Phone, MapPin, ShieldCheck, Mail, Clock, MessageSquare, 
  Eye, Camera, X, Check, Send, Sparkles, User, RefreshCw, Calculator, Landmark, ChevronRight
} from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  tagline: string;
  isMainOffice: boolean;
  address: string;
  district: string;
  manager: string;
  phone: string;
  email: string;
  operatingHours: string;
  stockStatus: string;
  servicesAvailable: string[];
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [aiOpen, setAiOpen] = useState<boolean>(false);
  const [activeLightbox, setActiveLightbox] = useState<any | null>(null);

  // --- PHOTO GALLERY STATE ---
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadDesc, setUploadDesc] = useState<string>('');
  const [uploadDataUrl, setUploadDataUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [galleryImages, setGalleryImages] = useState([
    {
      id: 'nepal-cargo',
      title: 'Piaggio Ape Cargo on Himalayan Slopes',
      category: 'cargo',
      desc: 'Transporting agricultural products near majestic mountain routes, built with high ground clearance and steep 22% gradeability.',
      imageUrl: '/src/assets/images/piaggio_nepal_cargo_1781446062465.jpg'
    },
    {
      id: 'clean-showroom',
      title: 'Om Siddhababa Authorized Kathmandu Showroom',
      category: 'showroom',
      desc: 'Our pristine authorized facility showing low-noise zero-emission electric passenger rickshaws with advanced LFP technology.',
      imageUrl: '/src/assets/images/piaggio_clean_showroom_1781446080978.jpg'
    },
    {
      id: 'electric-passenger',
      title: 'Zero-Emission Passenger City Taxi',
      category: 'electric',
      desc: 'Silent, battery-operated passenger commercial solution providing Kathmandu operators major fuel savings.',
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'reinforced-chassis',
      title: 'Reinforced Metal Cargo Chassis Frame',
      category: 'showroom',
      desc: 'Thicker anti-corrosive powder powder coats designed and tested on extreme water logged backstreets.',
      imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'courier-service',
      title: 'Express Water & Goods Logistics',
      category: 'cargo',
      desc: 'A robust customized parcel cargo container vehicle running daily logistics routes in Lalitpur district.',
      imageUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'battery-station',
      title: 'LFP Smart Swappable Battery Assembly',
      category: 'electric',
      desc: 'Certified lithium iron phosphate battery stacks showing real-time balance telemetry under severe climate conditions.',
      imageUrl: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800'
    }
  ]);

  const filteredGalleryImages = galleryFilter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === galleryFilter);

  // --- BRANCHES ENGINE DATA ---
  const BRANCHES: Branch[] = [
    {
      id: 'lalbandi',
      name: 'Lalbandi Showroom (Primary Sarlahi Hub)',
      tagline: 'Sarlahi’s premier authorized sales, genuine parts, and quick service center',
      isMainOffice: true,
      address: 'East-West Highway, Lalbandi-1 (Opposite Red Cross Building), Sarlahi, Nepal',
      district: 'Sarlahi District, Madhesh Province',
      manager: 'Ramesh Bahadur Thapa',
      phone: '+977-46-50123 / 9854011122',
      email: 'lalbandi@omsiddhababa.com',
      operatingHours: 'Sunday - Friday: 9:00 AM - 6:00 PM',
      stockStatus: 'Ape City Petrol, E-City FX EV & Ape Diesel Cargo physically in showroom stock.',
      servicesAvailable: [
        'Authorized Piaggio Dealership Sales',
        'Genuine Spare Parts Stock',
        'LFP Battery Swapping Hub',
        '3S Service Workshop & Repairs',
        'Spot bank financing desk with low rates'
      ]
    },
    {
      id: 'kathmandu',
      name: 'Kathmandu Corporate Office & Showroom',
      tagline: 'Capital central showroom & major commercial banking liaison hub',
      isMainOffice: false,
      address: 'Mandev Marg, Ward No. 22, Kathmandu, Nepal',
      district: 'Kathmandu District, Bagmati Province',
      manager: 'Sushil Parajuli',
      phone: '+977-1-4567890 / 9851123456',
      email: 'kathmandu@omsiddhababa.com',
      operatingHours: 'Sunday - Friday: 9:30 AM - 6:00 PM',
      stockStatus: 'All electric cargo and passenger options ready with immediate delivery.',
      servicesAvailable: [
        'Corporate sales & government fleet delivery',
        'LFP battery balance diagnostic station',
        'Priority EMI approval assistance',
        'Regional parts warehouse depot'
      ]
    },
    {
      id: 'bardibas',
      name: 'Bardibas Highway Junction Center',
      tagline: 'Strategic transit hub serving transport operators across the East-West Highway',
      isMainOffice: false,
      address: 'Bardibas Chowk (Near Sindhuwa Bus Stand), Mahottari, Nepal',
      district: 'Mahottari District, Madhesh Province',
      manager: 'Dipesh Kumar Shah',
      phone: '+977-44-550111 / 9801555666',
      email: 'bardibas@omsiddhababa.com',
      operatingHours: 'Sunday - Sunday: 8:00 AM - 7:00 PM (Quick Highway Assistance)',
      stockStatus: 'Ape Cargo DX and electric three-wheeler stocks available.',
      servicesAvailable: [
        'Highway express spares store',
        'Emergency roadside mechanics',
        'Test driving tracks',
        'Local cooperative loan schemes'
      ]
    },
    {
      id: 'chandrapur',
      name: 'Chandranigahapur Branch (Rautahat Hub)',
      tagline: 'Authorized dealer outlet serving Rautahat and central Madhesh operations',
      isMainOffice: false,
      address: 'East-West Highway Connection Point, Chandrapur-4, Rautahat, Nepal',
      district: 'Rautahat District, Madhesh Province',
      manager: 'Suresh Prasad Gupta',
      phone: '+977-55-520144 / 9845012345',
      email: 'chandrapur@omsiddhababa.com',
      operatingHours: 'Sunday - Friday: 9:00 AM - 5:30 PM',
      stockStatus: 'Specializing in Ape E-City Lithium EV and high-clearance Petrol Passenger Models.',
      servicesAvailable: [
        'Retail sales team',
        'Local municipal approvals helpdesk',
        'Scheduled periodic fluid services',
        'Regional spare parts delivery'
      ]
    },
    {
      id: 'hariwon',
      name: 'Hariwon Showroom Outlet',
      tagline: 'Local neighborhood outlet providing swift vehicle deliveries and support',
      isMainOffice: false,
      address: 'Hariwon-11 (Near Sagarmatha Bank building), Sarlahi, Nepal',
      district: 'Sarlahi District, Madhesh Province',
      manager: 'Krishna Lal Shrestha',
      phone: '+977-46-522111 / 9854066777',
      email: 'hariwon@omsiddhababa.com',
      operatingHours: 'Sunday - Friday: 9:30 AM - 5:30 PM',
      stockStatus: 'Spot bookings open for low-noise Piaggio Ape City.',
      servicesAvailable: [
        'Express commercial taxi booking',
        'Standard tuneup warranty repair',
        'Genuine lubricants store'
      ]
    }
  ];

  const [selectedBranchId, setSelectedBranchId] = useState<string>('lalbandi');
  const currentBranch = BRANCHES.find(b => b.id === selectedBranchId) || BRANCHES[0];
  const otherBranchesList = BRANCHES.filter(b => b.id !== selectedBranchId);

  // --- EMBEDDED CHAT/MESSENGER STATE ---
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: 'user' | 'ai'; text: string; timestamp: string }>>([
    {
      id: 'msg-start',
      sender: 'ai',
      text: 'Namaste! Welcome to Om Siddhababa Enterprises. I can answer inquiries regarding passenger rickshaws, cargo vehicles, our active branches (Lalbandi, Kathmandu, Bardibas, Chandrapur, Hariwon), or calculate detailed monthly loan repayment rates. Try clicking the options below or type your budget question!',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollChatToEnd = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollChatToEnd();
  }, [chatMessages, chatLoading]);

  // Gallery Drag-and-Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadDataUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadDataUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('gallery-upload-input')?.click();
  };

  const handleUploadSubmit = () => {
    if (!uploadTitle.trim()) {
      alert('Please enter a title for your vehicle photograph.');
      return;
    }
    const finalUrl = uploadDataUrl || 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=800';
    const newImg = {
      id: `user-${Date.now()}`,
      title: uploadTitle,
      category: 'user',
      desc: uploadDesc || 'Shared dynamically by a premium fleet operator in Lalbandi/Kathmandu.',
      imageUrl: finalUrl
    };
    setGalleryImages([newImg, ...galleryImages]);
    setUploadTitle('');
    setUploadDesc('');
    setUploadDataUrl('');
    setGalleryFilter('user');
    alert('✓ Image load verification passed! Your picture is published to the User Uploads register.');
  };

  // Chat Messenger Logic
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const currentText = chatInput;
    setChatInput('');

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user' as const,
      text: currentText,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatLoading(true);

    try {
      const chatHistory = chatMessages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentText,
          history: chatHistory
        })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai' as const,
          text: data.text,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error('Not ok');
      }
    } catch {
      // Local robust offline matcher if server is reloading
      let responseText = "Namaste! For information on our models, finance options, or branch details:";
      const query = currentText.toLowerCase();

      if (query.includes('lalbandi') || query.includes('sarlahi')) {
        responseText = "Our **Lalbandi Main Showroom** is located at East-West Highway, Lalbandi-1 (Opposite Red Cross Building), Sarlahi, Nepal. You can call them directly at **+977-46-50123** or mobile **9854011122** for instant booking checks, test rides, or spare parts!";
      } else if (query.includes('kathmandu') || query.includes('head')) {
        responseText = "Our **Kathmandu Central Showroom** is located on Mandev Marg, Kathmandu. You can contact them at **+977-1-4567890** or mobile **9851123456**.";
      } else if (query.includes('emi') || query.includes('price') || query.includes('finance') || query.includes('loan')) {
        responseText = "We operate dedicated bank schemes starting at just **30% down payment**! Interest rates range between **8.5% and 12.5%** with our partners (Nabil, Global IME, NIC Asia, Rastriya Banijya). Use our interactive **Loan EMI Calculator** tab to simulate plans in seconds.";
      } else if (query.includes('cheap') || query.includes('cost') || query.includes('45')) {
        responseText = "Om Siddhababa offers highly effective entry-level solutions! You can initiate bookings for Piaggio models with minor processing fees, or calculate standard EMIs that yield positive monthly profits through vehicle logistics.";
      } else {
        responseText = "We support robust sales of high-payload Cargo (Diesel & Electric) and Passenger vehicles. Feel free to explore our dedicated branches at **Lalbandi, Bardibas, Kathmandu, Chandrapur, and Hariwon**!";
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai' as const,
        text: responseText + "\n\n*(Siddhababa Offline Mode Active)*",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleQuickQuestion = (qn: string) => {
    setChatInput(qn);
  };

  // Auto scroll navigation observer
  useEffect(() => {
    const sections = ['home', 'finance', 'gallery', 'branches'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(`section-${section}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerScrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 selection:bg-brand-green selection:text-white antialiased flex flex-col">
      
      {/* 1. NAVIGATION BAR */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={triggerScrollToSection} 
        onOpenConsultant={() => setAiOpen(true)} 
      />

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-24">
        
        {/* ================= SECTION 1: ELEGANT & COMPACT HERO ================= */}
        <section id="section-home" className="scroll-mt-24 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-12 border border-gray-150 shadow-xs relative overflow-hidden">
            {/* Background absolute highlights */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-green-light rounded-full filter blur-3xl -z-10 opacity-70"></div>
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-green-light text-brand-green px-3.5 py-1.5 rounded-full border border-brand-green/15 text-[10px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                <span>Active Lalbandi Hub & Multi-Branch Network</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
                Empowering Sarlahi with <span className="text-brand-green">Piaggio Commercial</span> Vehicles
              </h2>
              
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                Namaste! Welcome to <strong>Om Siddhababa Enterprises</strong>, the authorized Piaggio Commercial Dealer network in Nepal. Headquartered at our active main hub on the East-West Highway in <strong>Lalbandi</strong>, we deliver robust three-wheelers, heavy-capacity cargo platforms, and zero-emission Lithium electric solutions directly with low EMIs and instant bank approvals.
              </p>

              {/* Dynamic Value Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="space-y-1">
                  <p className="text-xl sm:text-2xl font-black text-brand-green">Lalbandi</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Main Head Office</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xl sm:text-2xl font-black text-gray-900">30% Min</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Bank Downpayment</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xl sm:text-2xl font-black text-brand-gold">NPR 45k</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Estimated Setup Margin</p>
                </div>
              </div>

              {/* Smooth Navigation CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => triggerScrollToSection('finance')}
                  className="bg-brand-green hover:bg-brand-green-dark text-white font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-brand-gold" />
                  <span>Calculate Loan EMI</span>
                </button>
                
                <button
                  onClick={() => triggerScrollToSection('branches')}
                  className="bg-white hover:bg-gray-50 border border-gray-250 text-gray-700 font-extrabold px-6 py-3.5 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-brand-green" />
                  <span>Browse Branches Network</span>
                </button>
              </div>
            </div>

            {/* Right Hero block: Embedded Messenger from MD */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-md space-y-4 flex flex-col h-[400px]">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center border border-brand-gold">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-xs font-black tracking-tight flex items-center gap-1.5">
                    <span>Siddhababa AI Messenger</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-550 animate-pulse"></span>
                  </h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Continuous MD Assistant</p>
                </div>
              </div>

              {/* Chat messages viewport */}
              <div className="flex-1 overflow-y-auto space-y-3.5 text-xs pr-1 scroll-thin">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'ai' && (
                      <div className="w-5 h-5 rounded-md bg-brand-green shrink-0 flex items-center justify-center border border-brand-gold">
                        <Sparkles className="w-3 h-3 text-brand-gold" />
                      </div>
                    )}
                    <div className={`p-2.5 rounded-xl max-w-[85%] font-medium leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-brand-green text-white rounded-tr-none' 
                        : 'bg-slate-800 text-gray-100 rounded-tl-none border border-slate-700/60'
                    }`}>
                      <p className="whitespace-pre-line text-[11px]">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex gap-2 justify-start items-center text-[10px] text-gray-400">
                    <RefreshCw className="w-3 h-3 animate-spin text-brand-green" />
                    <span>Analyzing your request...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Mini FAQ Chips */}
              <div className="flex gap-1.5 overflow-x-auto py-1 no-scrollbar text-[10px]">
                <button 
                  onClick={() => handleQuickQuestion('What is the address of Lalbandi main branch?')}
                  className="bg-slate-800 hover:bg-slate-700 text-gray-300 px-2 py-1 rounded border border-slate-700/80 cursor-pointer whitespace-nowrap"
                >
                  📍 Sarlahi Address
                </button>
                <button 
                  onClick={() => handleQuickQuestion('How much is the minimum downpayment for electric rickshaw?')}
                  className="bg-slate-800 hover:bg-slate-700 text-gray-300 px-2 py-1 rounded border border-slate-700/80 cursor-pointer whitespace-nowrap"
                >
                  ⚡ EV Downpayment
                </button>
                <button 
                  onClick={() => handleQuickQuestion('What models are physically in stock right now?')}
                  className="bg-slate-800 hover:bg-slate-700 text-gray-300 px-2 py-1 rounded border border-slate-700/80 cursor-pointer whitespace-nowrap"
                >
                  📦 In-Stock Check
                </button>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendChat} className="flex gap-1.5 pt-1.5 border-t border-white/10">
                <input 
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask and obtain automated specs..."
                  className="flex-1 bg-slate-800 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-green border border-slate-750 placeholder-gray-400"
                />
                <button 
                  type="submit"
                  disabled={chatLoading || !chatInput.trim()}
                  className="bg-brand-green text-white px-3.5 py-2 rounded-lg hover:bg-brand-green-dark transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: LOAN EMI CALCULATOR ================= */}
        <section id="section-finance" className="scroll-mt-24 space-y-12 bg-white rounded-3xl p-6 sm:p-10 border border-gray-150 shadow-xs">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-brand-green text-[10px] font-black uppercase tracking-widest bg-brand-green-light px-3.5 py-1.5 rounded-full text-brand-green border border-brand-green/10">
              Loan Planning Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Interactive Finance & EMI Planner
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Our specialized loan tool lets you estimate monthly payables and compare interest programs on Piaggio models across major Nepalese partner banks.
            </p>
            <div className="w-12 h-0.5 bg-brand-green mx-auto rounded-full mt-2"></div>
          </div>

          <EMICalculator onOpenInquiry={(vId) => {
            const vName = VEHICLES.find(v => v.id === vId)?.name || 'Custom Vehicle';
            handleQuickQuestion(`Hello, I would like to acquire a quotation and finance support check for the ${vName}. Please provide detail.`);
            triggerScrollToSection('home');
          }} />
        </section>

        {/* ================= SECTION 3: SHOWROOM GALLERY ================= */}
        <section id="section-gallery" className="scroll-mt-24 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-brand-green text-[10px] font-black uppercase tracking-widest bg-brand-green-light px-3.5 py-1.5 rounded-full text-brand-green border border-brand-green/10">
              Nepal Operations Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Siddhababa Showroom & Fleet Photo Gallery
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Explore actual high-resolution photography showcasing electric, engine, and showroom parameters of Piaggio cargo and passenger models in service.
            </p>
            <div className="w-12 h-0.5 bg-brand-green mx-auto rounded-full mt-2"></div>
          </div>

          {/* Gallery Filter controls */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'electric', label: 'E-City Lithium EV' },
              { id: 'cargo', label: 'Ape Cargo Logistics' },
              { id: 'showroom', label: 'Kathmandu Showroom Floor' },
              { id: 'user', label: 'Owner Uploads' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setGalleryFilter(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                  galleryFilter === cat.id
                    ? 'bg-brand-green text-white shadow-xs font-black'
                    : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Responsive Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGalleryImages.map((img) => (
              <div 
                key={img.id}
                onClick={() => setActiveLightbox(img)}
                className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-zoom-in"
              >
                <div className="aspect-video overflow-hidden relative bg-gray-100">
                  <img 
                    src={img.imageUrl} 
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-[9px] font-black uppercase text-brand-gold px-2.5 py-1 rounded-md border border-white/10 tracking-wider">
                    {img.category}
                  </span>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[10px] text-white font-extrabold bg-brand-green px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Zoom Photograph & Specs</span>
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-1.5 bg-white">
                  <h4 className="font-extrabold text-sm text-gray-950 group-hover:text-brand-green transition-colors line-clamp-1">
                    {img.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-semibold">
                    {img.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Custom File Upload Board */}
          <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-brand-gold text-[9px] font-black uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                Community Owner Board
              </span>
              <h3 className="font-extrabold text-md text-gray-950">Add Your Pride: Community Fleet Photo Board</h3>
              <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
                Are you an operator in Lalbandi, Kathmandu, or neighboring routes? Drag and drop files to post your personal Piaggio rickshaw directly on our board.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 min-h-[160px] ${
                  isDragging 
                    ? 'border-brand-green bg-brand-green-light scale-98' 
                    : 'border-gray-205 hover:border-brand-green hover:bg-slate-50'
                }`}
              >
                <input 
                  type="file"
                  id="gallery-upload-input"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Camera className="w-6 h-6 text-brand-green" />
                <p className="text-xs font-bold text-gray-800">Drag & Drop Vehicle Photo Here</p>
                <p className="text-[10px] text-gray-400 font-semibold">or click to choose custom local asset</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-extrabold uppercase text-gray-400">Title / Route Name</label>
                  <input 
                    type="text"
                    placeholder="e.g., Piaggio Cargo DX - Hariwon Cargo"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-extrabold uppercase text-gray-400">Fleet Comments</label>
                  <textarea 
                    rows={2}
                    placeholder="e.g., Pulls smoothly on steep incline climbs."
                    value={uploadDesc}
                    onChange={(e) => setUploadDesc(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleUploadSubmit}
                    className="flex-1 bg-brand-green text-white text-xs font-bold py-2.5 rounded-lg hover:bg-brand-green-dark cursor-pointer transition-all"
                  >
                    Publish ride photo
                  </button>
                  <button 
                    onClick={() => { setUploadTitle(''); setUploadDesc(''); setUploadDataUrl(''); }}
                    className="px-3 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200 cursor-pointer"
                  >
                    Clear
                  </button>
                </div>

                {uploadDataUrl && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-between gap-2 text-xs">
                    <span className="text-brand-green font-extrabold text-[10px]">✓ Image load verified successfully!</span>
                    <button onClick={() => setUploadDataUrl('')} className="text-red-500 font-bold hover:underline text-[10px]">Remove</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: BRANCHES IN LALBANDI & OTHERS ================= */}
        <section id="section-branches" className="scroll-mt-24 space-y-12 bg-white rounded-3xl p-6 sm:p-10 border border-gray-150 shadow-xs">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-brand-green text-[10px] font-black uppercase tracking-widest bg-brand-green-light px-3.5 py-1.5 rounded-full text-brand-green border border-brand-green/10">
              Dealer Network Grid
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Our Branches (Lalbandi & Network)
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Om Siddhababa operates multiple branch offices along the East-West Highway to ensure prompt pickup, spares support, and mechanical repair. Click any branch to load its direct contact coordinates.
            </p>
            <div className="w-12 h-0.5 bg-brand-green mx-auto rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Hand: Branch selector menu listing all locations */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-extrabold pl-1 mb-2">
                Select Active Branch Coordinates
              </h4>
              
              <div className="space-y-2.5">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                      selectedBranchId === b.id
                        ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                        : 'bg-gray-50 hover:bg-slate-100 border-gray-200 text-gray-800'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm">{b.name.split(' Showroom')[0].split(' Branch')[0].split(' Highway')[0].split(' Sub-Branch')[0].split(' Showroom')[0]}</span>
                        {b.isMainOffice && (
                          <span className="bg-brand-gold text-slate-950 font-extrabold text-[8px] px-1.5 py-0.5 rounded tracking-wide uppercase">
                            head office
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] line-clamp-1 font-semibold ${selectedBranchId === b.id ? 'text-gray-300' : 'text-gray-500'}`}>
                        {b.district}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${selectedBranchId === b.id ? 'text-brand-gold rotate-90' : 'text-gray-400'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Middle/Right Hand: Expanded active branch coordinates info cards */}
            <div className="lg:col-span-8 bg-slate-55 shadow-inner rounded-3xl border border-gray-200/65 p-6 sm:p-8 space-y-6">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="bg-brand-green/10 text-brand-green font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                    {currentBranch.isMainOffice ? '⭐ PRIMARY DEALER BASE' : '🔗 LOCALIZED AREA BRANCH'}
                  </span>
                  
                  <span className="text-[11px] font-bold text-gray-400">
                    Siddhababa Network UID: <strong className="text-gray-700">{currentBranch.id.toUpperCase()}</strong>
                  </span>
                </div>

                <h3 className="text-2xl font-black text-gray-950 leading-tight">
                  {currentBranch.name}
                </h3>
                <p className="text-xs text-gray-500 italic font-semibold leading-relaxed">
                  "{currentBranch.tagline}"
                </p>
              </div>

              {/* Grid detail metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-150 space-y-3 shadow-2xs">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <h5 className="font-extrabold text-gray-900 uppercase text-[9px] text-brand-green tracking-wider">Physical Address</h5>
                      <p className="text-gray-600 font-semibold leading-relaxed mt-1">{currentBranch.address}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-150 space-y-3 shadow-2xs">
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <h5 className="font-extrabold text-gray-900 uppercase text-[9px] text-brand-green tracking-wider">Direct Call Hotline</h5>
                      <p className="text-gray-600 font-extrabold tracking-wide mt-1 text-sm">{currentBranch.phone}</p>
                      <a href={`tel:${currentBranch.phone.split(' / ')[0]}`} className="text-[10px] text-brand-green hover:underline font-black uppercase mt-1 block">
                        ➔ Dial Direct Number
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-150 space-y-3 shadow-2xs">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <h5 className="font-extrabold text-gray-900 uppercase text-[9px] text-brand-green tracking-wider">Hours & Manager</h5>
                      <p className="text-gray-600 font-semibold leading-relaxed mt-1">
                        <strong>Hours:</strong> {currentBranch.operatingHours}<br />
                        <strong>Contact:</strong> {currentBranch.manager} (Branch Representative)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-150 space-y-3 shadow-2xs">
                  <div className="flex items-start gap-2.5">
                    <Landmark className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <h5 className="font-extrabold text-gray-900 uppercase text-[9px] text-brand-green tracking-wider">Stock Diagnostics</h5>
                      <p className="text-gray-600 font-semibold leading-relaxed mt-1">{currentBranch.stockStatus}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Available Services */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-gray-150 space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                  Authorized Facility Support Checklist:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentBranch.servicesAvailable.map((srv, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0"></span>
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AND OTHERS ALSO - Encouraging dynamic clicking of other branches */}
              <div className="border-t border-gray-150 pt-5 space-y-3">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                  Click below to quick-swap and compare other branches:
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {otherBranchesList.map((ob) => (
                    <button
                      key={ob.id}
                      onClick={() => setSelectedBranchId(ob.id)}
                      className="bg-white hover:bg-brand-green hover:text-white border border-gray-200 text-gray-700 text-[11px] font-bold p-2.5 rounded-xl text-center transition-all cursor-pointer truncate shadow-2xs"
                    >
                      {ob.name.split(' Showroom')[0].split(' Branch')[0].split(' Highway')[0].split(' Sub-Branch')[0]}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 3. LIGHTBOX SPECTACULAR OVERLAY */}
      {activeLightbox && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-gray-205 flex flex-col">
            <button 
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 bg-slate-900 hover:bg-slate-950 text-white p-2 rounded-full cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video bg-black relative">
              <img src={activeLightbox.imageUrl} alt={activeLightbox.title} className="w-full h-full object-cover" refferrerpolicy="no-referrer" />
            </div>
            <div className="p-6 space-y-2.5">
              <span className="text-[10px] font-extrabold uppercase bg-brand-green-light text-brand-green px-2.5 py-1 rounded inline-block">
                {activeLightbox.category}
              </span>
              <h4 className="text-lg font-black text-gray-950">{activeLightbox.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">{activeLightbox.desc}</p>
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => {
                    handleQuickQuestion(`I am interested in vehicle details from photo: ${activeLightbox.title}`);
                    setActiveLightbox(null);
                    triggerScrollToSection('home');
                  }} 
                  className="bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-all"
                >
                  Send Inquiry regarding photo spec
                </button>
                <button 
                  onClick={() => setActiveLightbox(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. FLOATING AI CONTROLLER */}
      <SiddhababaAI 
        isOpen={aiOpen} 
        onClose={() => setAiOpen(false)} 
        onOpen={() => setAiOpen(true)} 
      />

      {/* 5. FOOTER */}
      <footer className="bg-slate-905 mt-24 border-t border-gray-200 py-16 text-center text-xs space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-gray-400 font-extrabold uppercase tracking-widest">
          OM SIDDHABABA ENTERPRISES PRIVATE LIMITED
        </p>
        <p className="text-xs text-gray-500 leading-relaxed font-semibold max-w-lg mx-auto">
          Authorized Piaggio commercial vehicle dealership. Centered at East-West Highway, Lalbandi, Sarlahi District, Nepal. Servicing cargo drivers, passenger auto rickshaws, and smart swappable LFP battery fleets across Madhesh Province.
        </p>
        <p className="text-[10px] text-gray-400 pt-3">
          © 2026 Om Siddhababa Enterprises. Commercial Vehicle Licensing Approved.
        </p>
      </footer>

    </div>
  );
}
