/**
 * Type declarations for Om Siddhababa Enterprises
 */

export interface Vehicle {
  id: string;
  name: string;
  category: 'passenger' | 'cargo' | 'electric';
  tagline: string;
  image: string;
  fuelType: 'Electric' | 'Petrol' | 'Diesel' | 'LPG' | 'CNG';
  priceRange: string; // Price in Nepalese Rupees (NPR)
  approxPriceNPR: number; // For calculation
  specs: {
    engine?: string;
    batteryCapacity?: string; // For EV
    chargingTime?: string; // For EV
    range?: string; // For EV
    runningCost?: string; // For EV
    mileage?: string;
    seatingCapacity?: string;
    payloadCapacity?: string; // For Cargo
    cargoDimensions?: string; // For Cargo
    power?: string;
    torque?: string;
  };
  features: string[];
  applications?: string[]; // For Cargo/Fleet
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  vehicleInterest: string;
  location: string;
  message: string;
  status: 'Pending' | 'Contacted' | 'Quotation Sent' | 'Scheduled' | 'Sold';
  submittedAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Commercial Vehicles' | 'Electric Mobility' | 'Business Growth' | 'Finance';
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  image: string;
}

export interface PartnerBank {
  name: string;
  logo: string; // CSS-based avatar or design
  maxFinancing: string;
  interestRate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
