import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// In-Memory Database for Inquiries
interface Inquiry {
  id: string;
  name: string;
  phone: string;
  vehicleInterest: string;
  location: string;
  message: string;
  status: 'Pending' | 'Contacted' | 'Quotation Sent' | 'Scheduled' | 'Sold';
  submittedAt: string;
}

const inquiries: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Bal Bahadur Karki',
    phone: '9841526317',
    vehicleInterest: 'Piaggio Ape E-City FX',
    location: 'Kalanki, Kathmandu',
    message: 'Interested in buying 3 electric passenger autos. Please provide the battery warranty details and Nabil Bank business loan terms.',
    status: 'Pending',
    submittedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString() // 3 hours ago
  },
  {
    id: 'inq-2',
    name: 'Deepak Raj Giri',
    phone: '9803125492',
    vehicleInterest: 'Piaggio Ape Cargo DX',
    location: 'Chabahil, Kathmandu',
    message: 'Need cargo auto for wholesale drinking water supply. What is the max payload capacity for steep roads?',
    status: 'Contacted',
    submittedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString() // 12 hours ago
  },
  {
    id: 'inq-3',
    name: 'Niranjan Shrestha',
    phone: '9851023741',
    vehicleInterest: 'Piaggio Ape E-Xtra Cargo',
    location: 'Jawalakhel, Lalitpur',
    message: 'Could you calculate the EMI for 3 years with 40% down payment? Our logistics brand wants to transition to 100% electric delivery autos.',
    status: 'Quotation Sent',
    submittedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString() // 24 hours ago
  }
];

// 1. Get all inquiries
app.get('/api/inquiries', (req, res) => {
  res.json(inquiries);
});

// 2. Submit a new inquiry
app.post('/api/inquiries', (req, res) => {
  const { name, phone, vehicleInterest, location, message } = req.body;

  if (!name || !phone || !vehicleInterest || !location) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    name,
    phone,
    vehicleInterest,
    location,
    message: message || 'No message provided.',
    status: 'Pending',
    submittedAt: new Date().toISOString()
  };

  inquiries.unshift(newInquiry);
  console.log(`[Om Siddhababa Server] New lead received: ${name} (${phone}) - ${vehicleInterest}`);
  res.status(201).json(newInquiry);
});

// 3. Update inquiry status
app.patch('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const inquiry = inquiries.find((i) => i.id === id);
  if (!inquiry) {
    return res.status(404).json({ error: 'Inquiry not found.' });
  }

  if (status) {
    inquiry.status = status;
  }

  console.log(`[Om Siddhababa Server] Updated lead ${id} status to: ${status}`);
  res.json(inquiry);
});

// Lazy Gemini API Initializer & Chat API Route
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === '') {
    return null;
  }

  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

// 4. Chat Route powered by Gemini
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message payload is required.' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    // Elegant fallback simulator when API key is not present or set to placeholder
    console.log('[Om Siddhababa Server] Gemini API Key not specified. Using intelligent response simulation.');
    
    const lowercase = message.toLowerCase();
    let reply = "";

    if (lowercase.includes('electric') || lowercase.includes('ev') || lowercase.includes('battery')) {
      reply = "We offer the revolutionary **Piaggio Ape E-City FX** (passenger) and **Ape E-Xtra Cargo** (cargo) in Nepal! They charge in just 3 to 4 hours, have a real range of up to 110 kilometers per full charge, and run at an amazing cost of just **NPR 0.70 to 0.85 per KM** (compared to over NPR 4.50 for petrol/diesel)! Would you like me to calculate an EMI or book a test drive for you?";
    } else if (lowercase.includes('price') || lowercase.includes('cost') || lowercase.includes('npr') || lowercase.includes('how much')) {
      reply = "Our Piaggio series ranges starting from around **NPR 4,50,000** for the Ape City Petrol up to **NPR 6,80,000** for the premium Ape E-Xtra Cargo. We offer excellent bank financing partnerships where you can purchase with a downpayment of as low as **30%** (starting around NPR 1,35,000). Which model (Passenger, Cargo, or Electric) fits your business goals?";
    } else if (lowercase.includes('cargo') || lowercase.includes('payload') || lowercase.includes('weight')) {
      reply = "The **Piaggio Ape Cargo DX** (Diesel) has a payload capacity of **550 kg** and features a giant 435cc engine optimized for Nepal's steep hills. We also have the **Ape E-Xtra Cargo** (Electric) which offers a **506 kg** payload capacity and instant 45 Nm torque to pull heavy weight uphill. They are perfect for delivering gas cylinders, drinking water jars, agricultural supply, and e-commerce goods!";
    } else if (lowercase.includes('finance') || lowercase.includes('emi') || lowercase.includes('loan') || lowercase.includes('bank')) {
      reply = "We partner with top Nepalese banks like **Nabil Bank, NIC Asia, Global IME, and Rastriya Banijya Bank**. You can get up to 70% financing (or 75-80% on special Electric Vehicle schemes) with tenures ranging up to 5 years. Our interactive **Finance & EMI Calculator** on the designated tab will help you calculate your monthly payment in real-time!";
    } else if (lowercase.includes('contact') || lowercase.includes('location') || lowercase.includes('address') || lowercase.includes('where')) {
      reply = "Om Siddhababa Enterprises is located at **Mandev Marg, Kathmandu, Nepal**. You can reach us directly at **98511-23456 / 98412-34567**, email us at **info@omsiddhababa.com**, or drop an inquiry using our instant form on the Contact page!";
    } else {
      reply = "Hello! Welcome to Om Siddhababa Enterprises, your certified Piaggio Commercial Vehicle Dealer in Nepal. I can assist you with details regarding our range of high-performance Passenger auto rickshaws, heavy-duty Cargo three-wheelers, revolutionary quiet Electric vehicles (EVs), easy monthly EMI financing options, or setting up test drives at our Kathmandu showroom of Nepal. What business are you running or planning to start?";
    }

    // Add API key warning so user knows they can unlock advanced AI
    reply += "\n\n*(Note: To enable fully dynamic AI responses powered by Gemini 3.5, remember to add your real GEMINI_API_KEY in the Secrets settings!)*";

    return res.json({ text: reply });
  }

  try {
    const systemPrompt = `
      You are "Siddhababa AI", the premium virtual commercial mobility consultant for "Om Siddhababa Enterprises", the authorized Piaggio Commercial Dealer in Nepal.
      Your goal is to answer visitor questions, recommend the best three-wheeler models, explain run-cost saving metrics, and convert inquiries into leads.

      Dealer Information:
      - Location: Mandev Marg, Kathmandu, Nepal
      - Focus: Passenger rickshaws, cargo delivery vehicles, and electric/EV three-wheelers
      - Partner Banks: Nabil Bank, Global IME Bank, NIC Asia, Rastriya Banijya Bank
      - Financing: Up to 70-80% loan limit, 3-5 years tenure

      Piaggio Vehicles Available & Specifications (Always quote prices and specs accurately):
      1. Piaggio Ape City (Passenger, Petrol, (~NPR 4,65,000)):
         - Engine: 197cc Air-Cooled
         - Capacity: 3+1 passengers
         - Mileage: 30-35 km/l
         - Perfect for local transport routes in Kathmandu, Pokhara, Terai.
      2. Piaggio Ape E-City FX (Electric Passenger, (~NPR 5,95,000)):
         - Battery: 4.5-7.5 kWh Lithium-Ion
         - Daily Range: 110 KM per full charge
         - Charging: 3.5 hours
         - Operation Cost: NPR 0.70/km (Unbelievable savings of over NPR 1,50,000 every year compared to petrol!)
         - Vibration-free, no gears, easy noiseless automatic ride.
      3. Piaggio Ape Cargo DX (Diesel Cargo, (~NPR 5,25,000)):
         - Engine: 435cc Direct Injection
         - Payload: 550 kg
         - Hill capability: 22% gradeability (Excellent load bearer for Nepal hills)
         - Dimensions: 5.5 ft deck length
         - Perfect for LPG cylinders, mineral water containers, heavy construction supplies.
      4. Piaggio Ape E-Xtra Cargo (Electric Cargo, (~NPR 6,60,000)):
         - Battery: 8.0 kWh LFP
         - Payload: 506 kg
         - Daily Range: 95 KM per full charge
         - Charging: 3.8 hours
         - Torque: 45 Nm (Instant climb pull)
         - Operation Cost: NPR 0.85/km

      Guidelines:
      - Be extremely professional, informative, encouraging, and welcoming to Nepalese businesses.
      - Refer to Nepalese Rupees (NPR) as the currency. Mention banks like Nabil, Global IME, NIC Asia.
      - Explain the dramatic savings of Electric (EV) three-wheelers over petrol/diesel (e.g. NPR 0.75 vs NPR 4.5 per kilometer).
      - Advise them to use the Inquiry Form or the built-in interactive EMI Calculator to gauge their exact financials.
      - Keep responses concise, clear, and highly structured using bullet points where appropriate.
    `;

    // Map conversation history format if supplied
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      });
    }

    // Append current message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('[Om Siddhababa Server] Gemini generateContent error:', error);
    res.status(500).json({ error: 'AI Assistant transient error: ' + error.message });
  }
});

// Configure Vite integration or static file serving
const setupServer = async () => {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    // Mount Vite middlewares
    app.use(vite.middlewares);
  } else {
    // Production static files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Om Siddhababa Server] Running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
};

setupServer();
