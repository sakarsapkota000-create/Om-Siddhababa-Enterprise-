import React, { useState, useEffect } from 'react';
import { PARTNER_BANKS, VEHICLES } from '../data';
import { Vehicle, PartnerBank } from '../types';
import { Calculator, ShieldCheck, FileText, CheckCircle, Percent, ArrowRight, Zap } from 'lucide-react';

interface EMICalculatorProps {
  initialVehiclePrice?: number;
  initialVehicleId?: string;
  onOpenInquiry: (vehicleId: string) => void;
  vehiclesList?: Vehicle[];
  partnerBanksList?: PartnerBank[];
}

export default function EMICalculator({ 
  initialVehiclePrice, 
  initialVehicleId, 
  onOpenInquiry,
  vehiclesList,
  partnerBanksList
}: EMICalculatorProps) {
  const vList = vehiclesList && vehiclesList.length > 0 ? vehiclesList : VEHICLES;
  const bList = partnerBanksList && partnerBanksList.length > 0 ? partnerBanksList : PARTNER_BANKS;

  // Let user pick a vehicle or choose custom price
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(initialVehicleId || vList[0]?.id || 'custom');
  const [vehiclePrice, setVehiclePrice] = useState<number>(initialVehiclePrice || vList[0]?.approxPriceNPR || 400000);
  
  // Financial Sliders
  const [downpaymentPct, setDownpaymentPct] = useState<number>(30); // Min 30% default
  const [interestRate, setInterestRate] = useState<number>(9.5); // Standard
  const [tenureMonths, setTenureMonths] = useState<number>(36); // 3 Years standard

  // Sync vehicle price when selected vehicle changes
  useEffect(() => {
    const veh = vList.find(v => v.id === selectedVehicleId);
    if (veh) {
      setVehiclePrice(veh.approxPriceNPR);
    }
  }, [selectedVehicleId, vList]);

  // Read initial properties on mount
  useEffect(() => {
    if (initialVehiclePrice) {
      setVehiclePrice(initialVehiclePrice);
    }
    if (initialVehicleId) {
      setSelectedVehicleId(initialVehicleId);
    }
  }, [initialVehiclePrice, initialVehicleId]);

  // Derived Financial variables
  const downpaymentAmt = Math.round((vehiclePrice * downpaymentPct) / 100);
  const loanAmount = vehiclePrice - downpaymentAmt;

  // EMI Math Formula
  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const payments = tenureMonths;

    if (monthlyRate === 0) return principal / payments;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
                (Math.pow(1 + monthlyRate, payments) - 1);
    return Math.round(emi);
  };

  const emiVal = calculateEMI();
  const totalAmountPayable = emiVal * tenureMonths;
  const totalInterestPayable = totalAmountPayable - loanAmount;

  // EV Cost vs Petrol Payback Calculator
  const currentVehicle = vList.find(v => v.id === selectedVehicleId);
  const isEV = currentVehicle?.category === 'electric';

  // Helper formatter for Nepalese currency style
  const formatNPR = (num: number) => {
    return 'NPR ' + num.toLocaleString('en-NP');
  };

  return (
    <div className="space-y-12">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-brand-green to-slate-900 text-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="bg-brand-gold text-slate-900 font-bold px-2.5 py-1 rounded-full text-xs uppercase tracking-wider">
            Finance & EMI Planner
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Flexible Commercial Vehicle Loans in Nepal
          </h2>
          <p className="text-gray-200 max-w-xl text-sm leading-relaxed">
            We partner with Nepal's leading banks to arrange fast commercial transport financing. Calculate your EMI and evaluate payback timelines dynamically.
          </p>
        </div>
        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-3">
          <Calculator className="w-10 h-10 text-brand-gold" />
          <div className="text-xs">
            <p className="font-bold">Min. Downpayment Needed</p>
            <p className="text-lg font-black text-brand-gold">Starting from 30%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Middle Column: Interactive Inputs & Outputs */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
              <Calculator className="w-5 h-5 text-brand-green" />
              <span>Configure Your Loan Plan</span>
            </h3>

            {/* Vehicle Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                  Select Piaggio Vehicle Model
                </label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-brand-green"
                >
                  {vList.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.fuelType})
                    </option>
                  ))}
                  <option value="custom-input">Custom Setup / Other Spec</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                  Vehicle Price (Approx. NPR)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-12 py-3 text-sm font-bold text-gray-800 focus:outline-none focus:border-brand-green"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                    NPR
                  </div>
                </div>
              </div>
            </div>

            {/* Sliders Block */}
            <div className="space-y-6 pt-4">
              {/* Downpayment Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-700 flex items-center gap-1">
                    Downpayment Percentage:
                    <strong className="text-brand-green">{downpaymentPct}%</strong>
                  </span>
                  <span className="text-xs font-bold text-gray-500">
                    {formatNPR(downpaymentAmt)}
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="80"
                  step="5"
                  value={downpaymentPct}
                  onChange={(e) => setDownpaymentPct(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-green"
                />
                <p className="text-[10px] text-amber-600 font-medium">
                  *Nepalese banks require a minimum 30% deposit for commercial vehicles.
                </p>
              </div>

              {/* Interest Rate Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-700 flex items-center gap-1">
                    Annual Interest Rate:
                    <strong className="text-brand-green">{interestRate}%</strong>
                  </span>
                  <span className="text-xs font-semibold text-gray-400">Market Rate: 8% - 14%</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="15"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-green"
                />
              </div>

              {/* Tenure Button selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Loan Tenure (Repayment Duration)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[12, 24, 36, 48, 60].map((months) => (
                    <button
                      key={months}
                      onClick={() => setTenureMonths(months)}
                      className={`py-2 px-1 text-xs sm:text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                        tenureMonths === months
                          ? 'border-brand-green bg-brand-green text-white'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      {months / 12} {months / 12 === 1 ? 'Year' : 'Years'} ({months}m)
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Business Revenue Feasibility (EV vs Petrol) */}
          {isEV && (
            <div className="bg-brand-green-light border border-brand-green/20 p-6 rounded-2xl space-y-4">
              <h4 className="font-bold text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-brand-green animate-bounce" />
                <span>Green Financing Payback Benefits</span>
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                By purchasing an electric Piaggio under our <strong>EV Financing Scheme</strong>, your business saves approximately <strong>NPR 500+ every single day</strong> in fuel and filter maintenance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-3 rounded-xl border border-brand-green/10 text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Estimated Monthly Fuel Savings</p>
                  <p className="text-lg font-extrabold text-brand-green">~NPR 13,000</p>
                  <p className="text-[10px] text-gray-500">Based on 100km daily drive</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-brand-green/10 text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Net EMI Paid vs Fuel Savings</p>
                  <p className="text-lg font-extrabold text-amber-700">
                    {emiVal < 13000 ? 'Self-Financed' : formatNPR(Math.max(0, emiVal - 13000))}
                  </p>
                  <p className="text-[10px] text-gray-500">Savings offsets most of your EMI!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Calculations & CTA */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 space-y-6 flex flex-col justify-between">
            <h3 className="text-md font-bold uppercase text-brand-gold tracking-widest text-center border-b border-white/10 pb-4">
              Estimated Monthly Payment
            </h3>

            {/* Main EMI Figure */}
            <div className="text-center py-4 space-y-1">
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">Your Monthly EMI</span>
              <span className="text-3xl font-black text-white tracking-tight">{formatNPR(emiVal)}</span>
              <span className="text-xs text-brand-green-light font-medium block">For {tenureMonths} Months</span>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3.5 text-xs border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-400">On-Road Vehicle Price:</span>
                <span className="font-bold text-white">{formatNPR(vehiclePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Downpayment Amount:</span>
                <span className="font-bold text-white">{formatNPR(downpaymentAmt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Financed Loan Principal:</span>
                <span className="font-bold text-white">{formatNPR(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Cumulative Interest:</span>
                <span className="font-bold text-brand-gold">{formatNPR(totalInterestPayable)}</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-white/10 pt-2 text-sm font-bold">
                <span className="text-gray-300">Total Amount Repaid:</span>
                <span className="text-white">{formatNPR(totalAmountPayable)}</span>
              </div>
            </div>

            {/* Quick Action */}
            <button
              onClick={() => onOpenInquiry(selectedVehicleId)}
              className="w-full mt-4 bg-brand-green hover:bg-brand-green-dark text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <span>Apply for Finance Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Selected Vehicle Showcase & Spotlight Card */}
          {currentVehicle && (
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm transition-all duration-300 space-y-4">
              <div className="aspect-video relative bg-slate-100 overflow-hidden group">
                <img 
                  src={
                    currentVehicle.imageUrl || 
                    (currentVehicle.image && (currentVehicle.image.startsWith('http') || currentVehicle.image.startsWith('/src') || currentVehicle.image.startsWith('data:'))) 
                      ? (currentVehicle.imageUrl || currentVehicle.image) 
                      : (
                        currentVehicle.image === 'passenger-auto' ? 'https://images.unsplash.com/photo-1561124638-c521c35ca02a?auto=format&fit=crop&q=80&w=800' :
                        currentVehicle.image === 'electric-passenger' ? 'https://images.unsplash.com/photo-1558442074-3c19857bc1f3?auto=format&fit=crop&q=80&w=800' :
                        currentVehicle.image === 'cargo-diesel' ? 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=800' :
                        currentVehicle.image === 'electric-cargo' ? 'https://images.unsplash.com/photo-1596898516084-5f1188d5e985?auto=format&fit=crop&q=80&w=800' :
                        `https://picsum.photos/seed/${currentVehicle.id}/800/600`
                      )
                  }
                  alt={currentVehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback for broken custom urls
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${currentVehicle.id}/800/600`;
                  }}
                />
                
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-[9px] font-black uppercase text-brand-gold px-2.5 py-1 rounded-md border border-white/10 tracking-wider">
                  {currentVehicle.category}
                </div>
                
                <div className="absolute bottom-3 right-3 bg-brand-green text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md shadow-xs">
                  {currentVehicle.fuelType}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-gray-900 group-hover:text-brand-green transition-colors">
                    {currentVehicle.name}
                  </h4>
                  <p className="text-[11px] text-gray-550 leading-relaxed font-semibold">
                    {currentVehicle.tagline}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] border-t border-gray-100">
                  {currentVehicle.specs?.engine && (
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <p className="text-gray-400 font-bold uppercase text-[8px]">Engine Power</p>
                      <p className="text-gray-700 font-extrabold truncate">{currentVehicle.specs.engine}</p>
                    </div>
                  )}
                  {currentVehicle.specs?.batteryCapacity && (
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <p className="text-gray-400 font-bold uppercase text-[8px]">Battery Pack</p>
                      <p className="text-gray-700 font-extrabold truncate">{currentVehicle.specs.batteryCapacity}</p>
                    </div>
                  )}
                  {currentVehicle.specs?.range && (
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <p className="text-gray-400 font-bold uppercase text-[8px]">Est. Range</p>
                      <p className="text-gray-700 font-extrabold truncate">{currentVehicle.specs.range}</p>
                    </div>
                  )}
                  {currentVehicle.specs?.payloadCapacity && (
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <p className="text-gray-400 font-bold uppercase text-[8px]">Max Payload</p>
                      <p className="text-gray-700 font-extrabold truncate">{currentVehicle.specs.payloadCapacity}</p>
                    </div>
                  )}
                  {currentVehicle.specs?.seatingCapacity && (
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <p className="text-gray-400 font-bold uppercase text-[8px]">Seating Cap.</p>
                      <p className="text-gray-700 font-extrabold truncate">{currentVehicle.specs.seatingCapacity}</p>
                    </div>
                  )}
                  {currentVehicle?.priceRange && (
                    <div className="bg-brand-green-light/40 col-span-2 p-2 rounded-lg text-center font-black text-brand-green tracking-wide">
                      Showroom Price: {currentVehicle.priceRange}
                    </div>
                  )}
                </div>

                {currentVehicle.features && currentVehicle.features.length > 0 && (
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[9px] font-black uppercase text-gray-400 mb-1.5 tracking-wider">Premium Custom Features</p>
                    <div className="flex flex-wrap gap-1">
                      {currentVehicle.features.slice(0, 3).map((feat, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Security Badge */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
            <ShieldCheck className="w-10 h-10 text-brand-green flex-shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-gray-800">100% Secure Assistance</p>
              <p className="text-gray-500">We assist you through complete documentation vetting without hidden charges.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Nepal Partner Banks */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 text-center tracking-tight">
          Our Partner Finance Banks in Nepal
        </h3>
        <p className="text-center text-xs text-gray-500 max-w-xl mx-auto">
          We have strategic tie-ups with leading Nepalese institutions to offer priority approvals, low documentation hurdles, and preferential commercial loan schemes.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bList.map((bank, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all text-center space-y-3"
            >
              {/* Partner bank logo image or stylized initials */}
              <div className="w-12 h-12 bg-slate-100 text-slate-700 font-extrabold text-sm rounded-full flex items-center justify-center mx-auto border-2 border-brand-green overflow-hidden">
                {bank.logoUrl ? (
                  <img 
                    src={bank.logoUrl} 
                    alt={bank.name} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      // fallback to text inside a newly created or styled layout
                    }}
                  />
                ) : (
                  bank.logo
                )}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm leading-tight">{bank.name}</h4>
                <p className="text-[10px] font-bold text-brand-green uppercase tracking-wider mt-1">
                  Rate: {bank.interestRate}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">{bank.maxFinancing}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Documentation Guide */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
          <FileText className="w-5 h-5 text-brand-green" />
          <h3 className="text-lg font-bold text-gray-900">Required Bank Documentation in Nepal</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <h4 className="font-bold text-brand-green text-xs uppercase tracking-wider">For Individuals (Self-Employed)</h4>
            <ul className="space-y-2 text-gray-600 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Copy of Nepalese Citizenship Certificate</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Passport size photographs of applicant & guarantor</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Land ownership document (Lal-Purja) copy for mortgage base</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>6 Months recent personal or business bank statements</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-brand-green text-xs uppercase tracking-wider">For Registered Businesses / Firms</h4>
            <ul className="space-y-2 text-gray-600 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Firm/Company registration license under Nepal government</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Copy of PAN (Permanent Account Number) or VAT certificate</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Audit reports / projected profit and loss statement (for multi-vehicle loans)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Board of directors resolution authorizing commercial vehicle purchase loan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
