import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTeam } from '../contexts/TeamContext';
import gsap from 'gsap';

import GoogleSignInButton from '../components/GoogleSignInButton';

const LandingPage = () => {
  const [stats] = useState({
    participants: 2847,
    teams: 512,
    hours: 36
  });

  const { isDark, toggleTheme } = useTheme();
  const { login } = useTeam();
  const navigate = useNavigate();
  const particlesRef = useRef(null);

  useEffect(() => {
    // GSAP particle animation
    const particles = [];
    const container = particlesRef.current;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-blue-400/20 dark:bg-purple-400/20 rounded-full';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      container.appendChild(particle);
      particles.push(particle);
    }

    particles.forEach((particle, index) => {
      gsap.to(particle, {
        duration: 3 + Math.random() * 4,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        scale: 0.5 + Math.random() * 0.5,
        rotation: Math.random() * 360,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.1
      });
    });

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  // ✅ Log when Google Sign-In works
  const handleGoogleResponse = (response) => {
    console.log("Google Sign-In success!");
    console.log("Encoded JWT ID token:", response.credential);
    alert("Google Sign-In worked! 🎉");
  };

  const CounterDisplay = ({ label, value, delay }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        const increment = Math.ceil(value / 50);
        let current = 0;
        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(interval);
          } else {
            setCount(current);
          }
        }, 30);
      }, delay);

      return () => clearTimeout(timer);
    }, [value, delay]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay / 1000 + 1 }}
        className="text-center"
      >
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {count.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />

      {/* Theme Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="w-5 h-5 text-yellow-500" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="w-5 h-5 text-purple-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo and Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              HackXpertise
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light">
            Where Innovation Meets Excellence
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/30 dark:border-gray-700/30">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-full flex flex-col items-center">
                {/* ✅ Pass the callback into the Google button */}
                <GoogleSignInButton onSuccess={handleGoogleResponse} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Counters */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-8 md:gap-16"
        >
          <CounterDisplay label="Participants" value={stats.participants} delay={500} />
          <CounterDisplay label="Teams" value={stats.teams} delay={750} />
          <CounterDisplay label="Hours Left" value={stats.hours} delay={1000} />
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
