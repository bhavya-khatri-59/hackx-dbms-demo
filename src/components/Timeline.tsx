import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Calendar, Clock, Trophy, Users } from 'lucide-react';

const timelineData = [
  {
    id: 1,
    title: 'Registration Opens',
    date: 'January 15, 2025',
    time: '09:00 AM',
    description: 'Team registration and problem statement release',
    icon: <Users className="w-6 h-6" />,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Hackathon Begins',
    date: 'February 1, 2025',
    time: '10:00 AM',
    description: 'Opening ceremony and hacking period starts',
    icon: <Calendar className="w-6 h-6" />,
    status: 'active'
  },
  {
    id: 3,
    title: 'Mid-Point Check',
    date: 'February 2, 2025',
    time: '02:00 PM',
    description: 'Progress review and mentor feedback session',
    icon: <Clock className="w-6 h-6" />,
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Final Submissions',
    date: 'February 2, 2025',
    time: '08:00 PM',
    description: 'Project submission deadline',
    icon: <Trophy className="w-6 h-6" />,
    status: 'upcoming'
  },
  {
    id: 5,
    title: 'Judging & Results',
    date: 'February 3, 2025',
    time: '11:00 AM',
    description: 'Final presentations and winner announcement',
    icon: <Trophy className="w-6 h-6" />,
    status: 'upcoming'
  }
];

const Timeline: React.FC = () => {
  const { isDark } = useTheme();
  const timelineRef = useRef<HTMLDivElement>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return isDark ? 'bg-green-500' : 'bg-green-600';
      case 'active': return isDark ? 'bg-cyan-500' : 'bg-blue-600';
      case 'upcoming': return isDark ? 'bg-gray-600' : 'bg-gray-400';
      default: return isDark ? 'bg-gray-600' : 'bg-gray-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-center ${
          isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400' 
          : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
        }`}>
          Event Timeline
        </h1>
        <p className={`text-center text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Stay updated with all important dates and milestones
        </p>
      </motion.div>

      <div ref={timelineRef} className="relative">
        {/* Timeline Line */}
        <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
          isDark ? 'bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500' 
          : 'bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500'
        }`}></div>

        {timelineData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative flex items-start mb-12"
          >
            {/* Timeline Dot */}
            <motion.div
              whileHover={{ scale: 1.2 }}
              className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${getStatusColor(item.status)} shadow-lg`}
              style={{
                boxShadow: item.status === 'active' 
                  ? '0 0 20px rgba(0, 255, 255, 0.4)' 
                  : undefined
              }}
            >
              {item.icon}
            </motion.div>

            {/* Content */}
            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: isDark 
                  ? '0 10px 30px rgba(0, 255, 255, 0.1)' 
                  : '0 10px 30px rgba(59, 130, 246, 0.1)'
              }}
              className={`ml-8 p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                isDark 
                  ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                  : 'bg-white/80 border-white/40 hover:bg-white/90'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {item.title}
                </h3>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  item.status === 'completed' 
                    ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600')
                    : item.status === 'active'
                    ? (isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-500/20 text-blue-600')
                    : (isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-500/20 text-gray-600')
                }`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
              <div className={`flex items-center space-x-4 mb-3 text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{item.time}</span>
                </span>
              </div>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {item.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;