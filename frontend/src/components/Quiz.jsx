import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const quizData = [
  {
    question: "Which button do you press on the EVM if you don't want to vote for any candidate?",
    options: ["CANCEL", "NOTA", "NULL", "SKIP"],
    answer: "NOTA"
  },
  {
    question: "Who is responsible for conducting elections in India?",
    options: ["Supreme Court", "Prime Minister", "Election Commission", "President"],
    answer: "Election Commission"
  }
];

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isWrong, setIsWrong] = useState(false);
  const [xp, setXp] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (opt) => {
    if (selectedOpt) return;
    setSelectedOpt(opt);

    if (opt === quizData[currentQ].answer) {
      // Correct
      setXp(xp + 10);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#138808', '#FFFFFF']
      });
      setTimeout(() => {
        if (currentQ < quizData.length - 1) {
          setCurrentQ(currentQ + 1);
          setSelectedOpt(null);
        } else {
          setIsFinished(true);
        }
      }, 1500);
    } else {
      // Wrong
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
        setSelectedOpt(null);
      }, 800);
    }
  };

  if (isFinished) {
    return (
      <div className="pt-32 pb-12 px-6 max-w-2xl mx-auto min-h-screen text-center">
        <div className="glass-card p-12">
          <div className="w-24 h-24 bg-india-saffron/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy size={48} className="text-india-saffron" />
          </div>
          <h2 className="text-4xl font-black mb-4">Lesson Complete!</h2>
          <p className="text-xl text-slate-300 mb-8">You earned <span className="text-india-green font-bold">+{xp} XP</span> today.</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary w-full"
          >
            Continue Learning
          </button>
        </div>
      </div>
    );
  }

  const q = quizData[currentQ];

  return (
    <div className="pt-32 pb-12 px-6 max-w-2xl mx-auto min-h-screen flex flex-col">
      {/* Progress Header */}
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => window.history.back()} className="text-slate-500 hover:text-white">
          <X size={24} />
        </button>
        <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-india-green"
            initial={{ width: 0 }}
            animate={{ width: `${(currentQ / quizData.length) * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-2 font-bold text-india-saffron">
          <Trophy size={20} /> {xp}
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-black mb-12 leading-tight">
        {q.question}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto mb-12">
        {q.options.map((opt) => {
          let stateClass = '';
          if (selectedOpt === opt) {
            stateClass = opt === q.answer ? 'duo-btn-correct' : 'duo-btn-wrong';
          }

          return (
            <motion.button
              key={opt}
              onClick={() => handleSelect(opt)}
              animate={isWrong && selectedOpt === opt ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`duo-btn ${stateClass}`}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
