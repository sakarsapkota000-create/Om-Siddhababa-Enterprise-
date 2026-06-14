import { Vehicle, BlogPost, PartnerBank } from './types';

export const VEHICLES: Vehicle[] = [
  {
    id: 'piaggio-ape-city',
    name: 'Piaggio Ape City',
    category: 'passenger',
    tagline: 'Nepal’s Most Loved Passenger Auto Rickshaw',
    image: 'passenger-auto',
    fuelType: 'Petrol',
    priceRange: 'NPR 4,50,000 - 4,80,000',
    approxPriceNPR: 465000,
    specs: {
      engine: '197 cc Single Cylinder, 4-Stroke, Air Cooled',
      mileage: '30-35 km/l',
      seatingCapacity: '3 + 1 (Driver)',
      power: '9.38 HP @ 5000 rpm',
      torque: '16.7 Nm @ 3000 rpm'
    },
    features: [
      'Ergonomically designed seats for passenger comfort',
      'High-clearance suspension for steep Nepalese roads',
      'Dual halogen headlamps for perfect night visibility',
      'Superior braking with dual-circuit hydraulic system',
      'Very low maintenance and easy spare parts availability'
    ]
  },
  {
    id: 'piaggio-ape-e-city',
    name: 'Piaggio Ape E-City FX',
    category: 'electric',
    tagline: 'Leading the Electric Revolution in Nepal’s Public Transport',
    image: 'electric-passenger',
    fuelType: 'Electric',
    priceRange: 'NPR 5,80,000 - 6,20,000',
    approxPriceNPR: 595000,
    specs: {
      batteryCapacity: '4.5 - 7.5 kWh Lithium-Ion (Advanced LFP)',
      chargingTime: '3.5 Hours (Standard Home Charger)',
      range: '110 km per Full Charge',
      runningCost: 'NPR 0.70 per KM (vs NPR 4.50 Petrol)',
      seatingCapacity: '3 + 1 (Driver)',
      power: '7.3 kW (Peak Power)',
      torque: '29 Nm (Instant Torque)'
    },
    features: [
      'Zero tailpipe emissions and soundless smooth drive',
      'No gears or clutch – completely fatigue-free operation',
      'Smart digital instrument cluster with battery indicators',
      'Advanced regenerative braking for extended range',
      'Boost charge capability for busy transit routes'
    ]
  },
  {
    id: 'piaggio-ape-cargo-dx',
    name: 'Piaggio Ape Cargo DX',
    category: 'cargo',
    tagline: 'Strong, Dependable, and Perfect for Hill Delivery',
    image: 'cargo-diesel',
    fuelType: 'Diesel',
    priceRange: 'NPR 5,10,000 - 5,40,000',
    approxPriceNPR: 525000,
    specs: {
      engine: '435 cc Single Cylinder, Direct Injection, Water Cooled',
      payloadCapacity: '550 kg (Durable high-tensile body)',
      cargoDimensions: '5.5 ft x 4.6 ft x 4.2 ft',
      mileage: '25-28 km/l',
      power: '8.5 HP @ 3600 rpm',
      torque: '21.0 Nm @ 2200-2400 rpm'
    },
    features: [
      'Heavy-duty constant-velocity joint drive shafts',
      'Largest cargo deck in its class for maximum load volume',
      'Deep gradeability of 22% for steep hill climbing',
      'Reinforced monocoque chassis structure',
      'Ideal for gas cylinder delivery, water bottles, and produce'
    ]
  },
  {
    id: 'piaggio-ape-e-xtra',
    name: 'Piaggio Ape E-Xtra Cargo',
    category: 'electric',
    tagline: 'The Ultimate Cost-Saving Cargo Machine for Kathmandu Businesses',
    image: 'electric-cargo',
    fuelType: 'Electric',
    priceRange: 'NPR 6,40,000 - 6,80,000',
    approxPriceNPR: 660000,
    specs: {
      batteryCapacity: '8.0 kWh Lithium-Ion (Smart Battery Management)',
      chargingTime: '3.8 Hours',
      range: '95 km per Full Charge',
      runningCost: 'NPR 0.85 per KM',
      payloadCapacity: '506 kg certified payload',
      cargoDimensions: '6.0 ft x 4.8 ft x 4.4 ft',
      power: '9.55 kW (Peak Power)',
      torque: '45 Nm (Instant high torque for slopes)'
    },
    features: [
      'Unmatched fuel savings – pay off the vehicle in under 2 years',
      'High gradeability specifically designed for bridge slopes & steep alleys',
      'Zero vibration and heat – extremely comfortable for drivers',
      'Connected telemetry app to track fleet GPS and battery health',
      'Strong, corrosion-resistant cargo deck frame'
    ]
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'best-cargo-vehicle-nepal',
    slug: 'best-cargo-vehicle-nepal',
    title: 'Best Cargo Three-Wheeler Vehicles in Nepal: Piaggio vs Competitors',
    category: 'Commercial Vehicles',
    excerpt: 'Explore why the Piaggio Cargo series remains the preferred choice for small business delivery across Nepal’s challenging terrain.',
    date: 'June 10, 2026',
    readTime: '5 min read',
    image: 'blog-cargo',
    content: `
When it comes to moving goods efficiently through Nepal's bustling cities and challenging hill climbs, small business owners need a transport partner that is reliable, inexpensive, and structurally robust. The three-wheeler cargo vehicle has revolutionized last-mile logistics, with **Piaggio Ape Cargo** leading the forefront.

### Why Load Capacity Matters in Nepal
Ferrying goods like water jugs, LPG canisters, agricultural produce, and heavy hardware in cities like Kathmandu, Pokhara, and Nepalgunj requires high-payload capability. 
* **Monocoque Chassis:** Unlike conventional tube frames that bend over time, Piaggio Ape vehicles use a unified metal monocoque deck.
* **Gradeability:** Piaggio's gear-reduction gearbox provides over 20% gradeability, allowing it to easily climb steep inclines even when fully loaded.

### Fuel Economy: Petrol vs Diesel vs Electric
If you are running a freight business, your running cost directly dictates your daily profit:
1. **Diesel Ape Cargo:** Renowned for brutal torque, it consumes less fuel under heavy weight, averaging 26-28 km per liter.
2. **Ape E-Xtra (Electric):** Charging costs an average of 90 NPR for a full cycle, granting 95 km. The running cost drops to less than 1 NPR per kilometer, making it the most profitable asset on the market.

For long-term reliability and heavy delivery load, the **Piaggio Ape Cargo series** continues to dominate commercial vehicle rankings across Nepal. Visit Om Siddhababa Enterprises to compare models today.
`
  },
  {
    id: 'benefits-electric-three-wheelers',
    slug: 'benefits-electric-three-wheelers',
    title: 'How Electric Auto Rickshaws can Doubled Your Profits in Nepal',
    category: 'Electric Mobility',
    excerpt: 'A calculated breakdown of charging costs vs fuel prices in Nepal, showing how going green pays off in under 18 months.',
    date: 'June 04, 2026',
    readTime: '6 min read',
    image: 'blog-electric',
    content: `
With fuel prices fluctuating unpredictably in Kathmandu, public transport operators and self-employed auto drivers are feeling the pinch. Moving over to electric three-wheelers, specifically the **Piaggio Ape E-City FX**, is no longer just an environmental gesture – it is a smart, high-margin business move.

### The Math: Cost per Kilometer comparison in NPR
Let us break down the standard operational metrics for a typical passenger-rickshaw operator driving **100 kilometers a day**:

* **Petrol Auto Rickshaw:**
  * Fuel requirement: ~3 Liters of Petrol (at NPR 175 per Liter) = NPR 525 
  * Lubricants & Filter wear: ~NPR 50/day
  * **Total Daily Energy Cost: NPR 575**
  
* **Piaggio Ape E-City (Electric):**
  * Energy required: ~6.5 units of electricity (at NPR 10 per unit) = NPR 65
  * Tailpipe maintenance: NPR 0 (No spark plugs, no filters, no engine oil)
  * **Total Daily Energy Cost: NPR 65**

### Savings Calculation
* **Daily Savings:** NPR 510
* **Monthly Savings (26 days):** NPR 13,260
* **Yearly Savings:** NPR 1,59,120

In less than two years, the amount saved in fuel and repairs fully recoups the initial purchase difference! Additionally, Nepal's government supports EV adoption with discounted road tax and easier financing options.

### Driver Comfort & Operator Health
Public transport driving can be exhausting due to noise and physical strain. Electric autos are **completely silent, gearless, and vibration-free**, significantly reducing driver fatigue. Choose electric at Om Siddhababa Enterprises and move into a smarter tomorrow.
`
  },
  {
    id: 'start-delivery-business',
    slug: 'start-delivery-business',
    title: 'How to Start a Highly Lucrative Cargo Delivery Business in Nepal',
    category: 'Business Growth',
    excerpt: 'A step-by-step business framework to offer logistics and delivery services to local retailers using a single Piaggio cargo auto.',
    date: 'May 28, 2026',
    readTime: '4 min read',
    image: 'blog-business',
    content: `
As e-commerce, wholesale trading, and supermarket infrastructure expand rapidly in tier-1 and tier-2 cities across Nepal, there is a giant shortage of dependable last-mile delivery providers. A single individual with a **Piaggio Ape Cargo** can easily start a localized logistics company. Here is how:

### Step 1: Identify Your Niche
Do not try to deliver everything. Partner with local businesses that require routine transport:
* **Water Jar Distributors:** Standard 20L jars require rapid, reliable daily drop-offs to retail shops.
* **LPG Gas Depots:** Heavy tanks that must be moved over narrow, uneven alleys where full-sized trucks cannot fit.
* **Lease-to-Vendor Produce:** Connect local fresh food markets to urban restaurants every morning.

### Step 2: Register & Acquire of Asset
Register a Sole Proprietorship/Partnership under your local municipality. Secure flexible vehicle financing:
We partner with multiple banks to provide quick loans with a down payment as low as 30%. A monthly EMI of NPR 12,000 can easily be covered by securing just two routine commercial clients paying NPR 25,000 each per month.

### Step 3: Fleet Consistency & After-Sales
Keep your vehicle in top condition. Om Siddhababa Enterprises provides genuine spare parts and scheduled services ensuring your business never halts. Ensure consistent service and prompt arrival to build strong business ties. Your Piaggio is a reliable cash-yielding asset starting on day one!
`
  }
];

export const PARTNER_BANKS: PartnerBank[] = [
  {
    name: 'Nabil Bank',
    logo: 'NB',
    maxFinancing: 'Up to 70% of Vehicle Cost',
    interestRate: '9.25% - 11.5% fixed/floating'
  },
  {
    name: 'Global IME Bank',
    logo: 'GI',
    maxFinancing: 'Up to 75% for Electric Vehicles',
    interestRate: '9.5% - 12.0%'
  },
  {
    name: 'NIC Asia Bank',
    logo: 'NA',
    maxFinancing: 'Up to 70% of On-Road Cost',
    interestRate: '10.0% - 12.5%'
  },
  {
    name: 'Rastriya Banijya Bank',
    logo: 'RB',
    maxFinancing: 'Up to 80% with Special EV Scheme',
    interestRate: '8.5% - 10.5%'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Ramesh Bahadur Thapa',
    location: 'Kalanki, Kathmandu',
    role: 'LPG Gas Depot Owner',
    vehicle: 'Piaggio Ape Cargo DX',
    quote: 'Our LPG delivery was slow because pickup trucks could not navigate narrow gullies. With our Piaggio Cargo, we now make 50 more deliveries every single day. The torque on steep climbs is remarkable!'
  },
  {
    name: 'Sushma Shrestha',
    location: 'Lalitpur',
    role: 'Public Transit Operator',
    vehicle: 'Piaggio Ape E-City FX',
    quote: 'Our daily running cost went from NPR 600 in petrol to just NPR 70 in electric charging. Passengers love the noise-free ride, and there are no gears, making my daily shifts comfortable.'
  },
  {
    name: 'Hari Prasad Pokharel',
    location: 'Butwal',
    role: 'Water Jar Distributor',
    vehicle: 'Piaggio Ape E-Xtra Cargo',
    quote: 'We operate 4 electric cargo models purchased from Om Siddhababa. The team’s after-sales support, spare parts availability, and finance guidance made our business expansion fluid.'
  }
];

export const COUNTERS = [
  { value: '450+', label: 'Vehicles Delivered' },
  { value: '400+', label: 'Happy Entrepreneurs' },
  { value: '8+', label: 'Years of Trust' },
  { value: '14+', label: 'Districts Served' }
];
