import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ProblemStatements from '../components/ProblemStatements';
import Timeline from '../components/Timeline';
import Submissions from '../components/Submissions';
import TeamDetails from '../components/TeamDetails';
import About from '../components/About';
import FAQs from '../components/FAQs';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

const MainPortal: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50'
    }`}>
      <Navigation />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<ProblemStatements />} />
          <Route path="/problems" element={<ProblemStatements />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/team" element={<TeamDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default MainPortal;