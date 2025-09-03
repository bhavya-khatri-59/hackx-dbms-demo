import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTeam } from '../contexts/TeamContext';
import gsap from 'gsap';

const LandingPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    phone: '',
    gender: '',
    password: ''
  });
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
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-blue-400/20 dark:bg-purple-400/20 rounded-full';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock authentication
    const userData = isSignUp ? {
      id: Math.random().toString(),
      name: formData.name,
      email: formData.email,
      branch: formData.branch,
      phone: formData.phone,
      gender: formData.gender
    } : {
      id: Math.random().toString(),
      name: 'User Name',
      email: formData.email
    };

    login(userData);
    navigate('/dashboard');
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
            {/* Toggle Buttons */}
            <div className="flex mb-6 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg p-1">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  !isSignUp 
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  isSignUp 
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {isSignUp ? (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-transparent peer"
                        placeholder="Full Name"
                        required
                      />
                      <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:top-1 peer-valid:text-xs">
                        Full Name
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-transparent peer"
                        placeholder="Email"
                        required
                      />
                      <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:top-1 peer-valid:text-xs">
                        Email
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-transparent peer"
                        placeholder="Branch"
                        required
                      />
                      <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:top-1 peer-valid:text-xs">
                        Branch
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-transparent peer"
                        placeholder="Phone Number"
                        required
                      />
                      <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:top-1 peer-valid:text-xs">
                        Phone Number
                      </label>
                    </div>

                    <div className="relative">
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signin"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-transparent peer"
                        placeholder="Email"
                        required
                      />
                      <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:top-1 peer-valid:text-xs">
                        Email
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Password field (common for both) */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-transparent peer"
                  placeholder="Password"
                  required
                />
                <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:top-1 peer-valid:text-xs">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </motion.button>
            </form>
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