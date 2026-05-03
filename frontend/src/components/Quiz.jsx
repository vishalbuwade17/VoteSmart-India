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
      <main className="pt-32 pb-12 px-6 max-w-2xl mx-auto min-h-screen text-center" aria-live="polite">
        <div className="glass-card p-12">
          <div className="w-24 h-24 bg-india-saffron/20 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
            <Trophy size={48} className="text-india-saffron" />
          </div>
          <h2 className="text-4xl font-black mb-4">Lesson Complete!</h2>
          <p className="text-xl text-slate-300 mb-8">You earned <span className="text-india-green font-bold">+{xp} XP</span> today.</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary w-full"
            aria-label="Restart Quiz"
          >
            Continue Learning
          </button>
        </div>
      </main>
    );
  }

  const q = quizData[currentQ];

  return (
    <main className="pt-32 pb-12 px-6 max-w-2xl mx-auto min-h-screen flex flex-col">
      {/* Progress Header */}
      <header className="flex items-center gap-4 mb-12">
        <button onClick={() => window.history.back()} className="text-slate-500 hover:text-white" aria-label="Exit quiz">
          <X size={24} aria-hidden="true" />
        </button>
        <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={(currentQ / quizData.length) * 100} aria-valuemin="0" aria-valuemax="100">
          <motion.div 
            className="h-full bg-india-green"
            initial={{ width: 0 }}
            animate={{ width: `${(currentQ / quizData.length) * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-2 font-bold text-india-saffron" aria-label={`Score: ${xp} XP`}>
          <Trophy size={20} aria-hidden="true" /> {xp}
        </div>
      </header>

      <div aria-live="assertive" className="sr-only">
        {isWrong ? "Incorrect answer. Try again." : selectedOpt ? "Correct answer!" : `Question ${currentQ + 1}: ${q.question}`}
      </div>

      <h2 className="text-3xl md:text-4xl font-black mb-12 leading-tight" id="quiz-question">
        {q.question}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto mb-12" role="group" aria-labelledby="quiz-question">
        {q.options.map((opt) => {
          let stateClass = '';
          if (selectedOpt === opt) {
            stateClass = opt === q.answer ? 'duo-btn-correct' : 'duo-btn-wrong';
          }

          return (
            <motion.button
              key={opt}
              onClick={() => handleSelect(opt)}
              aria-pressed={selectedOpt === opt}
              disabled={selectedOpt !== null && selectedOpt !== opt}
              animate={isWrong && selectedOpt === opt ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`duo-btn ${stateClass} disabled:opacity-50`}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>
    </main>
  );
};

export default Quiz;
