import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTeam } from '../contexts/TeamContext';
import gsap from 'gsap';

import GoogleSignInButton from '../components/GoogleSignInButton';
import { Award, Globe, Zap, Heart } from 'lucide-react';
import vitLogo from "/assets/VitLogo.png";
import gravitasLogo from '/assets/gravitas.png';

const LandingPage = () => {
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
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
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
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
            className="flex items-center space-x-4 varela-round-regular"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white varela-round-regular">{section.title}</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed varela-round-regular"
          >
            {section.content}
          </motion.p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Top Logos Row */}
      <div className="w-full flex items-center justify-between px-6 pt-6 z-20 relative">
        {/* VIT Logo - Leftmost */}
        <img
          src={vitLogo}
          alt="VIT Logo"
          className="h-8 w-auto object-contain rounded-[5px]" // Reduced height for smaller logo
          style={{ maxWidth: '100px' }} // Reduced maxWidth
        />
        {/* Right side: Theme Toggle + Gravitas Logo */}
        <div className="flex items-center space-x-8">
          {/* Theme Toggle - left of Gravitas logo */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
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
                  <Sun className="w-3 h-3 text-yellow-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon className="w-3 h-3 text-purple-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          {/* Gravitas Logo - Rightmost */}
          <img
            src={gravitasLogo}
            alt="Gravitas Logo"
            className="h-8 w-auto object-contain rounded-[5px]" // Reduced height for smaller logo
            style={{ maxWidth: '100px' }} // Reduced maxWidth
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
          className="text-center mb-12 mt-20"
        >
          <h1 className="rubik-doodle-shadow-regular  text-6xl md:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              HackXpertise 2.0
            </span>
          </h1>
          <p className="varela-round-regular text-xl md:text-2xl text-black-600 dark:text-gray-300 font-bold mt-10 ">
            Hack like a pro !
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Single box with text and button */}
          <div className="mx-auto w-full bg-blue-100 rounded-md shadow text-center py-6 px-6 font-semibold text-base text-gray-800 border border-black border-dotted dark:border-white flex flex-col items-center">
            <div className="mb-4 text-base font-semibold">
              Click here to Sign in👇
            </div>
            <GoogleSignInButton onSuccess={handleGoogleResponse} />
          </div>
          <div className="mt-4 mx-auto max-w-md bg-blue-100 rounded-md shadow text-left py-3 px-5 text-gray-800 border border-black border-dotted dark:border-white">
            <ul className="list-disc pl-5 space-y-1 text-base font-medium">
              <li>Use VIT mail ID for VIT students</li>
              <li>Use personal Gmail ID for External Participants</li>
            </ul>
          </div>
        </motion.div>

        {/* About Us Section (moved from About.jsx) */}
        <div className="max-w-6xl mx-auto mt-12 px-2 w-full varela-round-regular">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20 mt-20 varela-round-regular" // <-- Increased mt-20 for more gap
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
    </div>
  );
};

export default LandingPage;
