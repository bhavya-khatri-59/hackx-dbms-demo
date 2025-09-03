import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Users, ArrowRight } from 'lucide-react';

const TeamGateModal = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        {/* Blurred Background Effect */}
        <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm" />
        
        {/* Modal Content */}
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50 text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <Lock className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Team Required
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Please create or join a team to unlock this section. Teams are required to access problem statements and timeline information.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/dashboard'}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Users className="w-5 h-5" />
            <span>Go to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <div className="mt-8 flex justify-center space-x-8">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Create Team</span>
            </div>
            
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Join Team</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeamGateModal;