import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Tag, X, Users, ArrowRight } from 'lucide-react';
import { useTeam } from '../contexts/TeamContext';
import TeamGateModal from '../components/TeamGateModal';

const problemStatements = [
  {
    id: 1,
    title: 'Smart City Traffic Management',
    description: 'Develop an AI-powered traffic management system that optimizes traffic flow and reduces congestion in urban areas.',
    tags: ['AI/ML', 'IoT', 'Urban Tech'],
    requirements: [
      'Real-time traffic data processing',
      'Machine learning algorithms for pattern recognition', 
      'User-friendly dashboard interface',
      'Integration with existing traffic infrastructure'
    ],
    constraints: [
      'Must work with limited computational resources',
      'Response time should be under 2 seconds',
      'Should handle at least 1000 concurrent requests'
    ],
    submission: 'Submit a working prototype with documentation, demo video, and deployment instructions.'
  },
  {
    id: 2,
    title: 'Healthcare Data Analytics Platform',
    description: 'Create a comprehensive platform for analyzing healthcare data to improve patient outcomes and operational efficiency.',
    tags: ['Healthcare', 'Data Analytics', 'Privacy'],
    requirements: [
      'Secure patient data handling (HIPAA compliant)',
      'Advanced analytics and visualization tools',
      'Predictive modeling capabilities',
      'Multi-role access control'
    ],
    constraints: [
      'Must comply with healthcare data regulations',
      'End-to-end encryption required',
      'Audit trail for all data access'
    ],
    submission: 'Provide a secure demo environment with sample (anonymized) data and comprehensive security documentation.'
  },
  {
    id: 3,
    title: 'Sustainable Finance Tracker',
    description: 'Build a personal finance application that helps users make environmentally conscious spending decisions.',
    tags: ['FinTech', 'Sustainability', 'Mobile'],
    requirements: [
      'Carbon footprint calculation for purchases',
      'Investment tracking with ESG scores',
      'Personalized sustainability recommendations',
      'Integration with banking APIs'
    ],
    constraints: [
      'Mobile-first responsive design',
      'Offline functionality required',
      'Bank-level security standards'
    ],
    submission: 'Deploy a functional web/mobile app with API integration and demonstrate real-world usage scenarios.'
  },
  {
    id: 4,
    title: 'Educational AR/VR Learning Platform',
    description: 'Design an immersive learning platform using AR/VR technologies to enhance educational experiences.',
    tags: ['AR/VR', 'Education', 'Innovation'],
    requirements: [
      'Interactive 3D learning modules',
      'Progress tracking and assessment tools',
      'Multi-platform compatibility',
      'Teacher dashboard for content management'
    ],
    constraints: [
      'Compatible with standard VR headsets',
      'Optimized for web-based AR',
      'Accessible design for diverse learners'
    ],
    submission: 'Create a working AR/VR experience with multiple learning modules and provide setup instructions.'
  },
  {
    id: 5,
    title: 'Blockchain Supply Chain Solution',
    description: 'Develop a blockchain-based solution for transparent and efficient supply chain management.',
    tags: ['Blockchain', 'Supply Chain', 'Transparency'],
    requirements: [
      'Immutable transaction records',
      'Smart contract automation',
      'Multi-stakeholder dashboard',
      'QR code integration for product tracking'
    ],
    constraints: [
      'Gas-efficient smart contracts',
      'Scalable for enterprise use',
      'User-friendly interface for non-technical users'
    ],
    submission: 'Deploy smart contracts on testnet and provide a complete dApp with documentation.'
  },
  {
    id: 6,
    title: 'Mental Health & Wellness App',
    description: 'Create a comprehensive mental health platform with AI-powered insights and community support features.',
    tags: ['Mental Health', 'AI', 'Community'],
    requirements: [
      'Mood tracking and analytics',
      'AI-powered recommendations',
      'Peer support community features',
      'Integration with professional help resources'
    ],
    constraints: [
      'GDPR compliant data handling',
      'Crisis intervention protocols',
      'Accessibility for users with disabilities'
    ],
    submission: 'Build a functional prototype with user journey documentation and privacy impact assessment.'
  }
];

const ProblemStatements = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const { hasTeam } = useTeam();

  if (!hasTeam) {
    return <TeamGateModal />;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Problem Statements
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose your challenge and build something extraordinary
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemStatements.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)'
              }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50 cursor-pointer hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-500"
              onClick={() => setSelectedProblem(problem)}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{problem.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{problem.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {problem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-xs font-medium"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center space-x-2 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Problem Detail Modal */}
        <AnimatePresence>
          {selectedProblem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProblem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedProblem.title}</h2>
                  <button
                    onClick={() => setSelectedProblem(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{selectedProblem.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Requirements</h3>
                    <ul className="space-y-2">
                      {selectedProblem.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Constraints</h3>
                    <ul className="space-y-2">
                      {selectedProblem.constraints.map((constraint, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{constraint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Submission Notes</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedProblem.submission}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedProblem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProblemStatements;