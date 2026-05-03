import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Brain, Zap, Map, ArrowLeft } from 'lucide-react';

import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Simulator from './components/Simulator';
import Timeline from './components/Timeline';
import Flashcard from './components/Flashcard';

const Navbar = () => {
  const location = useLocation();
  const isHero = location.pathname === '/';

  if (isHero) return null;

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel px-6 py-4 flex justify-between items-center transition-all">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
          <span className="text-xl font-black text-india-navy">VS</span>
        </div>
        <span className="text-2xl font-black tracking-tight text-white hidden sm:block">
          VoteSmart <span className="text-india-saffron">India</span>
        </span>
      </Link>

      <div className="flex gap-2 sm:gap-4 bg-white/5 p-1.5 rounded-2xl border border-white/10">
        {[
          { path: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Hub' },
          { path: '/simulator', icon: <Map size={18} />, label: 'Simulate' },
          { path: '/quiz', icon: <Brain size={18} />, label: 'Quiz' },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-sm ${
              location.pathname === item.path 
                ? 'bg-white text-india-navy shadow-md' 
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {item.icon}
            <span className="hidden md:block">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-india-navy selection:bg-india-saffron selection:text-white">
        <Navbar />
        
        <main className="w-full h-full">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/flashcards" element={<Flashcard />} />
            <Route path="/timeline" element={<Timeline />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
