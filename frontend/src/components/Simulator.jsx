import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Lottie from 'lottie-react';
import axios from 'axios';

// Placeholder Lottie data for EVM Button Press
const evmAnimation = {
  v: "4.8.0",
  meta: { g: "LottieFiles AE 3.1.2", a: "", k: "", d: "", tc: "" },
  fr: 30, ip: 0, op: 60, w: 500, h: 500, nm: "EVM Press",
  ddd: 0, assets: [],
  layers: [
    {
      ty: 4, nm: "Shape Layer 1", sr: 1, st: 0, op: 60, ip: 0, ind: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 1, k: [{ i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 0, s: [250, 100, 0], e: [250, 400, 0] }, { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 30, s: [250, 400, 0], e: [250, 100, 0] }, { t: 60 }], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: { a: 0, k: [100, 100, 100], ix: 6 }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr", it: [
            { d: 1, ty: "el", s: { a: 0, k: [100, 100], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, nm: "Ellipse Path 1", mn: "ADBE Vector Shape - Ellipse", hd: false },
            { ty: "fl", c: { a: 0, k: [0.075, 0.533, 0.031, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Fill 1", mn: "ADBE Vector Graphic - Fill", hd: false },
            { ty: "tr", p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }
          ], nm: "Ellipse 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: false
        }
      ]
    }
  ]
};

const Simulator = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! Welcome to the Election Simulator. I will guide you through the process.\n\nFirst question: Are you a first-time voter?', options: ['Yes', 'No'] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEvm, setShowEvm] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (userText) => {
    if (!userText.trim() || isLoading) return;

    // Special trigger for EVM simulation
    if (userText.toLowerCase().includes('vote') && messages.length > 3) {
      setMessages(prev => [...prev, { role: 'user', text: userText }]);
      setTimeout(() => setShowEvm(true), 1000);
      return;
    }

    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/ask-election-bot', {
        message: userText,
        history: messages.map(m => ({ role: m.role, text: m.text })),
        context: 'Simulator Flow'
      });
      
      setMessages(prev => [...prev, { role: 'bot', text: response.data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, connection issue. Let's try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (showEvm) {
    return (
      <div className="pt-32 pb-12 px-6 max-w-4xl mx-auto min-h-screen text-center flex flex-col items-center justify-center">
        <h2 className="text-4xl font-black mb-4">Election Day Simulation</h2>
        <p className="text-slate-400 mb-12">Press the button next to your chosen candidate.</p>
        
        <div className="w-64 h-64 bg-white/5 rounded-3xl p-8 mb-8 border border-white/10 relative">
          <Lottie animationData={evmAnimation} loop={true} />
        </div>

        <button 
          onClick={() => {
            setShowEvm(false);
            setMessages(prev => [...prev, { role: 'bot', text: 'Beep! 🟩 Your vote has been recorded successfully via VVPAT.' }]);
          }}
          className="btn-accent"
        >
          Finish Voting
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-12 px-6 max-w-3xl mx-auto min-h-screen flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Voting Journey</h1>
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-india-saffron w-1/3"></div>
        </div>
      </div>

      <div className="flex-1 glass-card flex flex-col overflow-hidden">
        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((m, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start gap-4'}`}
            >
              {m.role === 'bot' && (
                <div className="w-10 h-10 shrink-0 bg-india-saffron rounded-full flex items-center justify-center border-2 border-india-navy">
                  <Bot size={20} className="text-india-navy" />
                </div>
              )}
              
              <div className="space-y-3 max-w-[80%]">
                <div className={`p-4 rounded-2xl text-[15px] leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-white text-india-navy rounded-tr-none font-medium' 
                    : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5 whitespace-pre-wrap'
                }`}>
                  {m.text}
                </div>

                {m.options && (
                  <div className="flex gap-2 flex-wrap">
                    {m.options.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => handleSend(opt)}
                        className="px-4 py-2 bg-india-navy border border-white/20 rounded-full text-sm font-bold hover:bg-white/10 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
             <div className="flex justify-start gap-4">
               <div className="w-10 h-10 shrink-0 bg-india-saffron/50 rounded-full flex items-center justify-center">
                 <Loader2 size={20} className="animate-spin text-white" />
               </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Type your answer here..."
              className="w-full bg-india-navy border border-white/20 rounded-xl py-4 pl-4 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:border-india-saffron transition-colors"
            />
            <button 
              onClick={() => handleSend(input)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-india-saffron rounded-lg text-india-navy hover:bg-white transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
