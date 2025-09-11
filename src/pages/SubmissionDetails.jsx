import React, { useState, useEffect } from 'react';
import { useTeam } from '../contexts/TeamContext';
import { motion } from 'framer-motion';
import { Upload, Github, Figma, CheckCircle } from 'lucide-react';

const SubmissionDetails = () => {
  const [formData, setFormData] = useState({
    githubUrl: '',
    figmaUrl: '',
    comments: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const { team } = useTeam();

  useEffect(() => {
    const fetchSubmission = async () => {
      if (team && team.code) {
        try {
          const response = await fetch(`/api/submissions/${team.code}`);
          if (response.ok) {
            setAlreadySubmitted(true);
          }
        } catch (err) {
          // No submission found or error
        }
      }
    };
    fetchSubmission();
  }, [team]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!team || !team.code) {
      alert('You must be in a team to submit your project.');
      return;
    }
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          githubURL: formData.githubUrl,
          figmaURL: formData.figmaUrl,
          description: formData.comments,
          teamId: team.code,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Submission failed.');
        return;
      }
      setSubmitted(true);
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
  };

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

        {alreadySubmitted || submitted ? (
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
            {alreadySubmitted && (
              <p className="text-red-600 dark:text-red-400 mt-4">You have already submitted.</p>
            )}
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