import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  Video, 
  Github, 
  Figma,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const SubmissionDetails = () => {
  const [formData, setFormData] = useState({
    githubUrl: '',
    figmaUrl: '',
    comments: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  const isCriteria = location.pathname.includes('criteria');

  const submissionCriteria = [
    {
      title: 'GitHub Repository',
      description: 'Complete source code with proper documentation and README',
      icon: Github,
      required: true,
      deadline: 'Jan 19, 2025 - 6:00 PM'
    },
    {
      title: 'Figma Design',
      description: 'UI/UX designs, wireframes, and prototypes',
      icon: Figma,
      required: true,
      deadline: 'Jan 19, 2025 - 6:00 PM'
    },
    {
      title: 'Demo Video',
      description: 'Maximum 5-minute video demonstrating your solution',
      icon: Video,
      required: true,
      deadline: 'Jan 19, 2025 - 5:30 PM'
    },
    {
      title: 'Documentation',
      description: 'Technical documentation and setup instructions',
      icon: FileText,
      required: true,
      deadline: 'Jan 19, 2025 - 6:00 PM'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the data to your backend
  };

  if (isCriteria) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Submission Criteria
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Review all requirements before submitting your project
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {submissionCriteria.map((criterion, index) => {
              const Icon = criterion.icon;
              return (
                <motion.div
                  key={criterion.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{criterion.title}</h3>
                      {criterion.required && (
                        <span className="inline-flex items-center text-xs font-medium text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Required
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{criterion.description}</p>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {criterion.deadline}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/50"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Important Notes</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>All submissions must be original work created during the hackathon period</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Late submissions will not be accepted under any circumstances</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Teams can update their submissions until the final deadline</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Submit Your Project
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload your final submission and showcase your innovation
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-12 text-center border border-green-200/50 dark:border-green-700/50"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">
              Submission Successful! 🎉
            </h2>
            <p className="text-green-700 dark:text-green-300">
              Your project has been submitted successfully. Good luck!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-transparent peer"
                  placeholder="GitHub Repository URL"
                  required
                />
                <Github className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                <label className="absolute left-12 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:top-1 peer-valid:text-xs">
                  GitHub Repository URL
                </label>
              </div>

              <div className="relative">
                <input
                  type="url"
                  name="figmaUrl"
                  value={formData.figmaUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 placeholder-transparent peer"
                  placeholder="Figma Design URL"
                  required
                />
                <Figma className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                <label className="absolute left-12 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-500 peer-valid:top-1 peer-valid:text-xs">
                  Figma Design URL
                </label>
              </div>

              <div className="relative">
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300 placeholder-transparent peer resize-none"
                  placeholder="Additional comments or notes about your project (optional)"
                />
                <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-teal-500 peer-valid:top-1 peer-valid:text-xs">
                  Additional Comments (Optional)
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Submit Project</span>
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SubmissionDetails;