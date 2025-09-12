import React, { useState, useEffect } from 'react';
import { useTeam } from '../contexts/TeamContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Github, Figma, CheckCircle, FileText, Edit, AlertTriangle } from 'lucide-react';

const SubmissionDetails = () => {
  const [formData, setFormData] = useState({
    githubUrl: '',
    figmaUrl: '',
    pptUrl: '',
    description: ''
  });
  const [submission, setSubmission] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { team } = useTeam();

  useEffect(() => {
    const fetchSubmission = async () => {
      if (team?.code) {
        try {
          const response = await fetch(`/api/submissions/${team.code}`);
          if (response.ok) {
            const data = await response.json();
            setFormData({
                githubUrl: data.githuburl || '',
                figmaUrl: data.figmaurl || '',
                pptUrl: data.ppturl || '',
                description: data.description || ''
            });
            setSubmission(data);
          }
        } catch (err) {
          console.error("No submission found or error fetching:", err);
        } finally {
            setIsLoading(false);
        }
      } else {
        setIsLoading(false);
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
    setIsSubmitting(true);
    setError('');

    const body = {
        description: formData.description,
        githubURL: formData.githubUrl,
        figmaURL: formData.figmaUrl,
        pptURL: formData.pptUrl,
        teamId: team.code,
    };

    try {
        const url = submission ? `/api/submissions/${team.code}` : '/api/submissions';
        const method = submission ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Failed to ${submission ? 'update' : 'create'} submission.`);
        }

        setSubmission(data);
        setIsEditing(false);

    } catch (err) {
        setError(err.message);
        setTimeout(() => setError(''), 5000);
    } finally {
        setIsSubmitting(false);
    }
  };

  const wordCount = formData.description ? formData.description.trim().split(/\s+/).filter(Boolean).length : 0;
  const isWordCountExceeded = wordCount > 1000;

  if (isLoading) {
    return <div className="min-h-screen py-12 px-4 text-center dark:text-white">Loading submission details...</div>
  }

  if (submission && !isEditing) {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Your Submission
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        You have submitted your project. You can view or update it below.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50 space-y-4"
                >
                    <div><strong className="text-gray-800 dark:text-gray-200">GitHub:</strong> <a href={submission.githuburl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all ml-2">{submission.githuburl}</a></div>
                    <div><strong className="text-gray-800 dark:text-gray-200">Figma:</strong> <a href={submission.figmaurl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all ml-2">{submission.figmaurl}</a></div>
                    <div><strong className="text-gray-800 dark:text-gray-200">Presentation:</strong> <a href={submission.ppturl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all ml-2">{submission.ppturl}</a></div>
                    <div className="pt-2">
                        <strong className="block mb-2 text-gray-800 dark:text-gray-200">Description:</strong>
                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{submission.description}</p>
                    </div>
                </motion.div>
                 <div className="mt-8 flex justify-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                    >
                        <Edit className="w-5 h-5"/> Update Submission
                    </motion.button>
                </div>
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
            {isEditing ? 'Update Your Project' : 'Submit Your Project'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {isEditing ? 'Make changes to your submission details below.' : 'Upload your final submission and showcase your innovation.'}
          </p>
        </motion.div>
        
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-8"
            >
              <AlertTriangle className="w-5 h-5"/> {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
                <Github className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition" placeholder="GitHub Repository URL" required/>
            </div>
            <div className="relative">
                <Figma className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input type="url" name="figmaUrl" value={formData.figmaUrl} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition" placeholder="Figma Design URL" required/>
            </div>
            <div className="relative">
                <FileText className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input type="url" name="pptUrl" value={formData.pptUrl} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition" placeholder="Presentation URL" required/>
                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 pl-1">Please provide a public Google Drive link to your PPT.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="8"
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition resize-none"
                placeholder="Provide a detailed description for evaluation. Explain the problem statement, your approach, an overview of your code, your Figma design process, and what the presentation covers."
                required
              />
              <div className={`text-sm mt-2 text-right ${isWordCountExceeded ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                {wordCount} / 1000 words
              </div>
               <AnimatePresence>
                {isWordCountExceeded && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-2"
                    >
                        <AlertTriangle className="w-4 h-4"/> Word count limit exceeded.
                    </motion.div>
                )}
               </AnimatePresence>
            </div>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isWordCountExceeded || isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-5 h-5" />
              <span>{isSubmitting ? (isEditing ? 'Updating...' : 'Submitting...') : (isEditing ? 'Update Submission' : 'Submit Project')}</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmissionDetails;

