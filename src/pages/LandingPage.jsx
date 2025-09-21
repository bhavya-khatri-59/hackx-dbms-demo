import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, LogIn, X, Award, Globe, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTeam } from '../contexts/TeamContext';
import GoogleSignInButton from '../components/GoogleSignInButton';
import vit_vellore from "/assets/vit_vellore.png";
import gravitasLogo from '/assets/gravitas.png';
import hackxpertiseLogo from '/assets/hackXpertise2.0.png';
import PixelBlast from '../PixelBlast/PixelBlast.jsx';

const LoginModal = ({ onClose }) => (
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
      <div className="mx-auto w-full max-w-md bg-black/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-700/50">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Get Started</h3>
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
            <li><span className="font-semibold">VIT Students:</span> Please use your official VIT email ID.</li>
            <li><span className="font-semibold">External Participants:</span> Please use your personal Gmail ID.</li>
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

const LandingPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const { login } = useTeam();
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const navigate = useNavigate();

  const aboutSections = [
    {
      title: 'About HackXpertise 2.0',
      content: "HackXpertise 2.0, the flagship event of IEEE TEMS at graVITas’25, is a dynamic two-day hackathon that brings creativity, collaboration, and innovation to the forefront. This beginner-friendly event introduces participants to the world of hackathons, guiding them through the process, tools, and strategies needed to succeed.",
      icon: Zap,
      image: '/assets/hackXpertise2.0.png',
      height: 'h-30'
    },
    {
      title: 'About VIT Vellore',
      content: "Vellore Institute of Technology (VIT) has always been at the forefront in developing novel technologies and has achieved several National and International accolades.",
      icon: Award,
      image: '/assets/vit_vellore.png',
      height: 'h-40'
    },
    {
      title: 'About IEEE TEMS',
      content: "We are a dynamic and forward-thinking community of students dedicated to advancing the frontiers of technology and engineering management. Our chapter serves as a vibrant hub for innovation, leadership development, and collaboration. At IEEE TEMS VIT, our mission is to ignite curiosity and drive change.",
      icon: Globe,
      image: '/assets/ieee_tems.png',
      height: 'h-60'
    }
  ];

  const AboutSection = ({ section, isReversed }) => {
    const Icon = section.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24 mb-40 varela-round-regular`}
    >
        <motion.div whileHover={{ scale: 1.05 }} className="w-full lg:w-1/2">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img src={section.image} alt={section.title} className={`w-full ${section.height} object-contain transition-transform duration-700 hover:scale-110`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </motion.div>
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="flex items-center space-x-4 varela-round-regular">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white varela-round-regular">{section.title}</h2>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed varela-round-regular">{section.content}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Fixed Black Background */}
      <div className="fixed inset-0 z-0 bg-black">
        <PixelBlast
          variant="square"
          pixelSize={2}
          color="#fad366ff"
          patternScale={2}
          patternDensity={1}
          pixelSizeJitter={0.3}
          enableRipples={true}
          rippleSpeed={0.3}
          rippleThickness={0.08}
          rippleIntensityScale={1.0}
          liquid={false}
          speed={0.5}
          edgeFade={0.25}
          transparent={true}
        />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10">
        {/* SECTION 1: HERO */}
        <section className="h-screen flex flex-col">
          {/* Top Logos */}
          <header className="w-full flex items-center justify-between px-6 pt-6 z-20 shrink-0">
            <img src={vit_vellore} alt="VIT Logo" className="h-8 w-auto object-contain rounded-[5px]" style={{ maxWidth: '100px' }} />
            <div className="flex items-center space-x-4 md:space-x-8">
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
              <img src={gravitasLogo} alt="Gravitas Logo" className="h-8 w-auto object-contain rounded-[5px]" style={{ maxWidth: '100px' }} />
            </div>
          </header>

          {/* Hero Content (Centered) */}
          <div className="flex-grow flex flex-col items-center justify-center px-4 text-center">
            <motion.img
              src={hackxpertiseLogo}
              alt="HackXpertise 2.0 Logo"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-xl md:max-w-3xl" // Increased size
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="varela-round-regular text-xl md:text-2xl text-yellow-300 font-bold mt-6 text-center"
            >
              Hack like a pro !
            </motion.p>
          </div>
        </section>

        {/* SECTION 2: ABOUT US */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 w-full varela-round-regular pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24 mt-24 varela-round-regular"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 varela-round-regular">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent varela-round-regular font-extrabold">
                About Us
              </span>
            </h1>
          </motion.div>
          {aboutSections.map((section, index) => (
            <AboutSection key={section.title} section={section} isReversed={index % 2 === 1} />
          ))}
        </section>
      </div>

      <AnimatePresence>
        {isLoginVisible && <LoginModal onClose={() => setIsLoginVisible(false)} />}
      </AnimatePresence>
    </>
  );
};

export default LandingPage;

