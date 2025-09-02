import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronDown, ChevronUp, Github, Figma, Video, FileText, Upload } from 'lucide-react';

const Submissions: React.FC = () => {
  const { isDark } = useTheme();
  const [showCriteria, setShowCriteria] = useState(false);
  const [formData, setFormData] = useState({
    githubRepo: '',
    figmaLink: '',
    videoFile: null as File | null,
    docsFile: null as File | null,
    comments: ''
  });

  const criteriaData = [
    {
      icon: <Github className="w-6 h-6" />,
      title: 'GitHub Repository',
      description: 'Well-documented code with clear README and commit history',
      deadline: 'February 2, 2025 - 8:00 PM'
    },
    {
      icon: <Figma className="w-6 h-6" />,
      title: 'Design Files',
      description: 'Complete UI/UX designs, wireframes, and prototypes',
      deadline: 'February 2, 2025 - 8:00 PM'
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: 'Demo Video',
      description: '3-5 minute video demonstrating your solution',
      deadline: 'February 2, 2025 - 8:00 PM'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Documentation',
      description: 'Technical documentation and project report (PDF)',
      deadline: 'February 2, 2025 - 8:00 PM'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Submission successful! Thank you for participating in HackXpertise.');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, [field]: file });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-center ${
          isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400' 
          : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
        }`}>
          Project Submissions
        </h1>
        <p className={`text-center text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Submit your project and showcase your innovation
        </p>
      </motion.div>

      {/* Submission Criteria Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`mb-8 p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
          isDark 
            ? 'bg-white/10 border-white/20' 
            : 'bg-white/80 border-white/40'
        }`}
      >
        <button
          onClick={() => setShowCriteria(!showCriteria)}
          className="w-full flex items-center justify-between"
        >
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Submission Criteria
          </h2>
          {showCriteria ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </button>
        
        {showCriteria && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid md:grid-cols-2 gap-4"
          >
            {criteriaData.map((criteria, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  isDark 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white/50 border-gray-200/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg ${
                    isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-500/20 text-blue-600'
                  }`}>
                    {criteria.icon}
                  </div>
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {criteria.title}
                  </h3>
                </div>
                <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {criteria.description}
                </p>
                <p className={`text-xs font-medium ${
                  isDark ? 'text-cyan-400' : 'text-blue-600'
                }`}>
                  Deadline: {criteria.deadline}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Submission Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`p-8 rounded-2xl backdrop-blur-md border ${
          isDark 
            ? 'bg-white/10 border-white/20' 
            : 'bg-white/80 border-white/40'
        }`}
      >
        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Submit Your Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* GitHub Repository */}
          <div className="relative">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              GitHub Repository Link
            </label>
            <div className="relative">
              <Github className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="url"
                placeholder="https://github.com/username/repository"
                value={formData.githubRepo}
                onChange={(e) => setFormData({ ...formData, githubRepo: e.target.value })}
                required
                className={`w-full pl-10 pr-4 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-cyan-500/50' 
                    : 'bg-white/60 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500/50'
                }`}
              />
            </div>
          </div>

          {/* Figma Link */}
          <div className="relative">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Figma Design Link
            </label>
            <div className="relative">
              <Figma className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="url"
                placeholder="https://figma.com/file/..."
                value={formData.figmaLink}
                onChange={(e) => setFormData({ ...formData, figmaLink: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-cyan-500/50' 
                    : 'bg-white/60 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500/50'
                }`}
              />
            </div>
          </div>

          {/* File Uploads */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Demo Video (MP4)
              </label>
              <div className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                isDark 
                  ? 'border-white/20 hover:border-cyan-500/50 bg-white/5' 
                  : 'border-gray-300 hover:border-blue-500/50 bg-white/50'
              }`}>
                <Video className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, 'videoFile')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {formData.videoFile ? formData.videoFile.name : 'Click to upload video'}
                </p>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Documentation (PDF)
              </label>
              <div className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                isDark 
                  ? 'border-white/20 hover:border-purple-500/50 bg-white/5' 
                  : 'border-gray-300 hover:border-purple-500/50 bg-white/50'
              }`}>
                <FileText className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'docsFile')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {formData.docsFile ? formData.docsFile.name : 'Click to upload PDF'}
                </p>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Additional Comments/Notes
            </label>
            <textarea
              placeholder="Tell us about your project, challenges faced, or any additional information..."
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              rows={4}
              className={`w-full px-4 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
                isDark 
                  ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-cyan-500/50' 
                  : 'bg-white/60 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500/50'
              }`}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span>Submit Project</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Submissions;