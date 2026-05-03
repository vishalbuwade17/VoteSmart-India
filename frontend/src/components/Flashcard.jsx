import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

const flashcardsData = [
  {
    front: "What is NOTA?",
    back: "None of the Above. It's an option on the EVM allowing voters to officially register a vote of rejection for all candidates.",
    color: "from-blue-500 to-purple-500"
  },
  {
    front: "VVPAT",
    back: "Voter Verified Paper Audit Trail. It prints a slip with the candidate's name and symbol you voted for, visible for 7 seconds behind a glass window.",
    color: "from-india-saffron to-orange-600"
  },
  {
    front: "Form 6",
    back: "The application form used to register as a new voter in the electoral roll.",
    color: "from-india-green to-emerald-700"
  }
];

const Flashcard = () => {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Play a subtle 'pop' sound on flip
  const playSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleFlip = () => {
    playSound();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % flashcardsData.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length);
    }, 150);
  };

  const currentCard = flashcardsData[index];

  return (
    <div className="pt-32 pb-12 px-6 max-w-lg mx-auto min-h-screen flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black mb-2">Micro-Learning</h1>
        <p className="text-slate-400">Swipe or tap to learn election concepts.</p>
      </div>

      {/* Card Container */}
      <div className="relative w-full aspect-[3/4] perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={index + (isFlipped ? 'back' : 'front')}
            initial={{ rotateY: isFlipped ? -180 : 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 180 : -180, opacity: 0 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
            onClick={handleFlip}
            className="absolute inset-0 w-full h-full cursor-pointer preserve-3d"
          >
            <div className={`w-full h-full rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-2xl border border-white/20 bg-gradient-to-br ${isFlipped ? 'from-india-navy to-slate-900' : currentCard.color}`}>
              
              {!isFlipped ? (
                <>
                  <Volume2 className="absolute top-6 right-6 opacity-50" />
                  <h2 className="text-5xl font-black text-white drop-shadow-lg">{currentCard.front}</h2>
                  <div className="absolute bottom-8 flex items-center gap-2 text-white/70 text-sm font-bold animate-bounce">
                    <RotateCcw size={16} /> Tap to flip
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-1 bg-white/20 rounded-full mb-8" />
                  <p className="text-2xl font-medium text-white leading-relaxed">{currentCard.back}</p>
                </>
              )}

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 mt-12">
        <button onClick={handlePrev} className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:bg-white hover:text-india-navy transition-all">
          <ChevronLeft size={24} />
        </button>
        <div className="text-sm font-bold text-slate-500 tracking-widest">
          {index + 1} / {flashcardsData.length}
        </div>
        <button onClick={handleNext} className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:bg-white hover:text-india-navy transition-all">
          <ChevronRight size={24} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}} />
    </div>
  );
};

export default Flashcard;
