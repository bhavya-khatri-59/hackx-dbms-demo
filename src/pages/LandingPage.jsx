import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, LogIn, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTeam } from '../contexts/TeamContext';
import gsap from 'gsap';

import GoogleSignInButton from '../components/GoogleSignInButton';
import { Award, Globe, Zap } from 'lucide-react';
import vitLogo from "/assets/VitLogo.png";
import gravitasLogo from '/assets/gravitas.png';

// This is the new component for the Login Modal
const LoginModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md"
      >
        <div className="mx-auto w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Get Started
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sign in to create or join a team.
            </p>
            <GoogleSignInButton />
          </div>

          <div className="my-6 flex items-center" aria-hidden="true">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">Instructions</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          
          <div className="text-left text-sm text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">VIT Students:</span> Please use your official VIT email ID.
              </li>
              <li>
                <span className="font-semibold">External Participants:</span> Please use your personal Gmail ID.
              </li>
            </ul>
          </div>
        </div>
        <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-lg text-gray-600 dark:text-gray-300"
            aria-label="Close login modal"
        >
            <X size={16} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};


const LandingPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const { login } = useTeam();
  const [isLoginVisible, setIsLoginVisible] = useState(false);
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


  // About sections data
  const aboutSections = [
    {
      title: 'About HackXpertise 2.0',
      content: "HackXpertise 2.0, the flagship event of IEEE TEMS at graVITas’25, is a dynamic two-day hackathon that brings creativity, collaboration, and innovation to the forefront. This beginner-friendly event introduces participants to the world of hackathons, guiding them through the process, tools, and strategies needed to succeed.",
      icon: Zap,
      image: '../../assets/hackxlogo.png'
    },
    {
      title: 'About Gravitas',
      content: "Gravitas is VIT Vellore's annual technical festival, celebrating innovation and technical excellence. As one of India's largest technical festivals, Gravitas provides a platform for students to showcase their skills and connect with industry leaders.",
      icon: Award,
      image: '../../assets/gravitas.png'
    },
    {
      title: 'About IEEE TEMS',
      content: "We are a dynamic and forward-thinking community of students dedicated to advancing the frontiers of technology and engineering management. Our chapter serves as a vibrant hub for innovation, leadership development, and collaboration. At IEEE TEMS VIT, our mission is to ignite curiosity and drive change.",
      icon: Globe,
      image: '../../assets/tems.png'
    }
  ];

  // AboutSection component
  const AboutSection = ({ section, index, isReversed }) => {
    const Icon = section.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 mb-20 varela-round-regular`}
      >
        {/* Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-full lg:w-1/2"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-80 object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div
            className="flex items-center space-x-4 varela-round-regular"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white varela-round-regular">{section.title}</h2>
          </div>

          <p
            className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed varela-round-regular"
          >
            {section.content}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <>
    <div className="min-h-screen relative overflow-hidden">
      {/* Top Logos Row */}
      <div className="w-full flex items-center justify-between px-6 pt-6 z-20 relative">
        {/* VIT Logo - Leftmost */}
        <img
          src={vitLogo}
          alt="VIT Logo"
          className="h-8 w-auto object-contain rounded-[5px]"
          style={{ maxWidth: '100px' }}
        />
        {/* Right side: Login, Theme Toggle + Gravitas Logo */}
        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Log In Button */}
           <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLoginVisible(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              <LogIn size={14} />
              <span>Log In</span>
            </motion.button>
          {/* Theme Toggle */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div key="sun" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} transition={{ duration: 0.3 }}>
                  <Sun className="w-3 h-3 text-yellow-500" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -180 }} transition={{ duration: 0.3 }}>
                  <Moon className="w-3 h-3 text-purple-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          {/* Gravitas Logo */}
          <img
            src={gravitasLogo}
            alt="Gravitas Logo"
            className="h-8 w-auto object-contain rounded-[5px]"
            style={{ maxWidth: '100px' }}
          />
        </div>
      </div>
      {/* Animated Background */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo and Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="rubik-doodle-shadow-regular text-6xl md:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              HackXpertise 2.0
            </span>
          </h1>
          <p className="varela-round-regular text-xl md:text-2xl text-black-600 dark:text-gray-300 font-bold mt-10 ">
            Hack like a pro !
          </p>
        </motion.div>
      </div>

      {/* About Us Section */}
      <div className="relative z-10 max-w-6xl mx-auto mt-12 px-2 w-full varela-round-regular">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 mt-20 varela-round-regular"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 varela-round-regular">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent varela-round-regular font-extrabold">
              About Us
            </span>
          </h1>
        </motion.div>
        {aboutSections.map((section, index) => (
          <AboutSection
            key={section.title}
            section={section}
            index={index}
            isReversed={index % 2 === 1}
          />
        ))}
      </div>
    </div>
      
    <AnimatePresence>
        {isLoginVisible && <LoginModal onClose={() => setIsLoginVisible(false)} />}
    </AnimatePresence>
    </>
  );
};

export default LandingPage;

