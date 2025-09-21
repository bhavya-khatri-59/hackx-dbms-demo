import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  FileText, 
  Clock, 
  Upload, 
  Users, 
  Info, 
  HelpCircle, 
  Sun, 
  Moon,
  Menu,
  X,
  Lock,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTeam } from '../contexts/TeamContext';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { hasTeam, logout } = useTeam();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/problems', label: 'Problems', icon: FileText, locked: !hasTeam },
    { path: '/timeline', label: 'Timeline', icon: Clock, locked: !hasTeam },
    //{ path: '/team', label: 'Team', icon: Users },
    { path: '/faq', label: 'FAQ', icon: HelpCircle },
  ];

  const submissionItems = [
    { path: '/submission', label: 'Submit Project' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-4 right-4 z-50 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl"
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 50px rgba(132, 0, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        msBackdropFilter: 'blur(20px)',
        filter: 'progid:DXImageTransform.Microsoft.Blur(pixelradius=20)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              HackXpertise 2.0
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isLocked = item.locked;

              return (
                <div key={item.path} className="relative group">
                  {isLocked ? (
                    <div className="flex items-center px-3 py-2 text-gray-400 dark:text-gray-500 cursor-not-allowed">
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                      <Lock className="w-3 h-3 ml-1" />
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-purple-50/50 dark:bg-purple-900/20'
                          : 'hover:bg-purple-50/30 dark:hover:bg-purple-900/10'
                      }`}
                      style={{
                        color: isActive ? '#9333ea' : '#6b7280',
                      }}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  )}
                  
                  {isLocked && (
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Join a team to unlock
                    </div>
                  )}
                </div>
              );
            })}

            {/* Submission direct link */}
            <Link
              to="/submission"
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-all duration-300"
              style={{ color: '#6b7280' }}
            >
              <Upload className="w-4 h-4 mr-2" />
              Submission
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              style={{ color: '#6b7280' }}
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
                    <Sun className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button> */}

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors duration-300"
            >
              Logout
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2"
              style={{ color: '#6b7280' }}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/30 rounded-b-2xl"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                const isLocked = item.locked;

                return isLocked ? (
                  <div key={item.path} className="flex items-center px-3 py-2 text-gray-400 dark:text-gray-500 cursor-not-allowed">
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                    <Lock className="w-3 h-3 ml-2" />
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-50/50 dark:bg-purple-900/20'
                        : 'hover:bg-purple-50/30 dark:hover:bg-purple-900/10'
                    }`}
                    style={{
                      color: isActive ? '#9333ea' : '#6b7280',
                    }}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
              
              {/* Mobile Submission Links */}
              {submissionItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-2 text-sm hover:bg-purple-50/30 dark:hover:bg-purple-900/10 rounded-lg transition-colors duration-200"
                  style={{ color: '#6b7280' }}
                >
                  <Upload className="w-4 h-4 mr-3 inline" />
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;