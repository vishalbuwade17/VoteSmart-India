import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Brain, Map } from 'lucide-react';
import Lottie from 'lottie-react';

// A simple placeholder animation data (a bouncing dot) until we get a real EVM lottie file
const placeholderAnimation = {
  v: "4.8.0",
  meta: { g: "LottieFiles AE 3.1.2", a: "", k: "", d: "", tc: "" },
  fr: 30, ip: 0, op: 60, w: 500, h: 500, nm: "Bouncing Dot",
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

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-india-saffron via-white to-india-green">
      
      {/* Floating Particles Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20 backdrop-blur-3xl"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -200 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        
        {/* Lottie Animation Wrapper */}
        <div className="w-48 h-48 md:w-64 md:h-64 mb-8 drop-shadow-2xl">
          <Lottie animationData={placeholderAnimation} loop={true} />
        </div>

        <motion.h1 
          className="text-5xl md:text-7xl font-black text-india-navy mb-4 tracking-tighter"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Understand Elections <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-india-saffron to-india-green">
            Like Never Before.
          </span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl font-bold text-slate-700 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Learn • Simulate • Vote Smart
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-india-navy text-white rounded-2xl font-bold text-lg flex items-center gap-2 hover:scale-105 hover:shadow-2xl hover:shadow-india-navy/50 transition-all active:scale-95"
          >
            <Play fill="currentColor" size={20} /> Start Journey
          </button>
          
          <button 
            onClick={() => navigate('/quiz')}
            className="px-8 py-4 bg-white/80 backdrop-blur-md text-india-navy rounded-2xl font-bold text-lg flex items-center gap-2 hover:scale-105 hover:bg-white transition-all shadow-xl active:scale-95 border border-white"
          >
            <Brain size={20} /> Take Quiz
          </button>

          <button 
            onClick={() => navigate('/simulator')}
            className="px-8 py-4 bg-india-green text-white rounded-2xl font-bold text-lg flex items-center gap-2 hover:scale-105 hover:shadow-2xl hover:shadow-india-green/50 transition-all active:scale-95"
          >
            <Map size={20} /> Simulate Voting
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Hero;
