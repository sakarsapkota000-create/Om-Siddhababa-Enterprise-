import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import EMICalculator from './components/EMICalculator';
import SiddhababaAI from './components/SiddhababaAI';
import DealerAdmin from './components/DealerAdmin';
import { VEHICLES } from './data';
import { 
  Phone, MapPin, ShieldCheck, Mail, Clock, MessageSquare, 
  Eye, Camera, X, Check, Send, Sparkles, User, RefreshCw, Calculator, Landmark, ChevronRight,
  Wrench, Settings, Cpu, Star, Award
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

  // --- CORPORATE SECURITY & STAFF AUTH STATES ---
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('siddhababa_is_admin') === 'true';
  });
  const [adminLoginOpen, setAdminLoginOpen] = useState<boolean>(false);
  const [adminPassInput, setAdminPassInput] = useState<string>('');
  const [adminLoginError, setAdminLoginError] = useState<string>('');

  // --- CUSTOMER INQUIRY FORM STATE ---
  const [inquiryName, setInquiryName] = useState<string>('');
  const [inquiryPhone, setInquiryPhone] = useState<string>('');
  const [inquiryLocation, setInquiryLocation] = useState<string>('Lalbandi');
  const [inquiryMessage, setInquiryMessage] = useState<string>('');
  const [inquiryVehicle, setInquiryVehicle] = useState<string>('');
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState<boolean>(false);

  // --- PHOTO GALLERY STATE ---
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadDesc, setUploadDesc] = useState<string>('');
  const [uploadDataUrl, setUploadDataUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // --- HOME SLIDER & MACHINERY PARTS STATE ---
  const [currentHomeSlideIdx, setCurrentHomeSlideIdx] = useState<number>(0);
  const [selectedSpareId, setSelectedSpareId] = useState<string>('engine');

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

  // --- DYNAMIC CUSTOMIZABLE MASTER DATA STATES ---
  const [dealershipInfo, setDealershipInfo] = useState(() => {
    const saved = localStorage.getItem('siddhababa_dealership_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      companyName: 'OM SIDDHABABA ENTERPRISES',
      subtitle: 'Piaggio Commercial Vehicle Dealer',
      headOfficeAddress: 'East-West Highway, Lalbandi-1, Sarlahi, Nepal',
      headOfficePhone: '+977-46-50123 / 9854011122',
      headOfficeEmail: 'info@omsiddhababa.com',
      hotlineUrl: 'tel:+9779854011122',
      footerText: 'Authorized Piaggio commercial vehicle dealership. Centered at East-West Highway, Lalbandi, Sarlahi District, Nepal. Servicing cargo drivers, passenger auto rickshaws, and smart swappable LFP battery fleets across Madhesh Province.',
      companyLogoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=150',
      heroBannerUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
      directorName: 'Siddha Bahadur Sapkota',
      directorTitle: 'Founder & Managing Director',
      directorMessage: 'Namaste! At Om Siddhababa Enterprises, our vision has always been to drive growth and self-employment in local communities across Sarlahi and Madhesh Province. By offering the reliable, low-maintenance Piaggio Ape lineup along with custom low-downpayment bank solutions, we ensure that every driver can confidently start building their financial independence with a top-class vehicle.',
      directorPhotoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
    };
  });

  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('siddhababa_custom_vehicles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return VEHICLES.map(v => ({
      ...v,
      imageUrl: v.image === 'passenger-auto' ? 'https://images.unsplash.com/photo-1561124638-c521c35ca02a?auto=format&fit=crop&q=80&w=800' :
                v.image === 'electric-passenger' ? 'https://images.unsplash.com/photo-1558442074-3c19857bc1f3?auto=format&fit=crop&q=80&w=800' :
                v.image === 'cargo-diesel' ? 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=800' :
                v.image === 'electric-cargo' ? 'https://images.unsplash.com/photo-1596898516084-5f1188d5e985?auto=format&fit=crop&q=80&w=800' :
                `https://picsum.photos/seed/${v.id}/800/600`
    }));
  });

  const [banks, setBanks] = useState(() => {
    const saved = localStorage.getItem('siddhababa_custom_banks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        name: 'Nabil Bank',
        logo: 'NB',
        logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=150',
        maxFinancing: 'Up to 70% of Vehicle Cost',
        interestRate: '9.25% - 11.5% fixed/floating'
      },
      {
        name: 'Global IME Bank',
        logo: 'GI',
        logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=150',
        maxFinancing: 'Up to 75% for Electric Vehicles',
        interestRate: '9.5% - 12.0%'
      },
      {
        name: 'NIC Asia Bank',
        logo: 'NA',
        logoUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=150',
        maxFinancing: 'Up to 70% of On-Road Cost',
        interestRate: '10.0% - 12.5%'
      },
      {
        name: 'Rastriya Banijya Bank',
        logo: 'RB',
        logoUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=150',
        maxFinancing: 'Up to 80% with Special EV Scheme',
        interestRate: '8.5% - 10.5%'
      }
    ];
  });

  const [branches, setBranches] = useState<Branch[]>(() => {
    const saved = localStorage.getItem('siddhababa_custom_branches');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
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
        imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
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
        imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
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
        imageUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800',
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
        imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
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
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
        servicesAvailable: [
          'Express commercial taxi booking',
          'Standard tuneup warranty repair',
          'Genuine lubricants store'
        ]
      }
    ];
  });

  const [selectedBranchId, setSelectedBranchId] = useState<string>('lalbandi');
  
  const currentBranch = branches.find(b => b.id === selectedBranchId) || branches[0] || {
    id: 'lalbandi',
    name: 'Lalbandi Showroom (Primary Sarlahi Hub)',
    tagline: 'Sarlahi’s premier authorized sales, genuine parts, and quick service center',
    isMainOffice: true,
    address: 'East-West Highway, Lalbandi-1, Sarlahi, Nepal',
    district: 'Sarlahi District',
    manager: 'Ramesh Bahadur Thapa',
    phone: '9854011122',
    email: 'lalbandi@omsiddhababa.com',
    operatingHours: 'Sunday - Friday',
    stockStatus: 'In showroom stock.',
    servicesAvailable: ['Authorized Sales']
  };
  
  const otherBranchesList = branches.filter(b => b.id !== currentBranch.id);

  // --- EMBEDDED CHAT/MESSENGER STATE ---
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: 'user' | 'ai'; text: string; timestamp: string }>>([
    {
      id: 'msg-start',
      sender: 'ai',
      text: `Namaste! Welcome to ${dealershipInfo?.companyName || 'Om Siddhababa Enterprises'}. I can answer inquiries regarding passenger rickshaws, cargo vehicles, active branches (Lalbandi, Kathmandu, Bardibas, Chandrapur, Hariwon), or calculate detailed monthly loan repayment rates. Try clicking the options below or type your budget question!`,
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

  // --- SUBMIT ONLINE INQUIRY TO EXPRESS BACKEND ---
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim() || !inquiryVehicle) {
      alert('Please fill out all required fields (Name, Phone number, and Vehicle model preference).');
      return;
    }

    setIsSubmittingInquiry(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiryName,
          phone: inquiryPhone,
          vehicleInterest: inquiryVehicle,
          location: inquiryLocation,
          message: inquiryMessage || 'Requested a quotation via online portal.'
        })
      });

      if (res.ok) {
        showToast('✓ Namaste! Your quotation and booking inquiry has been logged successfully. Our Lalbandi or local branch representative will contact you shortly!');
        setInquiryName('');
        setInquiryPhone('');
        setInquiryMessage('');
      } else {
        const errData = await res.json();
        alert(`Error submitting inquiry: ${errData.error || 'Please check your connection.'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to transmit inquiry to server. Please try again.');
    } finally {
      setIsSubmittingInquiry(false);
    }
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

  // --- CUSTOMIZER FORM AND SAVE ENGINE ---
  const [configSubTab, setConfigSubTab] = useState<'profile' | 'vehicles' | 'branches' | 'banks'>('profile');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 4580);
  };

  // Reset to original default data
  const handleResetToDefaults = () => {
    if (confirm("Are you sure you want to reset all vehicle specs, branches, banks and dealer profile to official defaults?")) {
      localStorage.removeItem('siddhababa_dealership_info');
      localStorage.removeItem('siddhababa_custom_vehicles');
      localStorage.removeItem('siddhababa_custom_banks');
      localStorage.removeItem('siddhababa_custom_branches');
      window.location.reload();
    }
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newProfile = {
      companyName: String(fd.get('companyName') || '').toUpperCase(),
      subtitle: String(fd.get('subtitle') || ''),
      headOfficeAddress: String(fd.get('headOfficeAddress') || ''),
      headOfficePhone: String(fd.get('headOfficePhone') || ''),
      headOfficeEmail: String(fd.get('headOfficeEmail') || ''),
      hotlineUrl: String(fd.get('hotlineUrl') || 'tel:' + String(fd.get('headOfficePhone')).split('/')[0].trim()),
      footerText: String(fd.get('footerText') || ''),
      companyLogoUrl: String(fd.get('companyLogoUrl') || ''),
      heroBannerUrl: String(fd.get('heroBannerUrl') || ''),
      directorName: String(fd.get('directorName') || 'Siddha Bahadur Sapkota'),
      directorTitle: String(fd.get('directorTitle') || 'Founder & Managing Director'),
      directorMessage: String(fd.get('directorMessage') || ''),
      directorPhotoUrl: String(fd.get('directorPhotoUrl') || '')
    };
    setDealershipInfo(newProfile);
    localStorage.setItem('siddhababa_dealership_info', JSON.stringify(newProfile));
    showToast('✓ Dealership profile settings applied successfully!');
  };

  // Vehicle Save & Add
  const [selectedVehicleEditId, setSelectedVehicleEditId] = useState<string>(vehicles[0]?.id || 'new');
  const [vehicleEditForm, setVehicleEditForm] = useState<any>({
    name: '',
    category: 'passenger',
    tagline: '',
    fuelType: 'Petrol',
    approxPriceNPR: 450000,
    priceRange: '',
    imageUrl: '',
    engineSpec: '',
    batterySpec: '',
    chargingSpec: '',
    rangeSpec: '',
    payloadSpec: '',
    seatingSpec: '',
    powerSpec: '',
    torqueSpec: '',
    featuresString: ''
  });

  // Sync edits on selected change
  useEffect(() => {
    if (selectedVehicleEditId === 'new') {
      setVehicleEditForm({
        name: '',
        category: 'passenger',
        tagline: 'Brand New Dynamic Spec Model',
        fuelType: 'Electric',
        approxPriceNPR: 500000,
        priceRange: 'NPR 4,80,000 - 5,20,000',
        imageUrl: '',
        engineSpec: '150 cc Single Cylinder',
        batterySpec: '6.5 kWh LFP',
        chargingSpec: '3 Hours',
        rangeSpec: '100 km',
        payloadSpec: '500 kg',
        seatingSpec: '3 + 1',
        powerSpec: '8 kW',
        torqueSpec: '35 Nm',
        featuresString: 'Direct swap telemetry battery, Heavy-duty shocks, Spot warranty support'
      });
    } else {
      const v = vehicles.find((x: any) => x.id === selectedVehicleEditId);
      if (v) {
        setVehicleEditForm({
          name: v.name,
          category: v.category,
          tagline: v.tagline,
          fuelType: v.fuelType,
          approxPriceNPR: v.approxPriceNPR,
          priceRange: v.priceRange,
          imageUrl: v.imageUrl || '',
          engineSpec: v.specs?.engine || '',
          batterySpec: v.specs?.batteryCapacity || '',
          chargingSpec: v.specs?.chargingTime || '',
          rangeSpec: v.specs?.range || '',
          payloadSpec: v.specs?.payloadCapacity || '',
          seatingSpec: v.specs?.seatingCapacity || '',
          powerSpec: v.specs?.power || '',
          torqueSpec: v.specs?.torque || '',
          featuresString: v.features?.join(', ') || ''
        });
      }
    }
  }, [selectedVehicleEditId, vehicles]);

  const handleSaveVehicleConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleEditForm.name.trim()) {
      alert('Please enter a vehicle series name.');
      return;
    }

    const compiledSpecs: any = {};
    if (vehicleEditForm.engineSpec) compiledSpecs.engine = vehicleEditForm.engineSpec;
    if (vehicleEditForm.batterySpec) compiledSpecs.batteryCapacity = vehicleEditForm.batterySpec;
    if (vehicleEditForm.chargingSpec) compiledSpecs.chargingTime = vehicleEditForm.chargingSpec;
    if (vehicleEditForm.rangeSpec) compiledSpecs.range = vehicleEditForm.rangeSpec;
    if (vehicleEditForm.payloadSpec) compiledSpecs.payloadCapacity = vehicleEditForm.payloadSpec;
    if (vehicleEditForm.seatingSpec) compiledSpecs.seatingCapacity = vehicleEditForm.seatingSpec;
    if (vehicleEditForm.powerSpec) compiledSpecs.power = vehicleEditForm.powerSpec;
    if (vehicleEditForm.torqueSpec) compiledSpecs.torque = vehicleEditForm.torqueSpec;

    const existingVehicle = vehicles.find((v: any) => v.id === selectedVehicleEditId);
    const newVehicleObj = {
      id: selectedVehicleEditId === 'new' ? 'v-' + Date.now() : selectedVehicleEditId,
      name: vehicleEditForm.name,
      category: vehicleEditForm.category,
      tagline: vehicleEditForm.tagline,
      fuelType: vehicleEditForm.fuelType,
      image: existingVehicle ? existingVehicle.image : (vehicleEditForm.category === 'cargo' ? 'cargo-diesel' : 'passenger-auto'),
      imageUrl: vehicleEditForm.imageUrl,
      approxPriceNPR: Number(vehicleEditForm.approxPriceNPR),
      priceRange: vehicleEditForm.priceRange,
      specs: compiledSpecs,
      features: vehicleEditForm.featuresString.split(',').map((x: string) => x.trim()).filter(Boolean)
    };

    let updatedVehicles = [];
    if (selectedVehicleEditId === 'new') {
      updatedVehicles = [...vehicles, newVehicleObj];
      setSelectedVehicleEditId(newVehicleObj.id);
    } else {
      updatedVehicles = vehicles.map((v: any) => v.id === selectedVehicleEditId ? newVehicleObj : v);
    }

    setVehicles(updatedVehicles);
    localStorage.setItem('siddhababa_custom_vehicles', JSON.stringify(updatedVehicles));
    showToast(`✓ Vehicle configurations for "${vehicleEditForm.name}" updated successfully!`);
  };

  const handleDeleteVehicle = () => {
    if (selectedVehicleEditId === 'new') return;
    if (vehicles.length <= 1) {
      alert("At least one vehicle model must remain in the catalog.");
      return;
    }
    const targetName = vehicles.find((x: any) => x.id === selectedVehicleEditId)?.name;
    if (confirm(`Are you sure you want to remove the series "${targetName}" from the showroom?`)) {
      const rest = vehicles.filter((v: any) => v.id !== selectedVehicleEditId);
      setVehicles(rest);
      localStorage.setItem('siddhababa_custom_vehicles', JSON.stringify(rest));
      setSelectedVehicleEditId(rest[0].id);
      showToast(`✓ Removed "${targetName}" from dynamic vehicles register.`);
    }
  };

  // Branch Save & Add
  const [selectedBranchEditId, setSelectedBranchEditId] = useState<string>(branches[0]?.id || 'new');
  const [branchEditForm, setBranchEditForm] = useState<any>({
    name: '',
    tagline: '',
    address: '',
    district: '',
    manager: '',
    phone: '',
    email: '',
    operatingHours: '',
    stockStatus: '',
    imageUrl: '',
    servicesAvailableString: ''
  });

  useEffect(() => {
    if (selectedBranchEditId === 'new') {
      setBranchEditForm({
        name: 'Lalbandi East Sub-Branch Office',
        tagline: 'Rapid dispatch and servicing unit',
        address: 'East-West Highway Connection, Ward-3, Lalbandi, Nepal',
        district: 'Sarlahi District, Madhesh Province',
        manager: 'Yuvraj Adhikari',
        phone: '+977-9854060000',
        email: 'east@omsiddhababa.com',
        operatingHours: '9:00 AM - 5:00 PM',
        stockStatus: 'All model trial rides active.',
        imageUrl: '',
        servicesAvailableString: 'Servicing Support, Genuine Spares Stock, Spot Inquiry Registrations'
      });
    } else {
      const b = branches.find(x => x.id === selectedBranchEditId);
      if (b) {
        setBranchEditForm({
          name: b.name,
          tagline: b.tagline,
          address: b.address,
          district: b.district,
          manager: b.manager,
          phone: b.phone,
          email: b.email,
          operatingHours: b.operatingHours,
          stockStatus: b.stockStatus,
          imageUrl: b.imageUrl || '',
          servicesAvailableString: b.servicesAvailable?.join(', ') || ''
        });
      }
    }
  }, [selectedBranchEditId, branches]);

  const handleSaveBranchConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchEditForm.name.trim()) return;

    const newBranchObj = {
      id: selectedBranchEditId === 'new' ? 'b-' + Date.now() : selectedBranchEditId,
      name: branchEditForm.name,
      tagline: branchEditForm.tagline,
      isMainOffice: selectedBranchEditId === 'lalbandi',
      address: branchEditForm.address,
      district: branchEditForm.district,
      manager: branchEditForm.manager,
      phone: branchEditForm.phone,
      email: branchEditForm.email,
      operatingHours: branchEditForm.operatingHours,
      stockStatus: branchEditForm.stockStatus,
      imageUrl: branchEditForm.imageUrl,
      servicesAvailable: branchEditForm.servicesAvailableString.split(',').map((x: string) => x.trim()).filter(Boolean)
    };

    let updatedBranches = [];
    if (selectedBranchEditId === 'new') {
      updatedBranches = [...branches, newBranchObj];
      setSelectedBranchEditId(newBranchObj.id);
    } else {
      updatedBranches = branches.map(b => b.id === selectedBranchEditId ? newBranchObj : b);
    }

    setBranches(updatedBranches);
    localStorage.setItem('siddhababa_custom_branches', JSON.stringify(updatedBranches));
    showToast(`✓ Branch entry "${branchEditForm.name}" customized successfully!`);
  };

  const handleDeleteBranch = () => {
    if (selectedBranchEditId === 'new') return;
    if (selectedBranchEditId === 'lalbandi') {
      alert("The Sarlahi headquarters cannot be deleted; it is the cornerstone of the customizer.");
      return;
    }
    const targetName = branches.find(x => x.id === selectedBranchEditId)?.name;
    if (confirm(`Are you sure you want to remove the branch entry "${targetName}"?`)) {
      const rest = branches.filter(b => b.id !== selectedBranchEditId);
      setBranches(rest);
      localStorage.setItem('siddhababa_custom_branches', JSON.stringify(rest));
      setSelectedBranchEditId(rest[0].id);
      showToast(`✓ Removed "${targetName}" from branch networking databases.`);
    }
  };

  // Bank Save & Add
  const [selectedBankIndex, setSelectedBankIndex] = useState<number | string>(0);
  const [bankEditForm, setBankEditForm] = useState<any>({
    name: '',
    logo: '',
    logoUrl: '',
    maxFinancing: '',
    interestRate: ''
  });

  useEffect(() => {
    if (selectedBankIndex === 'new') {
      setBankEditForm({
        name: 'Siddhartha Cooperative',
        logo: 'SC',
        logoUrl: '',
        maxFinancing: 'Up to 70% of Vehicle Cost',
        interestRate: '10.5% - 13.0%'
      });
    } else {
      const b = banks[Number(selectedBankIndex)];
      if (b) {
        setBankEditForm({
          name: b.name,
          logo: b.logo,
          logoUrl: b.logoUrl || '',
          maxFinancing: b.maxFinancing,
          interestRate: b.interestRate
        });
      }
    }
  }, [selectedBankIndex, banks]);

  const handleSaveBankConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankEditForm.name.trim()) return;

    const newBankObj = {
      name: bankEditForm.name,
      logo: bankEditForm.logo || bankEditForm.name.substring(0, 2).toUpperCase(),
      logoUrl: bankEditForm.logoUrl,
      maxFinancing: bankEditForm.maxFinancing,
      interestRate: bankEditForm.interestRate
    };

    let updatedBanks = [];
    if (selectedBankIndex === 'new') {
      updatedBanks = [...banks, newBankObj];
      setSelectedBankIndex(updatedBanks.length - 1);
    } else {
      updatedBanks = banks.map((b, idx) => idx === Number(selectedBankIndex) ? newBankObj : b);
    }

    setBanks(updatedBanks);
    localStorage.setItem('siddhababa_custom_banks', JSON.stringify(updatedBanks));
    showToast(`✓ Bank partner scheme for "${bankEditForm.name}" updated successfully!`);
  };

  const handleDeleteBank = () => {
    if (selectedBankIndex === 'new') return;
    if (banks.length <= 1) {
      alert("At least one partner bank must remain registered.");
      return;
    }
    const targetName = banks[Number(selectedBankIndex)]?.name;
    if (confirm(`Are you sure you want to delete bank details for "${targetName}"?`)) {
      const rest = banks.filter((_, idx) => idx !== Number(selectedBankIndex));
      setBanks(rest);
      localStorage.setItem('siddhababa_custom_banks', JSON.stringify(rest));
      setSelectedBankIndex(0);
      showToast(`✓ Cleared "${targetName}" from finance partner program lists.`);
    }
  };

  // Auto scroll navigation observer
  useEffect(() => {
    const activeSections = isAdmin 
      ? ['home', 'customizer', 'finance', 'gallery', 'branches', 'admin']
      : ['home', 'finance', 'gallery', 'branches'];
      
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of activeSections) {
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
  }, [isAdmin]);

  // Auto-play interval for home vehicle photo gallery slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHomeSlideIdx(prev => (prev + 1) % (vehicles?.length || 4));
    }, 6000);
    return () => clearInterval(timer);
  }, [vehicles]);

  const triggerScrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-55 text-gray-800 selection:bg-brand-green selection:text-white antialiased flex flex-col">
      
      {/* 1. NAVIGATION BAR */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={triggerScrollToSection} 
        onOpenConsultant={() => setAiOpen(true)} 
        dealershipInfo={dealershipInfo}
        isAdmin={isAdmin}
        onOpenLogin={() => {
          setAdminPassInput('');
          setAdminLoginError('');
          setAdminLoginOpen(true);
        }}
        onLogout={() => {
          setIsAdmin(false);
          localStorage.removeItem('siddhababa_is_admin');
          setActiveTab('home');
          showToast('✓ Off-Duty status activated. Administrative workspace secured.');
        }}
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

          {/* ================= HIGH GRAPHICAL QUALITY HOMEPAGE PHOTO SHOWCASE CAROUSEL ================= */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
            {/* Ambient gold-green light spots */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-3xl opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-gold/10 rounded-full filter blur-3xl opacity-50"></div>

            <div className="relative space-y-8">
              {/* Slider Header bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="text-brand-gold text-[10px] font-black uppercase tracking-widest bg-brand-gold/10 px-3 py-1.5 rounded-full border border-brand-gold/20 flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-brand-gold animate-bounce" />
                    <span>Live Showroom Photography Showcase</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-2 text-white">
                    Explore Flagship Vehicles on home
                  </h3>
                </div>
                {/* Manual slide indicators */}
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={() => setCurrentHomeSlideIdx(prev => (prev - 1 + vehicles.length) % vehicles.length)}
                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-750 text-brand-gold border border-slate-700 transition-all cursor-pointer flex items-center justify-center font-bold text-lg active:scale-90"
                    aria-label="Previous Slide"
                  >
                    ❮
                  </button>
                  <button 
                    onClick={() => setCurrentHomeSlideIdx(prev => (prev + 1) % vehicles.length)}
                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-750 text-brand-gold border border-slate-700 transition-all cursor-pointer flex items-center justify-center font-bold text-lg active:scale-90"
                    aria-label="Next Slide"
                  >
                    ❯
                  </button>
                </div>
              </div>

              {/* Slider Content Frame */}
              {vehicles && vehicles.length > 0 && (() => {
                const currentSlide = vehicles[currentHomeSlideIdx];
                if (!currentSlide) return null;
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                    {/* Image Block */}
                    <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-750 shadow-lg bg-slate-950 group h-[250px] sm:h-[350px]">
                      <img 
                        src={currentSlide.imageUrl} 
                        alt={currentSlide.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold text-brand-gold">
                        Ref: {currentSlide.id.toUpperCase()}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-955/40 to-transparent p-5">
                        <span className="text-gray-300 text-xs font-semibold tracking-wide italic">
                          "{currentSlide.tagline}"
                        </span>
                      </div>
                    </div>

                    {/* Specifications Companion info block */}
                    <div className="lg:col-span-6 space-y-6">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                            currentSlide.category === 'electric' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            currentSlide.category === 'cargo' ? 'bg-amber-500/20 text-brand-gold border border-amber-500/30' :
                            'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                          }`}>
                            ⚡ {currentSlide.category} range
                          </span>
                          <span className="bg-slate-800 text-[10px] font-bold text-gray-400 px-2.5 py-1 rounded-md">
                            Fuel Type: {currentSlide.fuelType}
                          </span>
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                          {currentSlide.name}
                        </h4>
                        <p className="text-brand-gold text-lg font-black tracking-tight">
                          Est. Price: {currentSlide.priceRange || 'NPR 4,50,000 onwards'}
                        </p>
                      </div>

                      {/* Spec metrics list */}
                      <div className="grid grid-cols-2 gap-3.5 bg-slate-950/60 p-4.5 rounded-2xl border border-slate-800">
                        {currentSlide.specs.engine && (
                          <div className="text-xs">
                            <span className="text-gray-500 font-bold uppercase text-[9px] block">Powerplant Engine</span>
                            <span className="text-gray-200 font-bold text-[11px] mt-0.5 block truncate">{currentSlide.specs.engine}</span>
                          </div>
                        )}
                        {currentSlide.specs.range && (
                          <div className="text-xs">
                            <span className="text-gray-500 font-bold uppercase text-[9px] block">Certified Range</span>
                            <span className="text-emerald-400 font-bold text-[11px] mt-0.5 block truncate">{currentSlide.specs.range}</span>
                          </div>
                        )}
                        {currentSlide.specs.power && (
                          <div className="text-xs">
                            <span className="text-gray-500 font-bold uppercase text-[9px] block">Max Horsepower</span>
                            <span className="text-gray-200 font-bold text-[11px] mt-0.5 block truncate">{currentSlide.specs.power}</span>
                          </div>
                        )}
                        {currentSlide.specs.torque && (
                          <div className="text-xs">
                            <span className="text-gray-500 font-bold uppercase text-[9px] block">Raw Mechanical Torque</span>
                            <span className="text-gray-200 font-bold text-[11px] mt-0.5 block truncate">{currentSlide.specs.torque}</span>
                          </div>
                        )}
                        {currentSlide.specs.payloadCapacity && (
                          <div className="text-xs">
                            <span className="text-gray-500 font-bold uppercase text-[9px] block">Certified Payload</span>
                            <span className="text-brand-gold font-bold text-[11px] mt-0.5 block truncate">{currentSlide.specs.payloadCapacity}</span>
                          </div>
                        )}
                        {currentSlide.specs.seatingCapacity && (
                          <div className="text-xs">
                            <span className="text-gray-500 font-bold uppercase text-[9px] block">Seat Setup Limits</span>
                            <span className="text-gray-200 font-bold text-[11px] mt-0.5 block truncate">{currentSlide.specs.seatingCapacity}</span>
                          </div>
                        )}
                        {currentSlide.specs.runningCost && (
                          <div className="text-xs col-span-2 border-t border-slate-800/85 pt-2.5 mt-1">
                            <span className="text-gray-500 font-bold uppercase text-[9px] block">Daily Energy running cost</span>
                            <span className="text-emerald-400 font-bold text-[11px] mt-0.5 block">{currentSlide.specs.runningCost}</span>
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-3">
                        <button 
                          onClick={() => {
                            setInquiryVehicle(currentSlide.name);
                            setInquiryMessage(`Hello Om Siddhababa Enterprises! I am interested in requesting an official quote for the model: ${currentSlide.name} (Price range: ${currentSlide.priceRange}).`);
                            triggerScrollToSection('inquiry');
                            showToast(`Selected "${currentSlide.name}" for Lead Consultation!`);
                          }}
                          className="bg-brand-green hover:bg-brand-green-dark text-white text-xs font-black px-5 py-3.5 rounded-xl uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
                        >
                          <Send className="w-3.5 h-3.5 text-brand-gold" />
                          <span>Request Official Quote</span>
                        </button>
                        <button 
                          onClick={() => {
                            triggerScrollToSection('finance');
                            showToast(`Quick loaded vehicle price: NPR ${currentSlide.approxPriceNPR || 450000} inside Loan calculator!`);
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-black px-5 py-3.5 rounded-xl uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
                        >
                          <Calculator className="w-3.5 h-3.5 text-brand-gold" />
                          <span>Check Loans / EMIs</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Slider Dots */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {vehicles.map((v: any, index: number) => (
                  <button 
                    key={v.id}
                    onClick={() => setCurrentHomeSlideIdx(index)}
                    className={`h-2 transition-all rounded-full ${index === currentHomeSlideIdx ? 'w-8 bg-brand-gold' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* ================= SECTION: DYNAMIC DEALER CUSTOMIZER CONTROL ROOM ================= */}
        {isAdmin && (
          <section id="section-customizer" className="scroll-mt-24 space-y-10 bg-white rounded-3xl p-6 sm:p-12 border border-gray-150 shadow-xs relative">
          
          {/* Ambient header visuals */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full filter blur-3xl -z-10 opacity-60"></div>
          
          {/* Toast Notification HUD */}
          {toast && (
            <div className="fixed bottom-6 left-6 z-50 bg-slate-905 border border-brand-green text-brand-green font-extrabold text-xs px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping"></span>
              <span>{toast}</span>
            </div>
          )}

          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-brand-green text-[10px] font-black uppercase tracking-widest bg-brand-gold/15 text-brand-gold px-3.5 py-1.5 rounded-full border border-brand-gold/10">
              🛠️ Dealership Live Editor
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-990 tracking-tight">
              Enterprise Control & Fleet Configurator
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-lg mx-auto">
              Tweak your pricing range models, live vehicle specifications, branch locations support information, financing partner rates, and general profile. Updates synchronize immediately.
            </p>
            <div className="w-12 h-0.5 bg-brand-green mx-auto rounded-full mt-2"></div>
          </div>

          {/* Configuration sub-tabs row */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-gray-150 pb-4">
            {[
              { id: 'profile', label: '🏢 Dealer Profile' },
              { id: 'vehicles', label: '🛺 Fleet Range Specs' },
              { id: 'branches', label: '📍 Branches Network' },
              { id: 'banks', label: '🏦 Bank Partners (EMI)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setConfigSubTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide cursor-pointer transition-all border ${
                  configSubTab === tab.id 
                    ? 'bg-brand-green text-white border-brand-green shadow-xs' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-slate-55 rounded-2xl border border-gray-200/80 p-5 sm:p-8">
            
            {/* SUB-TAB A: PROFILE SETTINGS */}
            {configSubTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                  <h4 className="text-sm font-black text-slate-900 border-b border-gray-200 pb-2 mb-4">🏢 Dealership Legal Profile & Brand Identity</h4>
                  <p className="text-[11px] text-gray-500 mb-4">Editing this alters the brand header strings, hero sections, and active footer coordinates automatically.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5Col">
                    <label className="text-[10px] uppercase font-black text-gray-400">Dealership Enterprise Name</label>
                    <input 
                      type="text" 
                      name="companyName" 
                      defaultValue={dealershipInfo.companyName}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Branding Subtitle</label>
                    <input 
                      type="text" 
                      name="subtitle" 
                      defaultValue={dealershipInfo.subtitle}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Head Office Physical Address</label>
                    <input 
                      type="text" 
                      name="headOfficeAddress" 
                      defaultValue={dealershipInfo.headOfficeAddress}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Direct Telephone Connection</label>
                    <input 
                      type="text" 
                      name="headOfficePhone" 
                      defaultValue={dealershipInfo.headOfficePhone}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Official Sales Email</label>
                    <input 
                      type="email" 
                      name="headOfficeEmail" 
                      defaultValue={dealershipInfo.headOfficeEmail}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                </div>

                {/* Brand Identity Image Overrides */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-gray-200/50">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Corporate Brand Logo URL</label>
                    <input 
                      type="text" 
                      name="companyLogoUrl" 
                      defaultValue={dealershipInfo.companyLogoUrl || ''}
                      placeholder="https://images.unsplash.com/... or empty for fallback truck"
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                    <p className="text-[9px] text-gray-450 font-semibold leading-normal">
                      Squared 1:1 image URL. Appears on the header navbar as the main dealer badge.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Homeland Showroom Hero Banner URL</label>
                    <input 
                      type="text" 
                      name="heroBannerUrl" 
                      defaultValue={dealershipInfo.heroBannerUrl || ''}
                      placeholder="https://images.unsplash.com/... or empty for default design"
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                    <p className="text-[9px] text-gray-450 font-semibold leading-normal">
                      Wide 16:9 banner URL. Blended beautifully as a backdrop behind the Home Hero segment.
                    </p>
                  </div>
                </div>

                {/* Smart Presets Quick-Click Palette */}
                <div className="bg-white/75 rounded-xl p-4 border border-gray-150 space-y-2.5">
                  <p className="font-extrabold text-gray-600 text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <span>💡 REAL-TIME NEPAL SHOWROOM IMAGE PRESETS</span>
                    <span className="bg-brand-green/10 text-brand-green text-[8px] font-black tracking-normal px-1.5 py-0.5 rounded uppercase">instant load</span>
                  </p>
                  <p className="text-[10px] text-gray-500 leading-normal">Click any preset theme below to set beautiful, high-speed visual identifiers instantly, then click <strong>Apply</strong> below to save.</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        const logoInp = document.querySelector('input[name="companyLogoUrl"]') as HTMLInputElement;
                        const heroInp = document.querySelector('input[name="heroBannerUrl"]') as HTMLInputElement;
                        if (logoInp) logoInp.value = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=150';
                        if (heroInp) heroInp.value = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200';
                        showToast('✓ Loaded "Alpine Transit & Mountain Roads" preset. Click "Apply Master Profile Changes" to save!');
                      }}
                      className="bg-gray-50 hover:bg-slate-100 border border-gray-200 text-gray-700 font-bold px-3 py-1.5 rounded-lg text-[10px] transition-all cursor-pointer shadow-3xs"
                    >
                      🏔️ Preset 1: Alpine Highway & Vehicles
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const logoInp = document.querySelector('input[name="companyLogoUrl"]') as HTMLInputElement;
                        const heroInp = document.querySelector('input[name="heroBannerUrl"]') as HTMLInputElement;
                        if (logoInp) logoInp.value = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=150';
                        if (heroInp) heroInp.value = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200';
                        showToast('✓ Loaded "State-of-the-art Showroom Hub" preset. Click "Apply Master Profile Changes" to save!');
                      }}
                      className="bg-gray-50 hover:bg-slate-100 border border-gray-200 text-gray-700 font-bold px-3 py-1.5 rounded-lg text-[10px] transition-all cursor-pointer shadow-3xs"
                    >
                      🏬 Preset 2: Premium City Showroom Depot
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const logoInp = document.querySelector('input[name="companyLogoUrl"]') as HTMLInputElement;
                        const heroInp = document.querySelector('input[name="heroBannerUrl"]') as HTMLInputElement;
                        if (logoInp) logoInp.value = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=150';
                        if (heroInp) heroInp.value = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200';
                        showToast('✓ Loaded "Industrial Spares & Service Station" preset. Click "Apply" to save!');
                      }}
                      className="bg-gray-50 hover:bg-slate-100 border border-gray-200 text-gray-700 font-bold px-3 py-1.5 rounded-lg text-[10px] transition-all cursor-pointer shadow-3xs"
                    >
                      🔧 Preset 3: Mechanical Engineering Spares
                    </button>
                  </div>
                </div>

                {/* Director message fields block */}
                <div className="bg-white/75 rounded-xl p-5 border border-gray-150 space-y-4 pt-4">
                  <p className="font-extrabold text-gray-600 text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <span>✉️ MANAGING DIRECTOR MESSAGE RE-WRITE ENGINE</span>
                    <span className="bg-brand-green/10 text-brand-green text-[8px] font-black tracking-normal px-1.5 py-0.5 rounded uppercase">live display</span>
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-black text-gray-400">Director Name</label>
                      <input 
                        type="text" 
                        name="directorName" 
                        defaultValue={dealershipInfo.directorName || ''}
                        placeholder="Siddha Bahadur Sapkota"
                        className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-black text-gray-400">Director Corporate Role Title</label>
                      <input 
                        type="text" 
                        name="directorTitle" 
                        defaultValue={dealershipInfo.directorTitle || ''}
                        placeholder="Founder & Managing Director"
                        className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Director Photo Photograph URL</label>
                    <input 
                      type="text" 
                      name="directorPhotoUrl" 
                      defaultValue={dealershipInfo.directorPhotoUrl || ''}
                      placeholder="https://images.unsplash.com/... block portrait"
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                    <p className="text-[9px] text-gray-450 font-semibold leading-normal">
                      Submit a professional business attire corporate card view image link.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Personal Sign-off Letter Message</label>
                    <textarea 
                      name="directorMessage" 
                      rows={4}
                      defaultValue={dealershipInfo.directorMessage || ''}
                      placeholder="Enter the welcoming greeting from the Managing Director..."
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-gray-400">Footer Operational Disclaimer text</label>
                  <textarea 
                    name="footerText" 
                    rows={3}
                    defaultValue={dealershipInfo.footerText}
                    className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-green"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit" 
                    className="bg-brand-green hover:bg-brand-green-dark text-white font-black text-[11px] uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer"
                  >
                    Apply Master Profile Changes
                  </button>
                  <button 
                    type="button" 
                    onClick={handleResetToDefaults}
                    className="bg-red-50 hover:bg-red-100 text-red-650 font-black text-[11px] uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer transition-all"
                  >
                    Reset All to Factory Defaults
                  </button>
                </div>
              </form>
            )}

            {/* SUB-TAB B: FLEET VEHICLES RANGE SPECS */}
            {configSubTab === 'vehicles' && (
              <form onSubmit={handleSaveVehicleConfig} className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-3 mb-4">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">🛺 Dynamic Piaggio Fleet Range Configurator</h4>
                    <p className="text-[11px] text-gray-500 mt-1">Adjust direct prices (NPR conversions) or add custom-spec delivery models.</p>
                  </div>
                  
                  {/* Selector of which vehicle to configure */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-400">Selected Model:</span>
                    <select
                      value={selectedVehicleEditId}
                      onChange={(e) => setSelectedVehicleEditId(e.target.value)}
                      className="bg-white rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-800 focus:outline-none"
                    >
                      <option value="new">+ Add New Custom Series...</option>
                      {vehicles.map((v: any) => (
                        <option key={v.id} value={v.id}>{v.name} ({v.fuelType})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Model Series Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Piaggio Ape E-City FX Max"
                      value={vehicleEditForm.name}
                      onChange={(e) => setVehicleEditForm({...vehicleEditForm, name: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Model Segment Category</label>
                    <select 
                      value={vehicleEditForm.category}
                      onChange={(e) => setVehicleEditForm({...vehicleEditForm, category: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none"
                    >
                      <option value="passenger">Passenger Rickshaw</option>
                      <option value="cargo">Cargo Goods Loader</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Fuel & Energy Architecture</label>
                    <select 
                      value={vehicleEditForm.fuelType}
                      onChange={(e) => setVehicleEditForm({...vehicleEditForm, fuelType: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none"
                    >
                      <option value="Electric">🔌 Electric Swappable LFP</option>
                      <option value="Petrol">⛽ Eco-Clean Petrol</option>
                      <option value="Diesel">🛢️ Turbo Diesel High-Clearance</option>
                      <option value="LPG">💨 Compressed LPG/CNG</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">NPR Standard Price (for EMI Calculation)</label>
                    <input 
                      type="number"
                      placeholder="e.g. 520000"
                      value={vehicleEditForm.approxPriceNPR}
                      onChange={(e) => setVehicleEditForm({...vehicleEditForm, approxPriceNPR: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Price Display Range Label</label>
                    <input 
                      type="text"
                      placeholder="e.g. NPR 5,10,000 - 5,45,000"
                      value={vehicleEditForm.priceRange}
                      onChange={(e) => setVehicleEditForm({...vehicleEditForm, priceRange: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Model Promo Tagline / Catchphrase</label>
                    <input 
                      type="text"
                      placeholder="Nepal’s best selling smart electric rickshaw"
                      value={vehicleEditForm.tagline}
                      onChange={(e) => setVehicleEditForm({...vehicleEditForm, tagline: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-semibold text-gray-750 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                </div>

                {/* Custom Vehicle Image overrides & Live preview */}
                <div className="bg-slate-55/60 rounded-2xl p-5 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-3.5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-black text-gray-500 block">Showroom Vehicle Photograph URL</label>
                      <input 
                        type="text"
                        placeholder="https://images.unsplash.com/... or paste any custom URL"
                        value={vehicleEditForm.imageUrl}
                        onChange={(e) => setVehicleEditForm({...vehicleEditForm, imageUrl: e.target.value})}
                        className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                      />
                      <p className="text-[9px] text-gray-450 font-semibold leading-normal">
                        Submit a direct web link to display a polished HD photograph. Leave empty to fallback to system category illustrations automatically.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-slate-500 uppercase block tracking-wider">💡 One-click high-contrast Unsplash stock assets</span>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        <button
                          type="button"
                          onClick={() => setVehicleEditForm({...vehicleEditForm, imageUrl: 'https://images.unsplash.com/photo-1561124638-c521c35ca02a?auto=format&fit=crop&q=80&w=800'})}
                          className="bg-white hover:bg-brand-green/5 text-gray-700 hover:text-brand-green font-bold px-2 py-1 border border-gray-200 hover:border-brand-green/30 text-[9px] rounded-md transition-all cursor-pointer shadow-3xs"
                        >
                          🛺 Spark-Passenger Auto
                        </button>
                        <button
                          type="button"
                          onClick={() => setVehicleEditForm({...vehicleEditForm, imageUrl: 'https://images.unsplash.com/photo-1558442074-3c19857bc1f3?auto=format&fit=crop&q=80&w=800'})}
                          className="bg-white hover:bg-brand-green/5 text-gray-700 hover:text-brand-green font-bold px-2 py-1 border border-gray-200 hover:border-brand-green/30 text-[9px] rounded-md transition-all cursor-pointer shadow-3xs"
                        >
                          🔋 Advanced Lithium EV
                        </button>
                        <button
                          type="button"
                          onClick={() => setVehicleEditForm({...vehicleEditForm, imageUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=800'})}
                          className="bg-white hover:bg-brand-green/5 text-gray-700 hover:text-brand-green font-bold px-2 py-1 border border-gray-200 hover:border-brand-green/30 text-[9px] rounded-md transition-all cursor-pointer shadow-3xs"
                        >
                          🚛 Heavy-Duty Diesel Cargo
                        </button>
                        <button
                          type="button"
                          onClick={() => setVehicleEditForm({...vehicleEditForm, imageUrl: 'https://images.unsplash.com/photo-1596898516084-5f1188d5e985?auto=format&fit=crop&q=80&w=800'})}
                          className="bg-white hover:bg-brand-green/5 text-gray-700 hover:text-brand-green font-bold px-2 py-1 border border-gray-200 hover:border-brand-green/30 text-[9px] rounded-md transition-all cursor-pointer shadow-3xs"
                        >
                          🔌 Eco Swappable Utility Loader
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic live image preview card */}
                  <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-3xs flex flex-col items-center justify-center min-h-[110px]">
                    <span className="text-[9px] uppercase font-black text-gray-400 tracking-wider mb-2">Live Photo Preview</span>
                    {vehicleEditForm.imageUrl ? (
                      <div className="relative w-full h-[90px] rounded-lg overflow-hidden bg-slate-100">
                        <img 
                          src={vehicleEditForm.imageUrl} 
                          alt="Live Vehicle Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-3">
                        <div className="text-[18px] text-gray-400 mb-1">🛺</div>
                        <span className="text-[9px] text-gray-400 font-bold">Automatic fallback illustration active</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-black tracking-wider text-brand-green border-b border-brand-green/20 pb-1 block">🛠️ Target Tech Metrics</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-gray-450">Battery Cap. (if EV)</span>
                      <input 
                        type="text"
                        placeholder="e.g. 6.5 kWh LFP swappable"
                        value={vehicleEditForm.batterySpec}
                        onChange={(e) => setVehicleEditForm({...vehicleEditForm, batterySpec: e.target.value})}
                        className="w-full bg-white rounded-lg border border-gray-200 px-2.5 py-2 text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-gray-450">Charging Time (if EV)</span>
                      <input 
                        type="text"
                        placeholder="e.g. 3.5 Hours"
                        value={vehicleEditForm.chargingSpec}
                        onChange={(e) => setVehicleEditForm({...vehicleEditForm, chargingSpec: e.target.value})}
                        className="w-full bg-white rounded-lg border border-gray-200 px-2.5 py-2 text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-gray-450">LFP driving range (if EV)</span>
                      <input 
                        type="text"
                        placeholder="e.g. 110 km"
                        value={vehicleEditForm.rangeSpec}
                        onChange={(e) => setVehicleEditForm({...vehicleEditForm, rangeSpec: e.target.value})}
                        className="w-full bg-white rounded-lg border border-gray-200 px-2.5 py-2 text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-gray-450">Max Cargo Payload Capacity</span>
                      <input 
                        type="text"
                        placeholder="e.g. 506 kg"
                        value={vehicleEditForm.payloadSpec}
                        onChange={(e) => setVehicleEditForm({...vehicleEditForm, payloadSpec: e.target.value})}
                        className="w-full bg-white rounded-lg border border-gray-200 px-2.5 py-2 text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-gray-450">Engine Displacement Cc</span>
                      <input 
                        type="text"
                        placeholder="e.g. 197 cc Petrol"
                        value={vehicleEditForm.engineSpec}
                        onChange={(e) => setVehicleEditForm({...vehicleEditForm, engineSpec: e.target.value})}
                        className="w-full bg-white rounded-lg border border-gray-200 px-2.5 py-2 text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-gray-450">Max Seating Capacity</span>
                      <input 
                        type="text"
                        placeholder="e.g. 3 Passenger + 1 Driver"
                        value={vehicleEditForm.seatingSpec}
                        onChange={(e) => setVehicleEditForm({...vehicleEditForm, seatingSpec: e.target.value})}
                        className="w-full bg-white rounded-lg border border-gray-200 px-2.5 py-2 text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-gray-450">Peak Horsepower Output</span>
                      <input 
                        type="text"
                        placeholder="e.g. 9.4 Hp @ 5010 rpm"
                        value={vehicleEditForm.powerSpec}
                        onChange={(e) => setVehicleEditForm({...vehicleEditForm, powerSpec: e.target.value})}
                        className="w-full bg-white rounded-lg border border-gray-200 px-2.5 py-2 text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-gray-450">Peak Engine Torque Output</span>
                      <input 
                        type="text"
                        placeholder="e.g. 18.0 Nm @ 3500 rpm"
                        value={vehicleEditForm.torqueSpec}
                        onChange={(e) => setVehicleEditForm({...vehicleEditForm, torqueSpec: e.target.value})}
                        className="w-full bg-white rounded-lg border border-gray-200 px-2.5 py-2 text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-gray-400">Featured Highlights (Comma-separated string)</label>
                  <input 
                    type="text"
                    placeholder="e.g., Heavy Duty Metal Cab, Smart Digital Telemetry, Dual Hydraulic Suspensions, Swappable Batteries"
                    value={vehicleEditForm.featuresString}
                    onChange={(e) => setVehicleEditForm({...vehicleEditForm, featuresString: e.target.value})}
                    className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-green"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit" 
                    className="bg-brand-green hover:bg-brand-green-dark text-white font-black text-[11px] uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer"
                  >
                    {selectedVehicleEditId === 'new' ? '➔ Add New Series to Fleet' : '✓ Save Config Changes'}
                  </button>
                  
                  {selectedVehicleEditId !== 'new' && (
                    <button 
                      type="button" 
                      onClick={handleDeleteVehicle}
                      className="bg-red-50 hover:bg-red-100 text-red-650 font-black text-[11px] uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer"
                    >
                      Delete This Series From Fleet
                    </button>
                  )}
                </div>
              </form>
            )}

            {/* SUB-TAB C: BRANCH NETWORKS REGISTRY */}
            {configSubTab === 'branches' && (
              <form onSubmit={handleSaveBranchConfig} className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-3 mb-4">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">📍 Branches Network Map Optimizer</h4>
                    <p className="text-[11px] text-gray-500 mt-1">Add details regarding Sarlahi, Lalbandi or neighboring municipality branches.</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-400">Selected Branch:</span>
                    <select
                      value={selectedBranchEditId}
                      onChange={(e) => setSelectedBranchEditId(e.target.value)}
                      className="bg-white rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-800 focus:outline-none"
                    >
                      <option value="new">+ Register New Branch Outlet...</option>
                      {branches.map(b => (
                        <option key={b.id} value={b.id}>{b.name.split(' Showroom')[0]} ({b.district.split(' DISTRICT')[0].split(',')[0]})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Branch Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Hariwon Sub-Showroom"
                      value={branchEditForm.name}
                      onChange={(e) => setBranchEditForm({...branchEditForm, name: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Operational tagline</label>
                    <input 
                      type="text"
                      placeholder="The highway diagnostic service hub"
                      value={branchEditForm.tagline}
                      onChange={(e) => setBranchEditForm({...branchEditForm, tagline: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">District / Region State</label>
                    <input 
                      type="text"
                      placeholder="e.g. Sarlahi District, Madhesh Province"
                      value={branchEditForm.district}
                      onChange={(e) => setBranchEditForm({...branchEditForm, district: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] uppercase font-black text-gray-400">Branch Physical Address</label>
                    <input 
                      type="text"
                      placeholder="East-West Highway Connection Point, Nepal"
                      value={branchEditForm.address}
                      onChange={(e) => setBranchEditForm({...branchEditForm, address: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Branch Manager / Representative</label>
                    <input 
                      type="text"
                      placeholder="Ramesh Kumar Shah"
                      value={branchEditForm.manager}
                      onChange={(e) => setBranchEditForm({...branchEditForm, manager: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Live Contact Telephone</label>
                    <input 
                      type="text"
                      placeholder="9854011122"
                      value={branchEditForm.phone}
                      onChange={(e) => setBranchEditForm({...branchEditForm, phone: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Support Email Coordinates</label>
                    <input 
                      type="email"
                      placeholder="hariwon@omsiddhababa.com"
                      value={branchEditForm.email}
                      onChange={(e) => setBranchEditForm({...branchEditForm, email: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-semibold text-gray-700 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Weekly Operating Hours</label>
                    <input 
                      type="text"
                      placeholder="Sunday - Friday: 9:00 AM - 5:30 PM"
                      value={branchEditForm.operatingHours}
                      onChange={(e) => setBranchEditForm({...branchEditForm, operatingHours: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-semibold text-gray-700 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Physical Stock Status Update string</label>
                    <input 
                      type="text"
                      placeholder="Petrol Ape and swappable EVs physically in showroom block"
                      value={branchEditForm.stockStatus}
                      onChange={(e) => setBranchEditForm({...branchEditForm, stockStatus: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-semibold text-gray-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-gray-400">Authorized Services checklist (Comma-separated)</label>
                  <input 
                    type="text"
                    placeholder="Authorized Piaggio Sales, Genuine parts store, Mechanical repair services, Instant bank clearance"
                    value={branchEditForm.servicesAvailableString}
                    onChange={(e) => setBranchEditForm({...branchEditForm, servicesAvailableString: e.target.value})}
                    className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-green"
                  />
                </div>

                {/* Branch Facility Photograph Overrides & Live Preview */}
                <div className="bg-slate-55/60 rounded-2xl p-5 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-3.5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-black text-gray-500 block">Branch Facility Photograph URL</label>
                      <input 
                        type="text"
                        placeholder="https://images.unsplash.com/... or paste any custom URL"
                        value={branchEditForm.imageUrl || ''}
                        onChange={(e) => setBranchEditForm({...branchEditForm, imageUrl: e.target.value})}
                        className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                      />
                      <p className="text-[9px] text-gray-450 font-semibold leading-normal">
                        Submit a direct link to showcase the physical showroom facility or diagnostic mechanic docks in the Branch selector.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-slate-500 uppercase block tracking-wider">💡 One-click High-Resolution Nepal Showroom Presets</span>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        <button
                          type="button"
                          onClick={() => setBranchEditForm({...branchEditForm, imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800'})}
                          className="bg-white hover:bg-brand-green/5 text-gray-700 hover:text-brand-green font-bold px-2 py-1 border border-gray-200 hover:border-brand-green/30 text-[9px] rounded-md transition-all cursor-pointer shadow-3xs"
                        >
                          🏬 Modern 3S Glass Showroom
                        </button>
                        <button
                          type="button"
                          onClick={() => setBranchEditForm({...branchEditForm, imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'})}
                          className="bg-white hover:bg-brand-green/5 text-gray-700 hover:text-brand-green font-bold px-2 py-1 border border-gray-200 hover:border-brand-green/30 text-[9px] rounded-md transition-all cursor-pointer shadow-3xs"
                        >
                          🏗️ Mega Transit Dispatch Hub
                        </button>
                        <button
                          type="button"
                          onClick={() => setBranchEditForm({...branchEditForm, imageUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800'})}
                          className="bg-white hover:bg-brand-green/5 text-gray-700 hover:text-brand-green font-bold px-2 py-1 border border-gray-200 hover:border-brand-green/30 text-[9px] rounded-md transition-all cursor-pointer shadow-3xs"
                        >
                          🛠️ Highway Automotive Service Dock
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Branch live image preview card */}
                  <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-3xs flex flex-col items-center justify-center min-h-[110px]">
                    <span className="text-[9px] uppercase font-black text-gray-400 tracking-wider mb-2">Facility live Photo</span>
                    {branchEditForm.imageUrl ? (
                      <div className="relative w-full h-[90px] rounded-lg overflow-hidden bg-slate-100">
                        <img 
                          src={branchEditForm.imageUrl} 
                          alt="Live Branch Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-3">
                        <div className="text-[18px] text-gray-400 mb-1">🏢</div>
                        <span className="text-[9px] text-gray-400 font-bold">No facility photo linked yet</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit" 
                    className="bg-brand-green hover:bg-brand-green-dark text-white font-black text-[11px] uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer"
                  >
                    {selectedBranchEditId === 'new' ? '➔ Register Sub-branch outlet' : '✓ Save Branch Specifications'}
                  </button>
                  
                  {selectedBranchEditId !== 'new' && selectedBranchEditId !== 'lalbandi' && (
                    <button 
                      type="button" 
                      onClick={handleDeleteBranch}
                      className="bg-red-50 hover:bg-red-100 text-red-650 font-black text-[11px] uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer"
                    >
                      Delete Sarlahi Sub-branch Location
                    </button>
                  )}
                </div>
              </form>
            )}

            {/* SUB-TAB D: PARTNER BANKS (EMI SCHEMES) */}
            {configSubTab === 'banks' && (
              <form onSubmit={handleSaveBankConfig} className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-3 mb-4">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">🏦 Partner Financial Institutions Settings</h4>
                    <p className="text-[11px] text-gray-500 mt-1">Modify auto-calculated baseline interest bounds and credit coverage rates.</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-400">Selected Institution:</span>
                    <select
                      value={selectedBankIndex}
                      onChange={(e) => setSelectedBankIndex(e.target.value)}
                      className="bg-white rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-800 focus:outline-none"
                    >
                      <option value="new">+ Add Brand New Cooperative Bank...</option>
                      {banks.map((b, idx) => (
                        <option key={idx} value={idx}>{b.name} ({b.logo})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] uppercase font-black text-gray-400">Legal Name of Cooperative / Bank</label>
                    <input 
                      type="text"
                      placeholder="e.g. Lalbandi Transport Cooperative Corp"
                      value={bankEditForm.name}
                      onChange={(e) => setBankEditForm({...bankEditForm, name: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Logo Initials</label>
                    <input 
                      type="text"
                      placeholder="LC"
                      maxLength={3}
                      value={bankEditForm.logo}
                      onChange={(e) => setBankEditForm({...bankEditForm, logo: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-black text-center text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-gray-400">Maximum Financing Limit</label>
                    <input 
                      type="text"
                      placeholder="Up to 75% for Electric Motors"
                      value={bankEditForm.maxFinancing}
                      onChange={(e) => setBankEditForm({...bankEditForm, maxFinancing: e.target.value})}
                      className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-semibold text-gray-750 focus:outline-none focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-gray-400">Annual baseline Interest Rate range string</label>
                  <input 
                    type="text"
                    placeholder="9.0% - 11.5% Floating"
                    value={bankEditForm.interestRate}
                    onChange={(e) => setBankEditForm({...bankEditForm, interestRate: e.target.value})}
                    className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800"
                  />
                </div>

                {/* Bank Partner Branding Overrides & Live Preview */}
                <div className="bg-slate-55/60 rounded-2xl p-5 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-3.5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-black text-gray-500 block">Bank Corporate Logo URL</label>
                      <input 
                        type="text"
                        placeholder="https://images.unsplash.com/... or paste any custom URL"
                        value={bankEditForm.logoUrl || ''}
                        onChange={(e) => setBankEditForm({...bankEditForm, logoUrl: e.target.value})}
                        className="w-full bg-white rounded-xl border border-gray-200 p-3 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green"
                      />
                      <p className="text-[9px] text-gray-450 font-semibold leading-normal">
                        Submit a direct link to showcase the official bank partner logo in the bank finance selector.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-slate-500 uppercase block tracking-wider">💡 One-click High-Resolution Nepal Banking Logo Presets</span>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        <button
                          type="button"
                          onClick={() => setBankEditForm({...bankEditForm, logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=150'})}
                          className="bg-white hover:bg-brand-green/5 text-gray-700 hover:text-brand-green font-bold px-2 py-1 border border-gray-200 hover:border-brand-green/30 text-[9px] rounded-md transition-all cursor-pointer shadow-3xs animate-fade-in"
                        >
                          🏦 Tech Banking Logo
                        </button>
                        <button
                          type="button"
                          onClick={() => setBankEditForm({...bankEditForm, logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=150'})}
                          className="bg-white hover:bg-brand-green/5 text-gray-700 hover:text-brand-green font-bold px-2 py-1 border border-gray-200 hover:border-brand-green/30 text-[9px] rounded-md transition-all cursor-pointer shadow-3xs"
                        >
                          👩🏽‍💼 Cooperative Trust Logo
                        </button>
                        <button
                          type="button"
                          onClick={() => setBankEditForm({...bankEditForm, logoUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=150'})}
                          className="bg-white hover:bg-brand-green/5 text-gray-700 hover:text-brand-green font-bold px-2 py-1 border border-gray-200 hover:border-brand-green/30 text-[9px] rounded-md transition-all cursor-pointer shadow-3xs"
                        >
                          💸 General Micro-finance Logo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bank live image preview card */}
                  <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-3xs flex flex-col items-center justify-center min-h-[110px]">
                    <span className="text-[9px] uppercase font-black text-gray-400 tracking-wider mb-2">Institution Logo Preview</span>
                    {bankEditForm.logoUrl ? (
                      <div className="relative w-24 h-12 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                        <img 
                          src={bankEditForm.logoUrl} 
                          alt="Live Bank Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="bg-brand-green/10 text-brand-green font-black text-sm w-12 h-12 rounded-full flex items-center justify-center">
                        {bankEditForm.logo || 'BK'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit" 
                    className="bg-brand-green hover:bg-brand-green-dark text-white font-black text-[11px] uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer"
                  >
                    {selectedBankIndex === 'new' ? '➔ Register Bank Program' : '✓ Save Finance Program Parameters'}
                  </button>
                  
                  {selectedBankIndex !== 'new' && (
                    <button 
                      type="button" 
                      onClick={handleDeleteBank}
                      className="bg-red-50 hover:bg-red-100 text-red-650 font-black text-[11px] uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer"
                    >
                      Clearing Program Coordinates
                    </button>
                  )}
                </div>
              </form>
            )}

          </div>
        </section>
        )}

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

          <EMICalculator 
            onOpenInquiry={(vId) => {
              const vName = vehicles.find(v => v.id === vId)?.name || 'Custom Vehicle';
              setInquiryVehicle(vName);
              triggerScrollToSection('inquiry');
              showToast(`✓ Selected ${vName}! Fill in your details below to request a direct quotation.`);
            }} 
            vehiclesList={vehicles}
            partnerBanksList={banks}
          />
        </section>

        {/* ================= SECTION: CUSTOMER BOOKING & INQUIRY FORM ================= */}
        <section id="section-inquiry" className="scroll-mt-24 space-y-10 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          {/* Accent decoration overlay */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-green/10 rounded-full filter blur-3xl -z-10 opacity-70"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side info column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-green-light/20 text-brand-gold px-3 py-1 rounded-full border border-brand-green/20 text-[10px] uppercase font-black tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></span>
                <span>Direct Showroom Dispatch Desk</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Request a Quote & <span className="text-brand-green">Book Test Drives</span>
              </h2>
              <p className="text-xs text-gray-450 leading-relaxed font-semibold">
                Submit your official booking intent directly to the Sarlahi HQ or other regional outlets. Our representative will immediately coordinate file submissions, downpayment loan layouts, and physical dispatch terms.
              </p>
              
              {/* Trust badges */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center border border-brand-green/20">
                    <Check className="w-4 h-4 text-brand-green" />
                  </div>
                  <div className="text-xs">
                    <p className="font-extrabold text-white text-[11px]">Instant Leads Broadcast</p>
                    <p className="text-[10px] text-gray-500 font-semibold">Instantly routed directly to dealer administrative dashboard</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center border border-brand-green/20">
                    <Check className="w-4 h-4 text-brand-green" />
                  </div>
                  <div className="text-xs">
                    <p className="font-extrabold text-white text-[11px]">30% Downpayment Verified</p>
                    <p className="text-[10px] text-gray-500 font-semibold">Nabil Bank, NIC Asia, & custom cooperative templates ready</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side form block */}
            <div className="lg:col-span-7 bg-slate-905/70 backdrop-blur-xs rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Bal Bahadur Karki"
                      className="w-full text-xs font-semibold px-4 py-3 bg-slate-850 border border-slate-750 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green text-white placeholder-gray-450"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[11px] text-gray-400 font-bold border-r border-slate-750 pr-2">
                        +977
                      </div>
                      <input 
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        placeholder="e.g. 9841526317"
                        className="w-full text-xs font-semibold pl-16 pr-4 py-3 bg-slate-850 border border-slate-755 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green text-white placeholder-gray-450"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Vehicle selection dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                      Choose Vehicle Model Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={inquiryVehicle}
                      onChange={(e) => setInquiryVehicle(e.target.value)}
                      className="w-full text-xs font-semibold px-4 py-3 bg-slate-850 border border-slate-750 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green text-white appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-gray-800">Choose preferred model...</option>
                      {vehicles.map((v: any) => (
                        <option key={v.id} value={v.name} className="text-gray-900 font-semibold">{v.name} ({v.fuelType})</option>
                      ))}
                    </select>
                  </div>

                  {/* Location field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                      Inquiry Location Origin
                    </label>
                    <select
                      value={inquiryLocation}
                      onChange={(e) => setInquiryLocation(e.target.value)}
                      className="w-full text-xs font-semibold px-4 py-3 bg-slate-850 border border-slate-750 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green text-white appearance-none cursor-pointer"
                    >
                      <option value="Lalbandi Main Office (Sarlahi Hub)" className="text-gray-900 font-semibold">Lalbandi Main Office (Sarlahi Hub)</option>
                      <option value="Kathmandu Central Showroom" className="text-gray-900 font-semibold">Kathmandu Central Showroom</option>
                      <option value="Bardibas Highway Center" className="text-gray-900 font-semibold">Bardibas Highway Center</option>
                      <option value="Chandranigahapur Branch" className="text-gray-900 font-semibold">Chandranigahapur Branch</option>
                      <option value="Hariwon Outlet" className="text-gray-900 font-semibold">Hariwon Outlet</option>
                    </select>
                  </div>
                </div>

                {/* Message text area */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                    Special message or loan terms request
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="e.g. Interested in low-rate financing. Please send business quote for 3 units."
                    className="w-full text-xs font-semibold px-4 py-3 bg-slate-850 border border-slate-750 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green text-white placeholder-gray-450 resize-none"
                  ></textarea>
                </div>

                {/* Submission CTA button */}
                <button
                  type="submit"
                  disabled={isSubmittingInquiry}
                  className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider ease-in-out transition-all active:scale-95 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmittingInquiry ? 'Sending Lead to HQ Board...' : 'Submit Quotation Request ➔'}
                </button>
              </form>
            </div>
          </div>
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

          {/* ================= HIGH GRAPHICAL QUALITY INTEGRATION: SPARE PARTS & HEAVY MACHINERY ================= */}
          <div className="max-w-7xl mx-auto space-y-10 pt-12 border-t border-gray-150">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-brand-green text-[10px] font-black uppercase tracking-widest bg-brand-green-light px-3.5 py-1.5 rounded-full text-brand-green border border-brand-green/10 flex items-center gap-1.5 justify-center w-fit mx-auto">
                <Wrench className="w-3.5 h-3.5 text-brand-green animate-spin" style={{ animationDuration: '4s' }} />
                <span>Heavy Machinery & Genuine Parts Depot</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                Original Spare Parts & Heavy Assemblies
              </h3>
              <p className="text-sm text-gray-650 max-w-xl mx-auto leading-relaxed">
                Om Siddhababa represents authorized OEM-certified diesel engine blocks, electronic energy frames, multi-leaf chassis setups, and heavy tyres direct from Piaggio India warehouses to our Lalbandi stores.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Mechanical List selector */}
              <div className="lg:col-span-5 space-y-3.5">
                {[
                  {
                    id: 'engine-block',
                    title: 'Piaggio Ape 197cc Single Cylinder Engine Block',
                    category: 'Core Powertrain',
                    price: 'NPR 68,000',
                    sn: 'OEM-EN-197-X1',
                    image: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=600'
                  },
                  {
                    id: 'drive-shaft',
                    title: 'High-Tensile Constant-Velocity Drive Shaft',
                    category: 'Drivetrain Systems',
                    price: 'NPR 18,500',
                    sn: 'OEM-DS-CV-L2',
                    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600'
                  },
                  {
                    id: 'lfp-battery',
                    title: 'Advanced LFP 48V Lithium-Ion Battery Module',
                    category: 'Electric Systems',
                    price: 'NPR 1,85,000',
                    sn: 'OEM-LFP-BAT-4K',
                    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=600'
                  },
                  {
                    id: 'leaf-springs',
                    title: 'Reinforced 5-Leaf Grade-C Spring Suspension Set',
                    category: 'Suspensions & Chassis',
                    price: 'NPR 14,200',
                    sn: 'OEM-LS-SUSP-K1',
                    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=600'
                  },
                  {
                    id: 'heavy-tyre',
                    title: 'Ape Extreme Commercial High-Rib Grip Tyre',
                    category: 'Tyres & Hubs',
                    price: 'NPR 4,950',
                    sn: 'OEM-TY-450-X',
                    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=600'
                  }
                ].map(part => (
                  <button
                    key={part.id}
                    onClick={() => setSelectedSpareId(part.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3.5 cursor-pointer ${
                      selectedSpareId === part.id
                        ? 'bg-brand-green border-brand-green text-white shadow-md'
                        : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-850'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                      <img src={part.image} alt={part.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          selectedSpareId === part.id ? 'bg-white/20 text-brand-gold' : 'bg-brand-green/10 text-brand-green'
                        }`}>{part.category}</span>
                        <span className={`text-[10px] font-semibold ${selectedSpareId === part.id ? 'text-gray-205' : 'text-gray-400'}`}>{part.sn}</span>
                      </div>
                      <h4 className="font-extrabold text-xs truncate">{part.title}</h4>
                      <p className={`font-black text-xs ${selectedSpareId === part.id ? 'text-brand-gold' : 'text-brand-green'}`}>{part.price}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Column: Display Expanded Specs Card of selected part */}
              {(() => {
                const partsMetadata: Record<string, any> = {
                  'engine-block': {
                    title: 'Piaggio Ape 197cc Single Cylinder Engine Block Assembly',
                    category: 'Core Powertrain System',
                    sn: 'OEM-EN-197-X1',
                    price: 'NPR 68,000 (MSRP)',
                    stockStatus: 'In stock (12 units ready at Lalbandi Main Parts Depot)',
                    specs: [
                      { label: 'Power output', value: '9.38 HP @ 5000 RPM (Super Power-Curve)' },
                      { label: 'Torque Range', value: '16.7 Nm @ 3000 RPM raw acceleration' },
                      { label: 'Cooling mechanism', value: 'Advanced pressurized air-cooling fin grid' },
                      { label: 'Oil Sump capacity', value: '1.25 Liters genuine Piaggio system lube' },
                      { label: 'Warranty coverage', value: '12 Months / 10,000 Kilometers official dealer warranty' }
                    ],
                    details: 'This is the complete original metal monobloc cylinder kit. Forged under precision Piaggio tooling parameters, it matches Kathmandu and Sarlahi environment standards to offer perfect thermal balance even under complete commercial passenger loads climbing steep grades.',
                    image: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=800'
                  },
                  'drive-shaft': {
                    title: 'High-Tensile Constant-Velocity forged drive shaft assembly',
                    category: 'Drivetrain Systems',
                    sn: 'OEM-DS-CV-L2',
                    price: 'NPR 18,500 (Per segment pair)',
                    stockStatus: 'Active Warehouse stock (Lalbandi, Kathmandu & Hariwon points)',
                    specs: [
                      { label: 'Material matrix', value: 'Forged chrome-molybdenum high-temper structural steel' },
                      { label: 'Joint configuration', value: 'Double CV standard joint with 6-ball load race' },
                      { label: 'Boot defense', value: 'Anti-tear premium silicone rubber with steel wire clamp bands' },
                      { label: 'Rotational rating', value: 'Up to 3,500 RPM under load-deflection angles of 45°' },
                      { label: 'Maintenance interval', value: 'Re-grease every 15,000 KM with high-temp lithium grease' }
                    ],
                    details: 'Ensure complete power delivery to your rear hubs with this premium forged CV axle. Specially fortified for rugged Nepalese mountain tracks, it prevents clicking, hub grinding, and traction losses under intense freight carrying.',
                    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800'
                  }              ,
                  'lfp-battery': {
                    title: 'Advanced LFP 48V Lithium-Ion Battery Module (Smart Swapping)',
                    category: 'Electric Systems',
                    sn: 'OEM-LFP-BAT-4K',
                    price: 'NPR 1,85,000 (Trade-in & Government subsidies support)',
                    stockStatus: 'Active Warehouse (3 units certified ready for immediate dispatch)',
                    specs: [
                      { label: 'Chemistry setup', value: 'High stability Lithium Iron Phosphate (LiFePO4) cell grid' },
                      { label: 'Nominal potential', value: '51.2 Volts (continuous voltage output matrix)' },
                      { label: 'Nominal Capacity', value: '150 Ampere-Hours / 7.68 Kilowatt-Hours maximum load' },
                      { label: 'BMS features', value: 'Integrated Over-temp, cell-balancing & telemetry Bluetooth chip' },
                      { label: 'Cycle durability', value: '3,000 complete charge/discharge cycles to 80% original state' }
                    ],
                    details: 'The official replacement green-core battery stack for the Ape E-City and E-Xtra EV fleets. Tested under maximum summer heat indexes in Bardibas & Sarlahi plains to guarantee complete ranges and safe temperature control profiles.',
                    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800'
                  },
                  'leaf-springs': {
                    title: 'Reinforced 5-Leaf Grade-C Spring Suspension Set',
                    category: 'Suspensions & Chassis Support',
                    sn: 'OEM-LS-SUSP-K1',
                    price: 'NPR 14,200',
                    stockStatus: 'High stock levels (Immediate delivery to Sarlahi corridors)',
                    specs: [
                      { label: 'Blade setup count', value: '5 high-impact layered metal blades with center dowpins' },
                      { label: 'Material selection', value: 'Grade-C high-tension silicio-manganese spring steel' },
                      { label: 'Weight rating', value: 'Up to 750 kg continuous cargo pressure margins' },
                      { label: 'Bushing structure', value: 'Anti-friction heavy polyurethane sleeve inserts' },
                      { label: 'Durability tests', value: 'Deflection-tested under 1.25 million cyclic dynamic impacts' }
                    ],
                    details: 'Replace soft, sagging, or cracked leaf assemblies with this heavy-duty dual leaf upgrade. Offers superior load stability on deep trail potholes near Hariwon and Sarlahi highways, maintaining original cargo floor heights.',
                    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=800'
                  },
                  'heavy-tyre': {
                    title: 'Ape Extreme Commercial High-Rib Grip Tyre',
                    category: 'Tyres & Hubs',
                    sn: 'OEM-TY-450-X',
                    price: 'NPR 4,950',
                    stockStatus: 'In stock / volume discounts for registered commercial local drivers',
                    specs: [
                      { label: 'Tread type', value: 'Extreme ribbed anti-slip deep track tread' },
                      { label: 'Ply ranking', value: '8-Ply heavy duty structural cords' },
                      { label: 'Size rating', value: '4.50 - 10 commercial three wheeler standard' },
                      { label: 'Max payload', value: '460 Kilograms pressure rating per tyre' },
                      { label: 'Material matrix', value: 'Reinforced synthetic nylon-rubber compound' }
                    ],
                    details: 'Dredge mud, climb sand paths, and brake confidently on wet blacktops using this heavy-duty commercial auto-rickshaw tyre. Deep multi-rib structures prevent hydroplaning and extend life cycles by up to 25% over standard alternatives.',
                    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=800'
                  }
                };

                const activePart = partsMetadata[selectedSpareId] || partsMetadata['engine-block'];

                return (
                  <div className="lg:col-span-7 bg-slate-55 rounded-3xl border border-gray-200/80 p-6 sm:p-8 space-y-6">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <span className="bg-brand-green/10 text-brand-green border border-brand-green/20 text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block">{activePart.category}</span>
                        <h4 className="text-xl sm:text-2xl font-black text-gray-950 truncate leading-tight mt-1">{activePart.title}</h4>
                        <p className="text-xs text-gray-400 font-extrabold uppercase tracking-wide mt-1">SerialNumber: {activePart.sn}</p>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <p className="text-brand-green font-black text-xl text-brand-green">{activePart.price}</p>
                        <p className="text-[10px] text-emerald-650 font-extrabold flex items-center gap-1 mt-1 justify-start sm:justify-end">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-550 animate-pulse"></span>
                          <span>{activePart.stockStatus.split(' (')[0]}</span>
                        </p>
                      </div>
                    </div>

                    {/* Part Image with overlay certified brand */}
                    <div className="relative w-full h-[180px] sm:h-[240px] rounded-2xl overflow-hidden border border-gray-200">
                      <img src={activePart.image} alt={activePart.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-md text-[9px] font-black text-brand-gold py-1 px-2.5 rounded-lg border border-white/10 uppercase tracking-widest flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Authorized Genuine Spare</span>
                      </div>
                    </div>

                    {/* Technical spec sheet */}
                    <div className="space-y-4">
                      <h5 className="text-[10px] uppercase font-black tracking-widest text-slate-400">Technical Spec Sheet</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
                        {activePart.specs.map((sp: any, idx: number) => (
                          <div key={idx} className="bg-white px-4 py-3 rounded-xl border border-gray-150 space-y-0.5 text-xs shadow-2xs">
                            <span className="text-gray-400 font-bold block text-[9px] uppercase">{sp.label}</span>
                            <span className="text-slate-800 font-black block">{sp.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-[10px] uppercase font-black tracking-widest text-slate-400">Engineering Application Details</h5>
                        <p className="text-xs text-gray-600 font-semibold leading-relaxed bg-white p-4 rounded-xl border border-gray-150 shadow-2xs">
                          {activePart.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-gray-150">
                      <button
                        onClick={() => {
                          setInquiryVehicle(`Genuine Spares: ${activePart.title}`);
                          setInquiryMessage(`Hello Om Siddhababa Enterprises! I am writing to obtain stock dispatch rates and installment schemes for the genuine machinery/spare part: ${activePart.title} (S/N: ${activePart.sn}).`);
                          triggerScrollToSection('inquiry');
                          showToast(`Inquiry configured for spare part: ${activePart.sn}!`);
                        }}
                        className="bg-brand-green hover:bg-brand-green-dark text-white font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
                      >
                        <Wrench className="w-4 h-4 text-brand-gold animate-bounce" />
                        <span>Inquire Part Spares Quote</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* ================= NEW SECTION: CORPORATE TRIUMPHS & AWARDS ================= */}
        <section id="section-awards" className="scroll-mt-24 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-brand-green text-[10px] font-black uppercase tracking-widest bg-brand-green-light px-3.5 py-1.5 rounded-full text-brand-green border border-brand-green/10 flex items-center justify-center w-fit mx-auto gap-1">
              <Award className="w-3.5 h-3.5 text-brand-green" />
              <span>National Laurels & Recognitions</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Honors & Certifications of Excellence
            </h2>
            <p className="text-sm text-gray-650 max-w-xl mx-auto leading-relaxed font-semibold">
              Our commitment to delivering low-running-cost zero-emission fleets across Madhesh Province has earned us leading tier-1 industry certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Best Commercial EV Dealership (2025)",
                issuer: "Awarded by Piaggio India MD",
                date: "March 2025",
                desc: "Honored for driving high-density electric fleet distribution and setting up advanced battery diagnostics centers in Sarlahi, Nepal.",
                bg: "from-amber-500/10 to-amber-600/5 hover:border-amber-500/40",
                badge: "🏆 Gold Medalist",
                badgeBg: "bg-amber-100 text-amber-900"
              },
              {
                title: "Madhesh Province Eco-Mobility Pioneer",
                issuer: "Ministry of Transport, Nepal",
                date: "December 2024",
                desc: "Certified for deploying over 250+ swappable Lithium-Ion three-wheelers, significantly reducing carbon exhaust in local municipal routes.",
                bg: "from-brand-green/10 to-brand-green/5 hover:border-brand-green/45",
                badge: "🔋 Eco Seal",
                badgeBg: "bg-brand-green-light text-brand-green"
              },
              {
                title: "Piaggio Genuine Parts Depot Quality Seal",
                issuer: "Piaggio Commercial Vehicles Nepal",
                date: "January 2026",
                desc: "Official certification recognizing our Lalbandi spare warehouse as a 100% genuine and safe drivetrain components distributor.",
                bg: "from-blue-500/10 to-blue-600/5 hover:border-blue-500/40",
                badge: "⚙️ 100% Genuine",
                badgeBg: "bg-blue-100 text-blue-900"
              }
            ].map((award, idx) => (
              <div 
                key={idx} 
                className={`bg-white hover:bg-gradient-to-br ${award.bg} border border-gray-250/70 rounded-3xl p-6 shadow-2xs hover:shadow-md transition-all duration-300 relative group space-y-4`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${award.badgeBg}`}>
                    {award.badge}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold">{award.date}</span>
                </div>
                <div className="space-y-1.5 text-left">
                  <h4 className="font-extrabold text-sm text-gray-950 group-hover:text-brand-green transition-colors">{award.title}</h4>
                  <p className="text-[10px] font-black text-brand-green uppercase tracking-widest">{award.issuer}</p>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed pt-2">{award.desc}</p>
                </div>
                <div className="absolute bottom-4 right-4 text-gray-300 group-hover:text-amber-500 transition-colors">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= NEW SECTION: HAPPY CUSTOMERS TESTIMONIALS ================= */}
        <section id="section-happy-customers" className="scroll-mt-24 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-brand-green text-[10px] font-black uppercase tracking-widest bg-brand-green-light px-3.5 py-1.5 rounded-full text-brand-green border border-brand-green/10 flex items-center justify-center w-fit mx-auto">
              💬 Verified Customer Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Our Happy Customers
            </h2>
            <p className="text-sm text-gray-650 max-w-xl mx-auto leading-relaxed font-semibold">
              Read real testaments of hard-working drivers, retail traders, and cooperative fleet owners who turned their businesses self-reliant with Om Siddhababa's vehicles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ramesh Bahadur Thapa",
                location: "Lalbandi-1, Sarlahi",
                role: "LPG Gas Cylinder Depot Manager",
                vehicle: "Piaggio Ape Cargo DX (Diesel)",
                avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=150",
                text: "Our gas distribution was slow because full-sized trucks cannot navigate Sarlahi's narrow back alleys. The Ape Cargo DX solved this instantly! Its huge 550kg payload and diesel power pulls heavy loads uphill with absolute ease."
              },
              {
                name: "Sushma Shrestha",
                location: "Kathmandu Showroom Buyer",
                role: "Public Transit Operator Owner",
                vehicle: "Piaggio Ape E-City FX (Electric)",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
                text: "Swapping to the Piaggio Electric Auto was the best business choice I've made. My running costs plummeted from NPR 600 per day in petrol to under NPR 75 in battery charging! Passengers love the silent, vibration-free ride."
              },
              {
                name: "Hari Prasad Pokharel",
                location: "Hariwon, Sarlahi Corridor",
                role: "Drinking Water Distributor",
                vehicle: "Piaggio Ape E-Xtra Cargo (Electric)",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
                text: "I operate 3 electric cargo autos purchased directly from Om Siddhababa Enterprises. Their bank EMI financing process was crystal clear, and the regular support and genuine parts availability at Lalbandi keeps our logistic trucks running 24/7."
              }
            ].map((cust, idx) => (
              <div 
                key={idx} 
                className="bg-white border text-left border-gray-200 rounded-3xl p-6 shadow-2xs relative flex flex-col justify-between space-y-6 hover:shadow-md transition-all duration-300"
              >
                {/* Speech Bubble Arrow */}
                <div className="absolute -bottom-2.5 left-8 w-5 h-5 bg-white border-r border-b border-gray-200 rotate-45 transform"></div>
                
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-650 leading-relaxed italic font-medium">
                    &quot;{cust.text}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-250 shadow-inner">
                    <img 
                      src={cust.avatar} 
                      alt={cust.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{cust.name}</h4>
                    <p className="text-[10px] text-brand-green font-bold">{cust.vehicle}</p>
                    <p className="text-[9px] text-gray-400 font-extrabold">{cust.location} • {cust.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= NEW SECTION: SECURITY & FINANCE COMPLIANCE ================= */}
        <section id="section-compliance" className="scroll-mt-24">
          <div className="bg-emerald-50 rounded-3xl p-6 sm:p-10 border border-emerald-250/60 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-4 space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-black border border-brand-green/20">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-green animate-pulse" />
                <span>100% Authorized & Certified</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                Operational Safety & Finance Compliance
              </h3>
              <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                Om Siddhababa Enterprises strictly upholds regional Nepalese automotive guidelines and fair credit transparency.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-semibold text-gray-750">
              <div className="bg-white p-4.5 rounded-2xl border border-emerald-100 space-y-2 shadow-2xs">
                <h4 className="font-black text-brand-green uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                  <span>1. Fair Interest & Zero Hidden EMIs</span>
                </h4>
                <p className="text-gray-500 font-semibold leading-relaxed text-[11px]">
                  All partnership bank calculations correspond natively with Bank of Nepal protocols. No composite margin updates without direct client consent.
                </p>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-emerald-100 space-y-2 shadow-2xs">
                <h4 className="font-black text-brand-green uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                  <span>2. Client Data Security Guarantee</span>
                </h4>
                <p className="text-gray-500 font-semibold leading-relaxed text-[11px]">
                  All mobile contacts, name records, and inquiry quotes entered onto this portal are securely stored. We never resell your data parameters to external advertising brokers.
                </p>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-emerald-100 space-y-2 shadow-2xs">
                <h4 className="font-black text-brand-green uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                  <span>3. Certified LFP Lithium Safety</span>
                </h4>
                <p className="text-gray-500 font-semibold leading-relaxed text-[11px]">
                  Piaggio’s smart swappable LFP (Lithium Iron Phosphate) cells feature internal pressure sensors, thermal cut-offs, and automatic climate grade protection.
                </p>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-emerald-100 space-y-2 shadow-2xs">
                <h4 className="font-black text-brand-green uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                  <span>4. 100% Genuine Spare Seals</span>
                </h4>
                <p className="text-gray-500 font-semibold leading-relaxed text-[11px]">
                  Exclusively trading OEM-made parts from Piaggio factories. Eliminating the safety risk of knock-off clutch bells or low-grade brake drums.
                </p>
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

          {/* INTERACTIVE HIGHWAY BluePrint MAP SECTION */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
            {/* Design Grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-25"></div>
            
            <div className="relative space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-sm font-extrabold text-brand-gold flex items-center gap-1.5 uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-brand-gold animate-bounce" />
                    <span>Interactive Sarlahi Network Locator</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Map pinned location matrix across East-West Expressway & Kathmandu capital corridor. Click any pin to lock contact details below.
                  </p>
                </div>
                {/* Active selection badge */}
                {(() => {
                  const currentBranchObj = branches.find(b => b.id === selectedBranchId) || branches[0];
                  return (
                    <div className="bg-brand-green/20 border border-brand-green/30 px-3 py-1.5 rounded-xl flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-555 animate-ping"></span>
                      <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">Focused: {currentBranchObj.name}</span>
                    </div>
                  );
                })()}
              </div>

              {/* The Highway Stage viewport */}
              <div className="relative h-[220px] sm:h-[300px] bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
                {/* Visual highway axis curves */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Kathmandu connection link */}
                  <path d="M 120 40 Q 200 120 380 200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 4" fill="transparent" opacity="0.4" />
                  {/* East-West Highway Axis segment */}
                  <line x1="80" y1="200" x2="880" y2="200" stroke="#10b981" strokeWidth="3" strokeDasharray="1 0" opacity="0.6" />
                  <text x="90" y="185" fill="#94a3b8" fontSize="10" fontWeight="bold">EAST-WEST HIGHWAY CORRIDOR</text>
                  <text x="140" y="45" fill="#f59e0b" fontSize="10" fontWeight="bold">KATHMANDU LINK ROAD</text>
                </svg>

                {/* Nodes Pin items */}
                {[
                  { id: 'kathmandu', label: 'Kathmandu Hub', x: '18%', y: '20%', desc: 'Central Transit Office', color: 'bg-amber-500 border-amber-300' },
                  { id: 'chandrapur', label: 'Chandrapur Office', x: '25%', y: '68%', desc: 'West Connection', color: 'bg-emerald-500 border-emerald-300' },
                  { id: 'hariwon', label: 'Hariwon Branch', x: '45%', y: '68%', desc: 'Active Sarlahi West', color: 'bg-emerald-500 border-emerald-300' },
                  { id: 'lalbandi', label: 'Lalbandi HQ Showroom', x: '60%', y: '68%', desc: 'Om Siddhababa Main Office', color: 'bg-brand-green border-brand-gold ring-4 ring-brand-green-light/40' },
                  { id: 'bardibas', label: 'Bardibas Point', x: '82%', y: '68%', desc: 'East Corridor connection', color: 'bg-emerald-500 border-emerald-300' }
                ].map(node => {
                  const bExists = branches.some(b => b.id === node.id);
                  const isCurNode = selectedBranchId === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => bExists && setSelectedBranchId(node.id)}
                      style={{ left: node.x, top: node.y }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 focus:outline-none ${bExists ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      {/* Pulsing ring */}
                      {isCurNode && (
                        <span className="absolute -inset-3 rounded-full bg-brand-green/30 animate-ping"></span>
                      )}
                      
                      {/* The pin circle */}
                      <div className={`w-5.5 h-5.5 rounded-full border-2 ${node.color} flex items-center justify-center transition-all ${
                        isCurNode ? 'scale-125 shadow-lg' : 'hover:scale-110 opacity-80'
                      }`}>
                        <div className="w-2 h-2 rounded-full bg-slate-950"></div>
                      </div>

                      {/* Tooltip Hover/Active Label */}
                      <div className={`p-2.5 rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-md shadow-2xl transition-all duration-300 absolute bottom-7 -translate-x-1/2 left-1/2 w-[160px] text-center pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 ${
                        isCurNode ? 'opacity-100 translate-y-0 scale-100 border-brand-gold' : 'opacity-0 translate-y-1 scale-95'
                      }`}>
                        <h5 className="text-[10px] font-black text-white">{node.label}</h5>
                        <p className="text-[9px] text-brand-gold font-bold mt-0.5">{node.desc}</p>
                        {!bExists && (
                          <span className="text-[8px] bg-red-400/10 text-red-400 px-1 rounded block mt-1">Pending Sync</span>
                        )}
                      </div>
                    </button>
                  );
                })}

                {/* Foot indicators */}
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 pt-16 mt-auto">
                  <span>LAT: 27.0544° N // LON: 85.6429° E</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-550"></span> Online Showroom Pins Linked
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Hand: Branch selector menu listing all locations */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-extrabold pl-1 mb-2">
                Select Active Branch Coordinates
              </h4>
              
              <div className="space-y-2.5">
                {branches.map((b) => (
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

              {/* Branch Facility Showcase Hero Photo Card */}
              {currentBranch.imageUrl && (
                <div className="relative w-full h-[180px] sm:h-[230px] rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                  <img 
                    src={currentBranch.imageUrl} 
                    alt={`${currentBranch.name} Facility`} 
                    className="w-full h-full object-cover select-none transition-transform duration-75 hover:scale-101"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent flex items-end p-4">
                    <span className="bg-white/90 backdrop-blur-xs text-brand-green font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-md tracking-wider shadow-md flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping"></span>
                      Verified Sarlahi Facility Photo
                    </span>
                  </div>
                </div>
              )}

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

        {/* ================= SECTION 5: DEALER ADMINISTRATIVE CRM PANEL ================= */}
        {isAdmin && (
          <section id="section-admin" className="scroll-mt-24">
            <DealerAdmin />
          </section>
        )}

        {/* ================= SECTION: MESSAGE FROM THE DIRECTOR ================= */}
        <section id="section-director" className="scroll-mt-24">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-150 shadow-xs relative overflow-hidden">
            {/* Subtle high-contrast decoration wrapper */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-brand-green/5 rounded-full filter blur-3xl -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Director photo and badge */}
              <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-44 h-44 rounded-2xl overflow-hidden shadow-md border border-gray-200">
                    <img 
                      src={dealershipInfo.directorPhotoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'} 
                      alt={dealershipInfo.directorName || 'Siddha Bahadur Sapkota'}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-brand-green text-white font-extrabold text-[9px] uppercase px-3 py-1 rounded-full shadow-md tracking-wider whitespace-nowrap">
                    Managing Director
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="font-extrabold text-gray-900 text-sm tracking-tight">{dealershipInfo.directorName || 'Siddha Bahadur Sapkota'}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{dealershipInfo.directorTitle || 'Founder & Managing Director'}</p>
                  <div className="flex justify-center gap-1.5 mt-2">
                    <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black uppercase">Established 2011</span>
                    <span className="text-[9px] bg-brand-green/10 text-brand-green px-2 py-0.5 rounded font-black uppercase">Lalbandi Hub</span>
                  </div>
                </div>
              </div>

              {/* Message content */}
              <div className="md:col-span-8 space-y-5">
                <span className="text-brand-green text-[10px] font-black uppercase tracking-widest bg-brand-green-light px-3.5 py-1.5 rounded-full border border-brand-green/15 inline-block">
                  ✉️ Corporate Executive Greeting
                </span>
                
                <h3 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
                  Message from the Managing Director
                </h3>
                
                <div className="relative">
                  {/* Large quote marks styled minimally */}
                  <span className="absolute -top-6 -left-3 text-6xl text-brand-green/10 font-serif pointer-events-none">“</span>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic font-medium relative z-10 whitespace-pre-line">
                    {dealershipInfo.directorMessage || 'Namaste! At Om Siddhababa Enterprises, our vision has always been to drive growth and self-employment in local communities across Sarlahi and Madhesh Province. By offering the reliable, low-maintenance Piaggio Ape lineup along with custom low-downpayment bank solutions, we ensure that every driver can confidently start building their financial independence with a top-class vehicle.'}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal pt-4">
                    We remain dedicated to bringing the latest zero-emission lithium electric three-wheelers directly to your neighborhood showroom. Feel free to use our live automated loan calculator or chat with our automated support agent above to explore your tailored ownership plan. Together, let us power the future of transportation in Sarlahi!
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="text-[11px] text-gray-400 font-bold shrink-0 uppercase tracking-widest flex items-center gap-1">
                    <span>Authorized Piaggio Network Signature</span>
                  </div>
                  <div className="h-px bg-gray-100 flex-1"></div>
                  <div className="font-serif italic text-sm text-gray-500 tracking-wider">
                    S. Sapkota
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SISTER CONCERNS & GROUP VENTURES BENTO BOX ================= */}
        <div id="section-sister-companies" className="space-y-6">
          <div className="text-center sm:text-left space-y-1.5 max-w-4xl">
            <span className="text-brand-green text-[9px] font-black uppercase tracking-widest bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
              🌐 Sapkota Conglomerate Group
            </span>
            <h4 className="font-black text-slate-900 text-2xl tracking-tight">Sister Concerns & Joint Ventures</h4>
            <p className="text-[11px] text-gray-500 font-semibold font-sans">Under the strategic management of Managing Director S. Sapkota, our joint ventures operate across vital agricultural, commercial fuel, and heavy construction sectors of Madhesh Province.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Om Siddhababa Agro Pvt. Ltd.",
                slogan: "Precision farming, high-yield greenhouses, and modern organic crop distributions in Sarlahi district.",
                badge: "🌱 Agriculture",
                badgeColor: "bg-emerald-105 text-emerald-800",
                image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600"
              },
              {
                name: "Siddhababa Builders & Heavy Equipment",
                slogan: "Suppliers of heavy diesel excavators, concrete dumpers, and logistics transit supporting municipal roads.",
                badge: "🚧 Infrastructure",
                badgeColor: "bg-amber-105 text-amber-850",
                image: "https://images.unsplash.com/photo-1541625602330-2277a4c4b080?auto=format&fit=crop&q=80&w=600"
              },
              {
                name: "Siddhababa Petroleum & Energy Hub",
                slogan: "High-density petrol pumps, clean fuel depots, and smart swappable electric vehicle recharging terminals.",
                badge: "⚡ Energy & Fuels",
                badgeColor: "bg-blue-105 text-blue-800",
                image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600"
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  handleQuickQuestion(`Tell me about your sister venture: ${item.name}.`);
                  showToast(`Consulting details for ${item.name}!`);
                }}
                className="group bg-white hover:bg-slate-50/50 rounded-2xl overflow-hidden border border-gray-150 shadow-2xs hover:shadow-md hover:border-brand-green/30 transition-all cursor-pointer text-left flex flex-col justify-between"
              >
                <div className="aspect-video relative overflow-hidden bg-gray-200 shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className={`absolute top-3 left-3 text-[9px] font-black uppercase px-2.5 py-1 rounded-md shadow-xs ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                <div className="p-4 space-y-1 bg-white flex-grow">
                  <h5 className="font-extrabold text-[13px] text-slate-900 group-hover:text-brand-green transition-colors leading-tight">
                    {item.name}
                  </h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                    {item.slogan}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* ================= HIGH GRAPHICAL QUALITY INTEGRATION: FREE FLOWING PARTNERS MARQUEE ================= */}
      <div className="bg-slate-900 border-y border-slate-800 py-10 overflow-hidden relative mt-16">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <span className="text-brand-gold text-[10px] font-black uppercase tracking-widest bg-brand-gold/10 px-3 py-1.5 rounded-full border border-brand-gold/20 inline-block">
            🤝 Strategic Alliances & Brand Partners
          </span>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            Authorized partnerships with heavy manufacturers, elite enterprise groups, & micro-finance systems
          </p>
        </div>

        {/* Free Flowing Infinite Moving Marquee Layout */}
        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-12 animate-marquee">
            {/* Set 1 */}
            <div className="flex justify-around gap-12 w-1/2">
              {[
                { name: 'CG Enterprise', logo: 'Chaudhary Group', slogan: 'Authorized Sarlahi EV Partner', badge: 'CG' },
                { name: 'TATA Motors', logo: 'Tata Commercial', slogan: 'Chassis Manufacturing Systems', badge: 'TATA' },
                { name: 'Piaggio India', logo: 'Piaggio Vehicles', slogan: 'Official 3-Wheel Franchise', badge: 'PIAGGIO' },
                { name: 'Siddhartha Finance', logo: 'Siddhartha Corp', slogan: 'Direct Loan EMI Program', badge: 'SFL' },
                { name: 'Nabil Bank', logo: 'Nabil Commercial', slogan: 'Instant Credit Approval', badge: 'NABIL' },
                { name: 'Prime Bank', logo: 'Prime Savings', slogan: 'Low-Downpayment Program', badge: 'PRIME' }
              ].map((partner, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    handleQuickQuestion(`Tell me about your partnership program with ${partner.name}.`);
                    showToast(`Consulting partnership status for ${partner.name}!`);
                  }}
                  className="bg-slate-950/80 border border-slate-850 px-6 py-4.5 rounded-2xl flex items-center gap-3.5 shrink-0 hover:border-brand-gold hover:bg-slate-950 transition-all cursor-pointer backdrop-blur-xs min-w-[240px]"
                >
                  <div className="w-10 h-10 bg-brand-green/10 border border-brand-green/35 rounded-xl flex items-center justify-center font-black text-xs text-brand-gold shrink-0">
                    {partner.badge}
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-xs text-white tracking-tight">{partner.logo}</h4>
                    <p className="text-[9px] text-slate-500 font-extrabold">{partner.slogan}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Set 2 (exact duplicate for seamless wrap) */}
            <div className="flex justify-around gap-12 w-1/2">
              {[
                { name: 'CG Enterprise', logo: 'Chaudhary Group', slogan: 'Authorized Sarlahi EV Partner', badge: 'CG' },
                { name: 'TATA Motors', logo: 'Tata Commercial', slogan: 'Chassis Manufacturing Systems', badge: 'TATA' },
                { name: 'Piaggio India', logo: 'Piaggio Vehicles', slogan: 'Official 3-Wheel Franchise', badge: 'PIAGGIO' },
                { name: 'Siddhartha Finance', logo: 'Siddhartha Corp', slogan: 'Direct Loan EMI Program', badge: 'SFL' },
                { name: 'Nabil Bank', logo: 'Nabil Commercial', slogan: 'Instant Credit Approval', badge: 'NABIL' },
                { name: 'Prime Bank', logo: 'Prime Savings', slogan: 'Low-Downpayment Program', badge: 'PRIME' }
              ].map((partner, idx) => (
                <div 
                  key={idx + 10} 
                  onClick={() => {
                    handleQuickQuestion(`Tell me about your partnership program with ${partner.name}.`);
                    showToast(`Consulting partnership status for ${partner.name}!`);
                  }}
                  className="bg-slate-950/80 border border-slate-850 px-6 py-4.5 rounded-2xl flex items-center gap-3.5 shrink-0 hover:border-brand-gold hover:bg-slate-950 transition-all cursor-pointer backdrop-blur-xs min-w-[240px]"
                >
                  <div className="w-10 h-10 bg-brand-green/10 border border-brand-green/35 rounded-xl flex items-center justify-center font-black text-xs text-brand-gold shrink-0">
                    {partner.badge}
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-xs text-white tracking-tight">{partner.logo}</h4>
                    <p className="text-[9px] text-slate-500 font-extrabold">{partner.slogan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
              <img src={activeLightbox.imageUrl} alt={activeLightbox.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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

      {/* STAFF AUTH DESK OVERLAY */}
      {adminLoginOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 border border-gray-150 shadow-2xl max-w-sm w-full relative space-y-6">
            <button 
              onClick={() => setAdminLoginOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-14 h-14 bg-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center shadow-inner">
              <Star className="w-7 h-7 text-brand-green animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div className="space-y-1.5 text-left">
              <h3 className="text-xl font-black text-gray-950 tracking-tight">Staff Authentication Desk</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Enter your administrative passcode to mount the corporate customizer, live inquiries list, and fleet KPIs database.
              </p>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (adminPassInput.toLowerCase() === 'siddhababa' || adminPassInput === 'admin') {
                  setIsAdmin(true);
                  localStorage.setItem('siddhababa_is_admin', 'true');
                  setAdminLoginOpen(false);
                  setActiveTab('admin');
                  showToast('✓ Welcome back, Administrator! Dashboards successfully synchronized.');
                  setTimeout(() => {
                    document.getElementById('section-admin')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 300);
                } else {
                  setAdminLoginError('Invalid administrative passkey. Access denied.');
                }
              }} 
              className="space-y-4 text-left"
            >
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
                  Security Passkey Protocol
                </label>
                <input 
                  type="password"
                  value={adminPassInput}
                  onChange={(e) => {
                    setAdminPassInput(e.target.value);
                    setAdminLoginError('');
                  }}
                  required
                  placeholder="e.g. siddhababa"
                  className="w-full text-xs font-semibold px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green text-gray-850"
                  autoFocus
                />
              </div>
              {adminLoginError && (
                <p className="text-[10px] text-red-650 font-black">{adminLoginError}</p>
              )}
              <button
                type="submit"
                className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-md"
              >
                Unlock Administrator Access
              </button>
            </form>
            <div className="pt-2 border-t border-gray-100 flex items-center gap-1 justify-center text-[10px] text-gray-400 font-semibold font-sans">
              <span>Demo secret passkey is</span>
              <code className="bg-gray-100 text-brand-green px-1.5 py-0.5 rounded font-mono font-bold">siddhababa</code>
            </div>
          </div>
        </div>
      )}

      {/* 5. FOOTER */}
      <footer className="bg-slate-905 mt-24 border-t border-gray-200 py-16 text-center text-xs space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Relocated and integrated notification info widget */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white text-[11px] font-bold py-4 px-6 rounded-3xl shadow-md border border-brand-green/20 flex flex-col md:flex-row justify-between items-center gap-4 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 flex-wrap font-semibold">
            <span className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0 animate-bounce" style={{ animationDuration: '3s' }} />
              <span className="leading-relaxed">{dealershipInfo.headOfficeAddress}</span>
            </span>
            <span className="hidden md:inline-block h-4 w-px bg-white/10"></span>
            <span className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Hotline support: {dealershipInfo.headOfficePhone}</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
            <span className="bg-brand-green/25 text-brand-gold font-black px-2.5 py-1 rounded-lg text-[9px] uppercase tracking-widest border border-brand-gold/25 shrink-0">
              Authorized Piaggio Dealer Nepal
            </span>
            <button
              onClick={() => setAiOpen(true)}
              className="text-brand-gold hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-extrabold transition-all cursor-pointer border border-brand-gold/10 text-[10.5px]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
              <span>Ask Siddhababa AI</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-gray-400 font-extrabold uppercase tracking-widest">
            OM SIDDHABABA ENTERPRISES PRIVATE LIMITED
          </p>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold max-w-lg mx-auto">
            Authorized Piaggio commercial vehicle dealership. Centered at East-West Highway, Lalbandi, Sarlahi District, Nepal. Servicing cargo drivers, passenger auto rickshaws, and smart swappable LFP battery fleets across Madhesh Province.
          </p>
          <p className="text-[10px] text-gray-400 pt-3">
            © 2026 Om Siddhababa Enterprises. All Rights Reserved by nepxcreation.
          </p>
        </div>
      </footer>

    </div>
  );
}
