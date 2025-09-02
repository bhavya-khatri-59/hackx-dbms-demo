import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Search, Filter, Code, Palette, Brain, Database, Smartphone, Globe } from 'lucide-react';

const problemsData = [
  {
    id: 1,
    title: 'Smart City Traffic Management',
    category: 'Hard',
    domain: 'IoT & Smart Systems',
    icon: <Globe className="w-8 h-8" />,
    description: 'Develop an AI-powered traffic management system that optimizes traffic flow in real-time using IoT sensors and machine learning algorithms.',
    requirements: ['Real-time data processing', 'Machine learning models', 'IoT integration', 'Mobile dashboard'],
    difficulty: 'hard'
  },
  {
    id: 2,
    title: 'Sustainable Finance Tracker',
    category: 'Medium',
    domain: 'FinTech',
    icon: <Database className="w-8 h-8" />,
    description: 'Create a personal finance app that helps users track their carbon footprint and suggests sustainable investment options.',
    requirements: ['Data visualization', 'API integration', 'User authentication', 'Responsive design'],
    difficulty: 'medium'
  },
  {
    id: 3,
    title: 'AR Learning Assistant',
    category: 'Hard',
    domain: 'EdTech',
    icon: <Brain className="w-8 h-8" />,
    description: 'Build an augmented reality application that helps students visualize complex concepts in physics and mathematics.',
    requirements: ['AR framework', '3D modeling', 'Educational content', 'Cross-platform compatibility'],
    difficulty: 'hard'
  },
  {
    id: 4,
    title: 'Mental Health Chatbot',
    category: 'Medium',
    domain: 'HealthTech',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Develop an AI-powered chatbot that provides mental health support and connects users with professional resources.',
    requirements: ['Natural language processing', 'Privacy compliance', 'Crisis intervention protocols', 'User engagement features'],
    difficulty: 'medium'
  },
  {
    id: 5,
    title: 'Blockchain Voting System',
    category: 'Hard',
    domain: 'Blockchain',
    icon: <Code className="w-8 h-8" />,
    description: 'Create a secure, transparent voting system using blockchain technology for student elections and organizational decisions.',
    requirements: ['Smart contracts', 'Security protocols', 'User verification', 'Audit trail'],
    difficulty: 'hard'
  },
  {
    id: 6,
    title: 'Creative Portfolio Builder',
    category: 'Easy',
    domain: 'Web Development',
    icon: <Palette className="w-8 h-8" />,
    description: 'Build a drag-and-drop portfolio builder that helps students showcase their projects with beautiful, customizable templates.',
    requirements: ['Drag-and-drop interface', 'Template system', 'Media handling', 'Export functionality'],
    difficulty: 'easy'
  }
];

const ProblemStatements: React.FC = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedProblem, setSelectedProblem] = useState<typeof problemsData[0] | null>(null);

  const filteredProblems = problemsData.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return isDark ? 'text-green-400 bg-green-500/20' : 'text-green-600 bg-green-500/20';
      case 'medium': return isDark ? 'text-yellow-400 bg-yellow-500/20' : 'text-yellow-600 bg-yellow-500/20';
      case 'hard': return isDark ? 'text-red-400 bg-red-500/20' : 'text-red-600 bg-red-500/20';
      default: return isDark ? 'text-gray-400 bg-gray-500/20' : 'text-gray-600 bg-gray-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-center ${
          isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400' 
          : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
        }`}>
          Problem Statements
        </h1>
        <p className={`text-center text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Choose your challenge and start building the future
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8 flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-cyan-500/50' 
                : 'bg-white/60 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500/50'
            }`}
          />
        </div>
        <div className="relative">
          <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className={`pl-10 pr-8 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'bg-white/10 border-white/20 text-white focus:ring-cyan-500/50' 
                : 'bg-white/60 border-gray-300 text-gray-800 focus:ring-blue-500/50'
            }`}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </motion.div>

      {/* Problem Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredProblems.map((problem, index) => (
          <motion.div
            key={problem.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.03, 
              y: -5,
              boxShadow: isDark 
                ? '0 20px 40px rgba(0, 255, 255, 0.15)' 
                : '0 20px 40px rgba(59, 130, 246, 0.15)'
            }}
            onClick={() => setSelectedProblem(problem)}
            className={`p-6 rounded-2xl backdrop-blur-md border cursor-pointer transition-all duration-300 ${
              isDark 
                ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-cyan-500/50' 
                : 'bg-white/80 border-white/40 hover:bg-white/90 hover:border-blue-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                {problem.icon}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                {problem.category}
              </span>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {problem.title}
            </h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-cyan-300' : 'text-blue-600'}`}>
              {problem.domain}
            </p>
            <p className={`text-sm line-clamp-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {problem.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Problem Detail Modal */}
      {selectedProblem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProblem(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-2xl p-8 rounded-2xl backdrop-blur-md border max-h-[80vh] overflow-y-auto ${
              isDark 
                ? 'bg-gray-900/90 border-cyan-500/30' 
                : 'bg-white/95 border-blue-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-lg ${
                isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                {selectedProblem.icon}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(selectedProblem.difficulty)}`}>
                {selectedProblem.category}
              </span>
            </div>
            
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {selectedProblem.title}
            </h2>
            
            <p className={`text-lg mb-6 ${isDark ? 'text-cyan-300' : 'text-blue-600'}`}>
              {selectedProblem.domain}
            </p>
            
            <div className="mb-6">
              <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Problem Description
              </h3>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {selectedProblem.description}
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Requirements
              </h3>
              <ul className="space-y-2">
                {selectedProblem.requirements.map((req, index) => (
                  <li key={index} className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className={`w-2 h-2 rounded-full ${
                      isDark ? 'bg-cyan-400' : 'bg-blue-500'
                    }`}></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button
              onClick={() => setSelectedProblem(null)}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white'
              }`}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProblemStatements;