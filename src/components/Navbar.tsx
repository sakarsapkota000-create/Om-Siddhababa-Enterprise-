import React from 'react';
import { Truck, MapPin, Phone, MessageSquare, Terminal } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenConsultant: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenConsultant }: NavbarProps) {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'finance', label: 'Finance & EMI' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md border-b border-gray-100">
      {/* Top Banner with Location and Call to Action */}
      <div className="bg-brand-green text-white py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>Mandev Marg, Kathmandu, Nepal</span>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>+977-1-4567890 / 9851123456</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-brand-green-dark text-brand-gold font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              Authorized Piaggio Dealer
            </span>
            <button
              onClick={onOpenConsultant}
              className="text-white hover:text-brand-gold flex items-center gap-1 font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-brand-gold" />
              <span>Talk to Siddhababa AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Representation */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 bg-brand-green text-white rounded-xl flex items-center justify-center shadow-md">
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
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-brand-green text-white shadow-sm'
                    : 'text-gray-600 hover:text-brand-green hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Spacer */}
          <div className="h-6 w-px bg-gray-200 hidden lg:block"></div>

          {/* Quick Buttons */}
          <button
            onClick={() => setActiveTab('admin')}
            id="nav-admin"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
            }`}
            title="Dealer Leads Dashboard"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="sm:inline">Dealer Board</span>
          </button>

          <a
            href="tel:+9779851123456"
            className="hidden sm:flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-4 py-2 rounded-lg text-xs shadow-md transition-all active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            <span>Call Dealership</span>
          </a>
        </div>
      </div>

      {/* Mobile Nav Sub-menu */}
      <div className="lg:hidden bg-gray-50 border-t border-gray-100 flex items-center overflow-x-auto whitespace-nowrap px-4 py-2 gap-1.5 no-scrollbar scroll-smooth">
        {menuItems.map((item) => (
          <button
            key={item.id}
            id={`m-nav-${item.id}`}
            onClick={() => setActiveTab(item.id)}
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
