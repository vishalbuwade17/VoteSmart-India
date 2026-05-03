import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Brain, Zap, Map, ArrowLeft, Loader2 } from 'lucide-react';

const Hero = lazy(() => import('./components/Hero'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Quiz = lazy(() => import('./components/Quiz'));
const Simulator = lazy(() => import('./components/Simulator'));
const Timeline = lazy(() => import('./components/Timeline'));
const Flashcard = lazy(() => import('./components/Flashcard'));

const Navbar = () => {
  const location = useLocation();
  const isHero = location.pathname === '/';

  if (isHero) return null;

  return (
    <nav aria-label="Main Navigation" className="fixed top-0 w-full z-50 glass-panel px-6 py-4 flex justify-between items-center transition-all">
      <Link to="/" aria-label="Go to Home" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
          <span aria-hidden="true" className="text-xl font-black text-india-navy">VS</span>
        </div>
        <span className="text-2xl font-black tracking-tight text-white hidden sm:block">
          VoteSmart <span className="text-india-saffron">India</span>
        </span>
      </Link>

      <div role="menubar" className="flex gap-2 sm:gap-4 bg-white/5 p-1.5 rounded-2xl border border-white/10">
        {[
          { path: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Hub' },
          { path: '/simulator', icon: <Map size={18} />, label: 'Simulate' },
          { path: '/quiz', icon: <Brain size={18} />, label: 'Quiz' },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            role="menuitem"
            aria-current={location.pathname === item.path ? 'page' : undefined}
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
          <Suspense fallback={
            <div className="h-screen flex items-center justify-center text-white" aria-live="polite" aria-busy="true">
              <Loader2 className="animate-spin text-india-saffron" size={48} />
              <span className="sr-only">Loading content...</span>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/flashcards" element={<Flashcard />} />
              <Route path="/timeline" element={<Timeline />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
