import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Megaphone, CheckSquare, Vote, BarChart3, X } from 'lucide-react';

const phases = [
  {
    title: "Announcement",
    date: "Day 0",
    icon: <Calendar className="text-india-saffron" />,
    desc: "The Election Commission of India announces the election schedule and the Model Code of Conduct comes into immediate effect.",
    color: "bg-india-saffron"
  },
  {
    title: "Nomination",
    date: "Day 7-14",
    icon: <CheckSquare className="text-yellow-400" />,
    desc: "Candidates file their nomination papers. These are scrutinized by the Returning Officer for eligibility.",
    color: "bg-yellow-400"
  },
  {
    title: "Campaign",
    date: "Day 15- voting",
    icon: <Megaphone className="text-white" />,
    desc: "Political parties and candidates reach out to voters through rallies, manifestos, and social media. Campaigns must end 48 hours before polling.",
    color: "bg-white"
  },
  {
    title: "Voting Day",
    date: "Phase-wise",
    icon: <Vote className="text-india-green" />,
    desc: "Voters go to polling booths to cast their votes using EVMs. VVPAT provides a physical verification slip.",
    color: "bg-india-green"
  },
  {
    title: "Counting",
    date: "Final Day",
    icon: <BarChart3 className="text-india-navy" />,
    desc: "Votes are counted under strict supervision. Results are declared and the winning candidates are notified.",
    color: "bg-india-navy"
  }
];

const Timeline = () => {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const scrollRef = useRef(null);

  return (
    <div className="pt-32 pb-12 min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="text-center px-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Election Timeline</h1>
        <p className="text-slate-400 text-lg">Scroll horizontally to explore the phases.</p>
      </div>

      {/* Horizontal Scroll Area */}
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto pb-12 pt-8 px-6 md:px-24 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex gap-8 items-center min-w-max relative pb-8">
          
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 rounded-full z-0" />

          {phases.map((phase, idx) => (
            <motion.div 
              key={idx}
              className="relative z-10 snap-center shrink-0 cursor-pointer group"
              onClick={() => setSelectedPhase(phase)}
              whileHover={{ y: -10 }}
            >
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-3xl glass-card flex flex-col items-center justify-center gap-3 border-b-4 border-b-transparent hover:border-b-white transition-all`}>
                <div className={`p-3 rounded-2xl ${phase.color} bg-opacity-20`}>
                  {React.cloneElement(phase.icon, { size: 32 })}
                </div>
                <span className="font-bold text-sm">{phase.title}</span>
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                {phase.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPhase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhase(null)}
              className="absolute inset-0 bg-india-navy/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-lg glass-card p-8 md:p-12 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-2 ${selectedPhase.color}`} />
              
              <button 
                onClick={() => setSelectedPhase(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>

              <div className={`w-20 h-20 rounded-2xl ${selectedPhase.color} flex items-center justify-center mb-8 shadow-2xl`}>
                 {React.cloneElement(selectedPhase.icon, { size: 40, className: 'text-india-navy' })}
              </div>
              
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest block mb-2">{selectedPhase.date}</span>
              <h3 className="text-3xl font-black mb-6">{selectedPhase.title}</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                {selectedPhase.desc}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default Timeline;
