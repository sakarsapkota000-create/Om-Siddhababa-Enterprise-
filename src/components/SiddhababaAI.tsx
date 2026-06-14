import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Sparkles, RefreshCw, Zap, ShieldCheck } from 'lucide-react';
import { ChatMessage } from '../types';

interface SiddhababaAIProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function SiddhababaAI({ isOpen, onClose, onOpen }: SiddhababaAIProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Namaste! Welcome to Om Siddhababa Enterprises. I am your commercial vehicle assistant. Ask me anything about our Passenger Rickshaws, Cargo series, silent Electric vehicles (EV) running costs, or attractive EMI financing plans. What transport goals are you focusing on today?',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const chatHistoryForAPI = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          history: chatHistoryForAPI
        })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.text,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('Network response not ok.');
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'Apologies, but my connection is currently a bit congested. Please make sure your server is online, or drop your question in our Inquiry Contact form on the main page!',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher trigger with tooltip */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
          <div className="bg-slate-900 text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-lg border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            💡 Talk to Siddhababa AI
          </div>
          <button
            onClick={onOpen}
            className="bg-brand-green hover:bg-brand-green-dark text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 border-2 border-white animate-pulse-subtle"
            title="Open Siddhababa AI Assistant"
          >
            <MessageSquare className="w-6 h-6 text-brand-gold" />
          </button>
        </div>
      )}

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-gray-150 overflow-hidden flex flex-col h-[520px] transition-all">
          
          {/* Header */}
          <div className="bg-slate-900 p-4 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-green rounded-xl flex items-center justify-center border-2 border-brand-gold">
                <Sparkles className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h4 className="text-sm font-black tracking-tight flex items-center gap-1">
                  <span>Siddhababa AI Advisor</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </h4>
                <p className="text-[10px] text-gray-400 font-bold">Piaggio Commercial Specialist</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick FAQ Suggestion Bar */}
          <div className="bg-gray-50 border-b border-gray-100 py-2 px-3 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap no-scrollbar text-[11px]">
            <span className="font-bold text-gray-500 flex-shrink-0">E.g., Try:</span>
            {[
              'Ape E-City Specs & Cost',
              'EMI and downpayment',
              'Payload of Cargo DX',
              'Contact Info'
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className="bg-white border border-gray-200 hover:border-brand-green text-gray-700 font-bold px-2 py-1 rounded-md transition-all cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : ''}`}>
                
                {/* Agent Icon */}
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-brand-green flex items-center justify-center self-end border border-brand-gold shrink-0">
                    <Sparkles className="w-4 h-4 text-brand-gold" />
                  </div>
                )}

                {/* Bubble */}
                <div className={`max-w-[78%] rounded-2xl p-3 shadow-xs text-xs space-y-1 ${
                  m.sender === 'user'
                    ? 'bg-brand-green text-white rounded-br-none'
                    : 'bg-white text-gray-850 rounded-bl-none border border-gray-100'
                }`}>
                  <p className="whitespace-pre-line leading-relaxed font-semibold">
                    {m.text}
                  </p>
                  <span className={`text-[9px] font-medium block text-right ${
                    m.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                  }`}>
                    {m.timestamp}
                  </span>
                </div>

                {/* User Icon */}
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center self-end shrink-0">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}

              </div>
            ))}

            {/* Is Typing animation */}
            {loading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-brand-green flex items-center justify-center self-end border border-brand-gold">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-none p-3 shadow-xs border border-gray-100 flex items-center gap-1.5 text-xs">
                  <span className="text-gray-400 font-bold">Consulting Specs...</span>
                  <RefreshCw className="w-3.5 h-3.5 text-brand-green animate-spin" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-150 flex items-center gap-1.5">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about vehicles & finance..."
              className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-green border border-gray-200"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2.5 bg-brand-green text-white hover:bg-brand-green-dark disabled:bg-gray-200 disabled:text-gray-405 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
