import React from 'react';
import { Truck, MapPin, Phone, MessageSquare } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenConsultant: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenConsultant }: NavbarProps) {
  const menuItems = [
    { id: 'home', label: 'Home & Welcome' },
    { id: 'finance', label: 'Loan EMI Calculator' },
    { id: 'gallery', label: 'Showroom Gallery' },
    { id: 'branches', label: 'Our Branches (Lalbandi & Others)' },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs border-b border-gray-100">
      {/* Top Banner with Location and Call to Action */}
      <div className="bg-brand-green text-white py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>East-West Highway, Lalbandi-1, Sarlahi, Nepal</span>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>+977-46-50123 / 9854011122</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-brand-green-dark text-brand-gold font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              Authorized Piaggio Dealer
            </span>
            <button
              onClick={onOpenConsultant}
              className="text-white hover:text-brand-gold flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
              <span>Ask Siddhababa AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Representation */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabClick('home')}>
          <div className="w-10 h-10 bg-brand-green text-white rounded-xl flex items-center justify-center shadow-xs">
            <Truck className="w-6 h-6 text-brand-gold" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-gray-900 leading-tight tracking-tight">
              OM SIDDHABABA <span className="text-brand-green">ENTERPRISES</span>
            </h1>
            <p className="text-[10px] text-gray-500 tracking-widest uppercase font-bold leading-none">
              Piaggio Commercial Vehicle Dealer
            </p>
          </div>
        </div>

        {/* Action and Navigation Toggles */}
        <div className="flex items-center gap-1 md:gap-4">
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`px-3 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-brand-green text-white shadow-xs'
                    : 'text-gray-600 hover:text-brand-green hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Spacer */}
          <div className="h-6 w-px bg-gray-200 hidden lg:block"></div>

          <a
            href="tel:+9779854011122"
            className="hidden sm:flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-4 py-2 rounded-lg text-xs shadow-xs transition-all active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            <span>Call Lalbandi Main Hub</span>
          </a>
        </div>
      </div>

      {/* Mobile Nav Sub-menu */}
      <div className="lg:hidden bg-gray-50 border-t border-gray-100 flex items-center overflow-x-auto whitespace-nowrap px-4 py-2 gap-1.5 no-scrollbar scroll-smooth">
        {menuItems.map((item) => (
          <button
            key={item.id}
            id={`m-nav-${item.id}`}
            onClick={() => handleTabClick(item.id)}
            className={`inline-block px-3 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
              activeTab === item.id
                ? 'bg-brand-green text-white shadow-xs'
                : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
