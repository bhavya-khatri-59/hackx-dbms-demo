import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Linkedin, Twitter, Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: '#' },
    { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', href: '#' },
    { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', href: '#' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'Discord', href: '#' }
  ];

  const sponsors = [
    'Google', 'Microsoft', 'Amazon', 'GitHub', 'Figma', 'Vercel'
  ];

  return (
    <footer className={`mt-20 backdrop-blur-md border-t transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900/80 border-white/10' 
        : 'bg-white/80 border-gray-200/50'
    }`}>
      <div className="max-w-7xl mx-auto p-8">
        {/* Sponsors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className={`text-xl font-bold text-center mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Our Sponsors
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: isDark 
                    ? '0 5px 20px rgba(0, 255, 255, 0.2)' 
                    : '0 5px 20px rgba(59, 130, 246, 0.2)'
                }}
                viewport={{ once: true }}
                className={`px-6 py-3 rounded-lg backdrop-blur-md border cursor-pointer transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                    : 'bg-white/60 border-white/40 hover:bg-white/80'
                }`}
              >
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {sponsor}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Links and Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-4 md:mb-0"
          >
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              © 2025 IEEE TEMS VIT Vellore. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4"
          >
            <span className={`text-sm font-medium mr-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Follow Us:
            </span>
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ 
                  scale: 1.2, 
                  y: -2,
                  boxShadow: isDark 
                    ? '0 5px 15px rgba(0, 255, 255, 0.3)' 
                    : '0 5px 15px rgba(59, 130, 246, 0.3)'
                }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-lg backdrop-blur-md border transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/10 border-white/20 hover:bg-white/20 text-gray-300 hover:text-cyan-300' 
                    : 'bg-white/60 border-white/40 hover:bg-white/80 text-gray-600 hover:text-blue-600'
                }`}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;