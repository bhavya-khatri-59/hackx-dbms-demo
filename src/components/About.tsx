import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Users, Trophy, Clock, Building } from 'lucide-react';

const About: React.FC = () => {
  const { isDark } = useTheme();
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });
  const [animatedStats, setAnimatedStats] = useState({
    participants: 0,
    teams: 0,
    hours: 0,
    sponsors: 0
  });

  const finalStats = {
    participants: 500,
    teams: 125,
    hours: 48,
    sponsors: 15
  };

  useEffect(() => {
    if (isStatsInView) {
      const animateValue = (key: keyof typeof finalStats, finalValue: number) => {
        let startValue = 0;
        const duration = 2000;
        const increment = finalValue / (duration / 50);
        
        const timer = setInterval(() => {
          startValue += increment;
          if (startValue >= finalValue) {
            setAnimatedStats(prev => ({ ...prev, [key]: finalValue }));
            clearInterval(timer);
          } else {
            setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(startValue) }));
          }
        }, 50);
      };

      Object.entries(finalStats).forEach(([key, value]) => {
        animateValue(key as keyof typeof finalStats, value);
      });
    }
  }, [isStatsInView]);

  const sections = [
    {
      title: 'About IEEE TEMS',
      content: 'IEEE Technology and Engineering Management Society (TEMS) focuses on the management sciences and practices required for defining, implementing, and managing engineering and technology. Our society brings together professionals from academia and industry to share knowledge and advance the field of technology management.'
    },
    {
      title: 'About VIT Vellore',
      content: 'Vellore Institute of Technology is a premier institution known for its excellence in engineering education and research. With state-of-the-art facilities and a commitment to innovation, VIT has consistently ranked among the top engineering colleges in India, fostering creativity and technological advancement.'
    },
    {
      title: 'About HackXpertise',
      content: 'HackXpertise is our flagship hackathon event that brings together the brightest minds to solve real-world problems through innovative technology solutions. This 48-hour coding marathon challenges participants to think creatively, collaborate effectively, and build solutions that can make a meaningful impact.'
    },
    {
      title: 'About Gravitas',
      content: 'Gravitas is VIT\'s annual technical festival, one of South India\'s largest student-run technical festivals. It serves as a platform for students to showcase their technical prowess, learn from industry experts, and connect with like-minded innovators from across the country.'
    }
  ];

  const statsData = [
    {
      icon: <Users className="w-8 h-8" />,
      label: 'Participants',
      value: animatedStats.participants,
      color: isDark ? 'from-cyan-500 to-blue-600' : 'from-blue-500 to-purple-600'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      label: 'Teams',
      value: animatedStats.teams,
      color: isDark ? 'from-purple-500 to-pink-600' : 'from-purple-500 to-blue-600'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      label: 'Hours',
      value: animatedStats.hours,
      color: isDark ? 'from-green-500 to-cyan-600' : 'from-green-500 to-blue-600'
    },
    {
      icon: <Building className="w-8 h-8" />,
      label: 'Sponsors',
      value: animatedStats.sponsors,
      color: isDark ? 'from-orange-500 to-red-600' : 'from-orange-500 to-pink-600'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
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
          About Us
        </h1>
        <p className={`text-center text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Learn more about our organization and event
        </p>
      </motion.div>

      {/* About Sections */}
      <div className="space-y-8 mb-16">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
              isDark 
                ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                : 'bg-white/80 border-white/40 hover:bg-white/90'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
            }`}
            style={{
              filter: isDark ? 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.2))' : 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.2))'
            }}>
              {section.title}
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Statistics Section */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className={`text-3xl font-bold mb-8 text-center ${
          isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400' 
          : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
        }`}
        style={{
          filter: isDark ? 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.3))' : 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))'
        }}>
          HackXpertise by the Numbers
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: isDark 
                  ? '0 15px 30px rgba(0, 255, 255, 0.2)' 
                  : '0 15px 30px rgba(59, 130, 246, 0.2)'
              }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl backdrop-blur-md border text-center transition-all duration-300 ${
                isDark 
                  ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                  : 'bg-white/80 border-white/40 hover:bg-white/90'
              }`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-r ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {stat.value}+
              </div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;