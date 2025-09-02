import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { Eye, EyeOff } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { isDark } = useTheme();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      setUser({
        id: Math.random().toString(36).substring(2),
        name: formData.name,
        email: formData.email,
        branch: formData.branch,
        phone: formData.phone,
        gender: formData.gender
      });
    }
    navigate('/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen relative transition-all duration-700 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50'
    }`}>
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* IEEE TEMS Logo */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/25">
            <span className="text-white font-bold text-lg">IEEE</span>
          </div>
        </motion.div>

        {/* HackXpertise Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`text-6xl md:text-8xl font-bold mb-4 text-center ${
            isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400' 
            : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600'
          }`}
          style={{
            filter: isDark ? 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.3))' : 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))'
          }}
        >
          HackXpertise
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className={`text-xl md:text-2xl mb-12 text-center ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Where Innovation Meets Excellence
        </motion.p>

        {/* Login/Signup Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-md border shadow-2xl ${
            isDark 
              ? 'bg-white/10 border-white/20 shadow-cyan-500/10' 
              : 'bg-white/80 border-white/40 shadow-blue-500/10'
          }`}
        >
          {/* Toggle Buttons */}
          <div className="flex mb-6 p-1 bg-gray-200/20 rounded-lg">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                !isSignUp 
                  ? (isDark ? 'bg-cyan-500/30 text-cyan-300' : 'bg-blue-500/30 text-blue-700')
                  : (isDark ? 'text-gray-400' : 'text-gray-500')
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                isSignUp 
                  ? (isDark ? 'bg-cyan-500/30 text-cyan-300' : 'bg-blue-500/30 text-blue-700')
                  : (isDark ? 'text-gray-400' : 'text-gray-500')
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-cyan-500/50' 
                        : 'bg-white/60 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500/50'
                    }`}
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="branch"
                    placeholder="Branch (e.g., CSE, ECE)"
                    value={formData.branch}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-cyan-500/50' 
                        : 'bg-white/60 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500/50'
                    }`}
                  />
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-cyan-500/50' 
                        : 'bg-white/60 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500/50'
                    }`}
                  />
                </div>
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white focus:ring-cyan-500/50' 
                        : 'bg-white/60 border-gray-300 text-gray-800 focus:ring-blue-500/50'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}
            
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-cyan-500/50' 
                    : 'bg-white/60 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500/50'
                }`}
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 pr-12 rounded-lg backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-cyan-500/50' 
                    : 'bg-white/60 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500/50'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  isDark ? 'text-gray-400 hover:text-cyan-300' : 'text-gray-500 hover:text-blue-600'
                } transition-colors duration-200`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25'
              }`}
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;