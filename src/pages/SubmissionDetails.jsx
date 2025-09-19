import React, { useState, useEffect } from 'react';
import { useTeam } from '../contexts/TeamContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Github, Figma, CheckCircle, FileText, Edit, AlertTriangle, ChevronDown } from 'lucide-react';

const SubmissionDetails = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [round1Data, setRound1Data] = useState({
    problemStatement: '',
    description: '',
    templateUrl: ''
  });
  const [round2Data, setRound2Data] = useState({
    githubUrl: '',
    figmaUrl: '',
    pptUrl: '',
    description: ''
  });
  const [submissions, setSubmissions] = useState({ round1: null, round2: null });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { team } = useTeam();

  // Problem statements for Round 1
  const problemStatements = [
    {
      id: 'ai-healthcare',
      title: 'AI in Healthcare',
      description: 'Develop an AI-powered solution to improve healthcare delivery, diagnosis, or patient care. Consider applications like medical imaging analysis, drug discovery, personalized treatment plans, or remote patient monitoring.'
    },
    {
      id: 'sustainable-tech',
      title: 'Sustainable Technology',
      description: 'Create a technology solution that addresses environmental challenges. This could include renewable energy optimization, waste management systems, carbon footprint tracking, or smart resource management.'
    },
    {
      id: 'fintech-innovation',
      title: 'FinTech Innovation',
      description: 'Build a financial technology solution that improves financial inclusion, security, or user experience. Consider digital payments, blockchain applications, personal finance management, or investment platforms.'
    },
    {
      id: 'education-tech',
      title: 'Education Technology',
      description: 'Design an educational platform or tool that enhances learning experiences. This could include adaptive learning systems, skill assessment platforms, virtual laboratories, or accessibility tools for education.'
    },
    {
      id: 'smart-cities',
      title: 'Smart Cities & IoT',
      description: 'Develop an IoT-based solution for smart city infrastructure. Consider traffic management, smart lighting, waste management, air quality monitoring, or citizen services platforms.'
    }
  ];

  const currentData = currentRound === 1 ? round1Data : round2Data;
  const wordCount = currentData.description.trim().split(/\s+/).filter(word => word.length > 0).length;
  const isWordCountExceeded = wordCount > 1000;

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (team?.code) {
        try {
          // For now, use the existing API and adapt it
          const response = await fetch(`/api/submissions/${team.code}`);
          if (response.ok) {
            const data = await response.json();
            // Assume this is Round 2 data for now
            setRound2Data({
              githubUrl: data.githuburl || '',
              figmaUrl: data.figmaurl || '',
              pptUrl: data.ppturl || '',
              description: data.description || ''
            });
            setSubmissions(prev => ({ ...prev, round2: data }));
          }
        } catch (err) {
          console.error("Error fetching submissions:", err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchSubmissions();
  }, [team]);

  const handleRound1Change = (e) => {
    setRound1Data({
      ...round1Data,
      [e.target.name]: e.target.value
    });
  };

  const handleRound2Change = (e) => {
    setRound2Data({
      ...round2Data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const currentSubmission = submissions[`round${currentRound}`];
    const isUpdate = currentSubmission !== null;

    let body, url, method;

    if (currentRound === 1) {
      body = {
        problemStatement: round1Data.problemStatement,
        description: round1Data.description,
        templateURL: round1Data.templateUrl,
        teamId: team.code,
        round: 1
      };
      url = '/api/submissions';
      method = 'POST';
    } else {
      body = {
        description: round2Data.description,
        githubURL: round2Data.githubUrl,
        figmaURL: round2Data.figmaUrl,
        pptURL: round2Data.pptUrl,
        teamId: team.code,
      };
      url = isUpdate ? `/api/submissions/${team.code}` : '/api/submissions';
      method = isUpdate ? 'PUT' : 'POST';
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to ${isUpdate ? 'update' : 'create'} submission.`);
      }

      setSubmissions(prev => ({ ...prev, [`round${currentRound}`]: data }));
      setIsEditing(false);

    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedProblem = problemStatements.find(p => p.id === round1Data.problemStatement);

  if (isLoading) {
    return <div className="min-h-screen py-12 px-4 text-center dark:text-white">Loading submission details...</div>
  }

  const currentSubmission = submissions[`round${currentRound}`];

  if (currentSubmission && !isEditing) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Round Selector */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-lg p-1">
              <button
                onClick={() => setCurrentRound(1)}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  currentRound === 1
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Round 1
              </button>
              <button
                onClick={() => setCurrentRound(2)}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  currentRound === 2
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Round 2
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Round {currentRound} Submission
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You have submitted your Round {currentRound} project. You can view or update it below.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50 space-y-4"
          >
            {currentRound === 1 ? (
              <>
                <div>
                  <strong className="text-gray-800 dark:text-gray-200">Problem Statement:</strong>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedProblem?.title}</p>
                </div>
                <div>
                  <strong className="text-gray-800 dark:text-gray-200">Template URL:</strong>
                  <a href={currentSubmission.templateurl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all ml-2">
                    {currentSubmission.templateurl}
                  </a>
                </div>
              </>
            ) : (
              <>
                <div>
                  <strong className="text-gray-800 dark:text-gray-200">GitHub:</strong>
                  <a href={currentSubmission.githuburl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all ml-2">
                    {currentSubmission.githuburl}
                  </a>
                </div>
                <div>
                  <strong className="text-gray-800 dark:text-gray-200">Figma:</strong>
                  <a href={currentSubmission.figmaurl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all ml-2">
                    {currentSubmission.figmaurl}
                  </a>
                </div>
                <div>
                  <strong className="text-gray-800 dark:text-gray-200">Presentation:</strong>
                  <a href={currentSubmission.ppturl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all ml-2">
                    {currentSubmission.ppturl}
                  </a>
                </div>
              </>
            )}
            <div className="pt-2">
              <strong className="block mb-2 text-gray-800 dark:text-gray-200">Description:</strong>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{currentSubmission.description}</p>
            </div>
          </motion.div>

          <div className="mt-8 flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
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
      <div className="max-w-4xl mx-auto">
        {/* Round Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setCurrentRound(1)}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                currentRound === 1
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Round 1
            </button>
            <button
              onClick={() => setCurrentRound(2)}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                currentRound === 2
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Round 2
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {isEditing ? `Update Round ${currentRound}` : `Submit Round ${currentRound}`}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {currentRound === 1 
              ? 'Select a problem statement and submit your initial proposal with a presentation template.'
              : 'Upload your final submission with GitHub repository, Figma design, and presentation.'
            }
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
            {currentRound === 1 ? (
              <>
                {/* Problem Statement Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Problem Statement
                  </label>
                  <div className="relative">
                    <select
                      name="problemStatement"
                      value={round1Data.problemStatement}
                      onChange={handleRound1Change}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition appearance-none"
                      required
                    >
                      <option value="">Choose a problem statement...</option>
                      {problemStatements.map((problem) => (
                        <option key={problem.id} value={problem.id}>
                          {problem.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  {selectedProblem && (
                    <div className="mt-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">{selectedProblem.title}</h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">{selectedProblem.description}</p>
                    </div>
                  )}
                </div>

                {/* Template URL */}
                <div className="relative">
                  <FileText className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    name="templateUrl"
                    value={round1Data.templateUrl}
                    onChange={handleRound1Change}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition"
                    placeholder="PPT Template URL"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 pl-1">
                    Please provide a public Google Drive link to your PPT template.
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Round 2 Fields */}
                <div className="relative">
                  <Github className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    name="githubUrl"
                    value={round2Data.githubUrl}
                    onChange={handleRound2Change}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition"
                    placeholder="GitHub Repository URL"
                    required
                  />
                </div>
                <div className="relative">
                  <Figma className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    name="figmaUrl"
                    value={round2Data.figmaUrl}
                    onChange={handleRound2Change}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition"
                    placeholder="Figma Design URL"
                    required
                  />
                </div>
                <div className="relative">
                  <FileText className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    name="pptUrl"
                    value={round2Data.pptUrl}
                    onChange={handleRound2Change}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition"
                    placeholder="Presentation URL"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 pl-1">
                    Please provide a public Google Drive link to your PPT.
                  </p>
                </div>
              </>
            )}

            {/* Description field for both rounds */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Description
              </label>
              <textarea
                name="description"
                value={currentData.description}
                onChange={currentRound === 1 ? handleRound1Change : handleRound2Change}
                rows="8"
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition resize-none"
                placeholder={currentRound === 1 
                  ? "Provide a detailed description of your proposed solution approach. Explain how you plan to tackle the selected problem statement, your methodology, expected outcomes, and implementation strategy."
                  : "Provide a detailed description for evaluation. Explain the problem statement, your approach, an overview of your code, your Figma design process, and what the presentation covers."
                }
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
              <span>
                {isSubmitting 
                  ? (isEditing ? 'Updating...' : 'Submitting...') 
                  : (isEditing ? `Update Round ${currentRound}` : `Submit Round ${currentRound}`)
                }
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmissionDetails;

