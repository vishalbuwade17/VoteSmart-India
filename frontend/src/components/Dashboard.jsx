import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Map, Layers, Clock, ArrowRight } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();

  const createChartData = (val, color) => ({
    datasets: [{
      data: [val, 100 - val],
      backgroundColor: [color, 'rgba(255,255,255,0.1)'],
      borderWidth: 0,
      cutout: '80%',
    }]
  });

  const chartOptions = {
    animation: { duration: 2000, easing: 'easeOutQuart' },
    plugins: { tooltip: { enabled: false }, legend: { display: false } },
    maintainAspectRatio: false,
  };

  const modules = [
    {
      id: 'simulator',
      title: 'Simulation',
      desc: 'Step-by-step voting journey',
      icon: <Map size={32} className="text-india-saffron" />,
      color: '#FF9933',
      progress: 0,
      path: '/simulator',
      bg: 'from-india-saffron/10 to-transparent'
    },
    {
      id: 'quiz',
      title: 'Quizzes',
      desc: 'Test your election knowledge',
      icon: <Brain size={32} className="text-india-green" />,
      color: '#138808',
      progress: 25,
      path: '/quiz',
      bg: 'from-india-green/10 to-transparent'
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      desc: 'Quick concepts & definitions',
      icon: <Layers size={32} className="text-blue-400" />,
      color: '#60A5FA',
      progress: 60,
      path: '/flashcards',
      bg: 'from-blue-500/10 to-transparent'
    },
    {
      id: 'timeline',
      title: 'Timeline',
      desc: 'Phases of Indian elections',
      icon: <Clock size={32} className="text-purple-400" />,
      color: '#A78BFA',
      progress: 100,
      path: '/timeline',
      bg: 'from-purple-500/10 to-transparent'
    }
  ];

  return (
    <div className="pt-32 pb-12 px-6 max-w-6xl mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Your Civic <span className="text-india-saffron">Journey</span></h1>
        <p className="text-slate-400 text-lg">Pick up where you left off. Every step makes you a smarter voter.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate(mod.path)}
            className="glass-card p-6 md:p-8 cursor-pointer relative overflow-hidden group border-b-4"
            style={{ borderBottomColor: mod.color }}
          >
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${mod.bg} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 transition-colors">
                  {mod.icon}
                </div>
                <h2 className="text-2xl font-bold mb-2">{mod.title}</h2>
                <p className="text-slate-400 mb-6">{mod.desc}</p>
                
                <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" style={{ color: mod.color }}>
                  Start Module <ArrowRight size={16} />
                </div>
              </div>

              {/* Progress Ring */}
              <div className="w-24 h-24 relative shrink-0">
                <Doughnut data={createChartData(mod.progress, mod.color)} options={chartOptions} />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-black">{mod.progress}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
