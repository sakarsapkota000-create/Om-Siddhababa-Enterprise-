import React, { useState } from 'react';
import { Truck, MapPin, Phone, MessageSquare, Sliders, Lock, Unlock, HelpCircle, User, Star, Menu, X } from 'lucide-react';

interface DealershipInfo {
  companyName: string;
  subtitle: string;
  headOfficeAddress: string;
  headOfficePhone: string;
  headOfficeEmail: string;
  hotlineUrl: string;
  footerText: string;
  companyLogoUrl?: string;
  heroBannerUrl?: string;
}

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenConsultant: () => void;
  dealershipInfo?: DealershipInfo;
  isAdmin: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenConsultant, 
  dealershipInfo, 
  isAdmin, 
  onOpenLogin, 
  onLogout 
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentInfo = dealershipInfo || {
    companyName: 'OM SIDDHABABA ENTERPRISES',
    subtitle: 'Piaggio Commercial Vehicle Dealer',
    headOfficeAddress: 'East-West Highway, Lalbandi-1, Sarlahi, Nepal',
    headOfficePhone: '+977-46-50123 / 9854011122',
    headOfficeEmail: 'info@omsiddhababa.com',
    hotlineUrl: 'tel:+9779854011122',
    footerText: 'Authorized Piaggio commercial vehicle dealership.'
  };

  // Regular user menu items
  const menuItems = [
    { id: 'home', label: 'Home & Welcome' },
    { id: 'finance', label: 'Loan EMI Calculator' },
    { id: 'gallery', label: 'Showroom Gallery' },
    { id: 'branches', label: 'Our Branch Network' },
  ];

  // Admin-only menu items appended dynamically
  const adminMenuItems = [
    { id: 'customizer', label: 'Website Customizer', icon: <Sliders className="w-3.5 h-3.5" /> },
    { id: 'admin', label: 'Admin Command Center', icon: <Lock className="w-3.5 h-3.5 text-brand-gold animate-pulse" /> }
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const mainPhone = currentInfo.headOfficePhone.split(' / ')[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
      {/* Main Premium header layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Authentic Brand Emblem and Text */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => handleTabClick('home')}
          title="Om Siddhababa Enterprises"
        >
          <div className="w-11 h-11 bg-brand-green hover:rotate-6 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border border-brand-green/20 transition-all duration-300">
            {currentInfo.companyLogoUrl ? (
              <img 
                src={currentInfo.companyLogoUrl} 
                alt="Logo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Truck className="w-6 h-6 text-brand-gold" />
            )}
          </div>
          <div className="space-y-0.5 select-none">
            <h1 className="text-sm sm:text-base md:text-[18px] font-black text-gray-950 tracking-tight leading-none uppercase flex items-center gap-2">
              <span className="bg-gradient-to-r from-slate-900 to-brand-green bg-clip-text text-transparent">{currentInfo.companyName}</span>
            </h1>
            <p className="text-[9px] text-brand-green tracking-[0.25em] uppercase font-black pl-8.5">
              {currentInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Desktop Central Navigation Links */}
        <div className="flex items-center gap-1.5 md:gap-4">
          <nav className="hidden lg:flex items-center gap-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`px-3 py-2 text-xs font-black rounded-xl transition-all duration-300 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-brand-green text-white shadow-md shadow-brand-green/10'
                    : 'text-gray-650 hover:text-brand-green hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Render customizable keys option only if staff has unlocked with administrative passcodes */}
            {isAdmin && adminMenuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`px-3 py-2 text-xs font-black rounded-xl transition-all duration-300 flex items-center gap-1.5 border border-amber-500/20 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-amber-500/10 text-amber-800 hover:bg-amber-500/20'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Spacer */}
          <div className="h-6 w-px bg-gray-200 hidden lg:block mx-1"></div>

          {/* Administrative Gate Switch Toggles */}
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <button 
                onClick={onLogout}
                className="bg-slate-900 border border-slate-750 text-white rounded-xl text-xs font-bold px-3 py-2 flex items-center gap-1.5 cursor-pointer hover:bg-red-950 hover:text-red-300 transition-colors"
                title="Log Out Administrator Desk"
              >
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Lock Admin</span>
              </button>
            ) : (
              <button 
                onClick={onOpenLogin}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-extrabold p-2 sm:px-3 sm:py-2 flex items-center gap-1.5 cursor-pointer transition-colors border border-gray-200"
                title="Operational Personnel Login"
              >
                <Lock className="w-3.5 h-3.5 text-gray-500" />
                <span className="hidden sm:inline">Staff</span>
              </button>
            )}

            <a
              href={currentInfo.hotlineUrl || `tel:${mainPhone}`}
              className="bg-brand-green hover:bg-brand-green-dark text-white font-black px-4.5 py-2 rounded-xl text-xs shadow-md hover:shadow-lg hover:shadow-brand-green/20 transition-all cursor-pointer active:scale-95 flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span className="hidden md:inline">Call Dealership</span>
            </a>

            {/* Mobile menu responsive toggler button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 bg-gray-100 rounded-xl border border-gray-200 hover:bg-gray-200 cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-150 absolute top-[100%] left-0 w-full shadow-xl p-4 animate-fade-in divide-y divide-gray-100">
          <div className="py-2 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left px-4 py-2.5 text-sm font-bold rounded-xl transition-all block ${
                  activeTab === item.id
                    ? 'bg-brand-green text-white shadow-sm'
                    : 'text-gray-750 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {isAdmin && adminMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left px-4 py-2.5 text-sm font-black rounded-xl transition-all border border-amber-500/10 flex items-center gap-2 ${
                  activeTab === item.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-500/5 text-amber-900 hover:bg-amber-500/15'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="py-3 flex flex-col gap-2">
            {!isAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full justify-center bg-slate-100 text-slate-800 text-xs font-bold py-2.5 rounded-xl border border-gray-200 flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-gray-600" />
                <span>Personnel Admin Portal</span>
              </button>
            )}
            <a
              href={currentInfo.hotlineUrl || `tel:${mainPhone}`}
              className="w-full text-center bg-brand-green text-white text-xs font-black py-2.5 rounded-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>Contact Showroom Hub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
