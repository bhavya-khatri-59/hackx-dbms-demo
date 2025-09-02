import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-between px-1 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Sun className="w-4 h-4 text-yellow-500" />
      <Moon className="w-4 h-4 text-blue-300" />
      <motion.div
        className="absolute w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-lg"
        animate={{
          x: isDark ? 28 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle;