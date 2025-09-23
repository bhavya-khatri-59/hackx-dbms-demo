import React, { useState, useEffect } from 'react';
import { useTeam } from '../contexts/TeamContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Github, Figma, CheckCircle, FileText, Edit, AlertTriangle, ChevronDown, Lock, ChevronUp } from 'lucide-react';
import { apiFetch } from '../config/api.js';

// A new component to handle long, expandable text descriptions
const ExpandableText = ({ text, maxLength = 250 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) {
    return <p className="text-gray-600 dark:text-gray-400 italic" style={{ color: '#9CA3AF' }}>No description provided.</p>;
  }

  const isLongText = text.length > maxLength;
  const displayText = isExpanded ? text : `${text.substring(0, maxLength)}${isLongText ? '...' : ''}`;

  return (
    <div>
      <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words" style={{ color: '#9CA3AF' }}>{displayText}</p>
      {isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:underline text-sm mt-2 flex items-center gap-1 font-semibold"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}
    </div>
  );
};


const SubmissionDetails = () => {
  const [hackathonRound, setHackathonRound] = useState(1);
  const [viewingRound, setViewingRound] = useState(1);
  const [round1Data, setRound1Data] = useState({ problemStatement: '', description: '', pptTemplateURL: '' });
  const [round2Data, setRound2Data] = useState({ githubURL: '', figmaURL: '', pptURL: '', description: '' });
  const [submissions, setSubmissions] = useState({ round1: null, round2: null });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hasError, setHasError] = useState(false);
  const { team } = useTeam();

  // Add error boundary logic
  React.useEffect(() => {
    const handleError = (error) => {
      console.error('Component error:', error);
      setHasError(true);
      setError(error.message || 'An unexpected error occurred');
      setIsLoading(false);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const problemStatements = [
  { id: 'horror', title: 'HORROR', description: 'Build a digital archive featuring a found document or anomaly report from a secretive organization investigating unexplained paranormal phenomena.' },
  { id: 'health', title: 'HEALTH', description: 'Design a hospital portal for extraterrestrial patients that accommodates diverse species with unique physiologies, communication methods, and medical needs.' },
  { id: 'travel', title: 'TRAVEL', description: 'Develop a Post-Apocalyptic Travel Guide that helps survivors navigate a world after a fictional apocalypse, offering safe routes, resource caches, and community-sourced survival tips.' },
  { id: 'commerce', title: 'COMMERCE', description: 'Create a Yard Sale Surprise platform that delivers a monthly subscription of quirky, unexpected items sourced from local yard sales and flea markets.' },
  { id: 'fashion', title: 'Fashion', description: 'Design an educational and stylish app that lets users explore fashion trends from different historical eras.' },
  { id: 'sustainability', title: 'Sustainability', description: 'Create an Upcycled Product Marketplace where users can buy and sell goods made from repurposed or recycled materials, highlighting the story and transformation behind each product.' }
  ];

  const currentData = viewingRound === 1 ? round1Data : round2Data;
  const wordCount = (currentData?.description || '').trim().split(/\s+/).filter(Boolean).length;
  const isWordCountExceeded = wordCount > 1000;

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!team?.code) {
        setIsLoading(false);
        return;
      }
      
      try {
        const eventRes = await apiFetch('api/events/current');
        const eventData = await eventRes.json();
        const activeRound = eventData.currentID >= 7 ? 2 : 1;
        setHackathonRound(activeRound);
        setViewingRound(activeRound);

        const [res1, res2] = await Promise.all([
            apiFetch(`api/submissions_round1/${team.code}`).catch(() => null),
            apiFetch(`api/submissions/${team.code}`).catch(() => null)
        ]);

        const subs = { round1: null, round2: null };
        
        // Handle Round 1 submission with better error checking
        if (res1?.ok) {
            try {
                const data1 = await res1.json();
                if (data1 && typeof data1 === 'object') {
                    subs.round1 = data1;
                    setRound1Data({
                        problemStatement: data1.problemstatement || data1.problemStatement || '',
                        description: data1.description || '',
                        pptTemplateURL: data1.ppttemplateurl || data1.pptTemplateURL || ''
                    });
                }
            } catch (parseErr) {
                console.warn('Error parsing Round 1 data:', parseErr);
            }
        }
        
        // Handle Round 2 submission with better error checking
        if (res2?.ok) {
            try {
                const data2 = await res2.json();
                if (data2 && typeof data2 === 'object') {
                    subs.round2 = data2;
                    setRound2Data({
                        githubURL: data2.githuburl || '',
                        figmaURL: data2.figmaurl || '',
                        pptURL: data2.ppturl || '',
                        description: data2.description || ''
                    });
                }
            } catch (parseErr) {
                console.warn('Error parsing Round 2 data:', parseErr);
            }
        }
        
        setSubmissions(subs);
        
        // If no submission exists for the current round, show the form
        if (!subs[`round${activeRound}`]) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }

      } catch (err) {
        console.error("Error fetching initial data:", err);
        setHasError(true);
        setError("Could not load submission data. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [team]);

  const handleRound1Change = (e) => setRound1Data({ ...round1Data, [e.target.name]: e.target.value });
  const handleRound2Change = (e) => setRound2Data({ ...round2Data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const isUpdate = submissions[`round${viewingRound}`] !== null;
    let body, url, method;

    if (viewingRound === 1) {
      body = { ...round1Data, teamId: team.code };
      url = 'api/submissions_round1';
      method = 'POST'; 
    } else { 
      body = { ...round2Data, teamId: team.code };
      url = isUpdate ? `api/submissions/${team.code}` : 'api/submissions';
      method = isUpdate ? 'PUT' : 'POST';
    }
    
    try {
      const response = await apiFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Submission failed.');

      setSubmissions(prev => ({ ...prev, [`round${viewingRound}`]: data }));
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const currentSubmission = submissions?.[`round${viewingRound}`];
  const selectedProblem = problemStatements.find(p => p.id === (round1Data?.problemStatement || currentSubmission?.problemstatement || currentSubmission?.problemStatement));

  // Early return for critical errors
  if (hasError) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-8">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4" style={{ color: '#ffffff' }}>Application Error</h1>
            <p className="text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => {
                setHasError(false);
                setError('');
                window.location.reload();
              }} 
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="min-h-screen pt-24 pb-12 px-4 text-center dark:text-white" style={{ color: '#ffffff' }}>Loading...</div>;

  if (error && !submissions?.round1 && !submissions?.round2) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-8">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4" style={{ color: '#ffffff' }}>Error Loading Submissions</h1>
            <p className="text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback UI for missing team
  if (!team) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-8">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4" style={{ color: '#ffffff' }}>No Team Found</h1>
            <p className="text-gray-300 mb-6" style={{ color: '#D1D5DB' }}>Please create or join a team to access submissions.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Round Selector */}
        <div className="flex justify-center mb-8">
            <div className="flex bg-black/20 backdrop-blur-sm rounded-lg p-1">
                <button onClick={() => {
                  setViewingRound(1);
                  setIsEditing(!submissions.round1);
                }} className={`px-6 py-2 rounded-md transition-all duration-300 ${viewingRound === 1 ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-600 dark:text-gray-400'}`} style={{ color: viewingRound === 1 ? '#ffffff' : '#9CA3AF' }}>Round 1</button>
                <button 
                  onClick={() => {
                    setViewingRound(2);
                    setIsEditing(!submissions.round2);
                  }} 
                  disabled={hackathonRound < 2}
                  className={`px-6 py-2 rounded-md transition-all duration-300 flex items-center gap-2 ${viewingRound === 2 ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-600 dark:text-gray-400'} ${hackathonRound < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ color: viewingRound === 2 ? '#ffffff' : '#9CA3AF' }}
                >
                  {hackathonRound < 2 && <Lock size={14} />}
                  Round 2
                </button>
            </div>
        </div>
        
        {currentSubmission && !isEditing ? (
          // VIEW SUBMISSION UI
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
            <div className="text-center mb-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white" style={{ color: '#ffffff' }}>Round {viewingRound} Submitted</h1>
            </div>
            <div className="bg-black/80 p-8 rounded-2xl shadow-xl space-y-6">
              {viewingRound === 1 ? (
                <>
                  <div><strong className="text-gray-800 dark:text-gray-200 block mb-1" style={{ color: '#E5E7EB' }}>Problem Statement:</strong> <p className="text-gray-600 dark:text-gray-400" style={{ color: '#9CA3AF' }}>{selectedProblem?.title || 'N/A'}</p></div>
                  <div><strong className="text-gray-800 dark:text-gray-200 block mb-1" style={{ color: '#E5E7EB' }}>PPT:</strong> <a href={currentSubmission.ppttemplateurl || currentSubmission.pptTemplateURL} className="text-blue-500 hover:underline break-all">{currentSubmission.ppttemplateurl || currentSubmission.pptTemplateURL}</a></div>
                </>
              ) : (
                <>
                  <div><strong className="text-gray-800 dark:text-gray-200 block mb-1" style={{ color: '#E5E7EB' }}>GitHub:</strong> <a href={currentSubmission.githuburl} className="text-blue-500 hover:underline break-all">{currentSubmission.githuburl}</a></div>
                  <div><strong className="text-gray-800 dark:text-gray-200 block mb-1" style={{ color: '#E5E7EB' }}>Figma:</strong> <a href={currentSubmission.figmaurl} className="text-blue-500 hover:underline break-all">{currentSubmission.figmaurl}</a></div>
                  <div><strong className="text-gray-800 dark:text-gray-200 block mb-1" style={{ color: '#E5E7EB' }}>Presentation:</strong> <a href={currentSubmission.ppturl} className="text-blue-500 hover:underline break-all">{currentSubmission.ppturl}</a></div>
                </>
              )}
              <div className="pt-2">
                <strong className="block mb-2 text-gray-800 dark:text-gray-200" style={{ color: '#E5E7EB' }}>Description:</strong>
                <ExpandableText text={currentSubmission.description} />
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)} 
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Edit size={18}/> Update Submission
              </motion.button>
            </div>
          </motion.div>
        ) : (
          // EDIT / CREATE SUBMISSION UI
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {isEditing && submissions[`round${viewingRound}`] ? `Update Round ${viewingRound}` : `Submit Round ${viewingRound}`}
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-black/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-700/50">
              {viewingRound === 1 ? (
                <>
                  {/* Round 1 Form */}
                  <div>
                    <div className="relative">
                      <select name="problemStatement" value={round1Data.problemStatement} onChange={handleRound1Change} required className="w-full px-4 py-3 bg-black border border-gray-600/50 text-white rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition appearance-none">
                          <option value="" disabled>Choose a problem statement...</option>
                          {problemStatements.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="relative">
                    <FileText className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      name="pptTemplateURL"
                      value={round1Data.pptTemplateURL}
                      onChange={handleRound1Change}
                      className="w-full px-4 py-3 pl-12 bg-black/50 border border-gray-600/50 text-white rounded-lg focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all duration-300 peer"
                      placeholder="PPT Template URL"
                      required
                    />
                    {/* Remove floating label, use placeholder only */}
                  </div>
                </>
              ) : (
                <>
                  {/* Round 2 Form */}
                   <div className="relative">
                      <Github className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        name="githubURL"
                        value={round2Data.githubURL}
                        onChange={handleRound2Change}
                        className="w-full px-4 py-3 pl-12 bg-black/50 border border-gray-600/50 text-white rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 peer"
                        placeholder="GitHub Repository URL"
                        required
                      />
                  </div>
                   <div className="relative">
                      <Figma className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        name="figmaURL"
                        value={round2Data.figmaURL}
                        onChange={handleRound2Change}
                        className="w-full px-4 py-3 pl-12 bg-black/50 border border-gray-600/50 text-white rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 peer"
                        placeholder="Figma Design URL"
                        required
                      />
                  </div>
                  <div className="relative">
                      <FileText className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        name="pptURL"
                        value={round2Data.pptURL}
                        onChange={handleRound2Change}
                        className="w-full px-4 py-3 pl-12 bg-black/50 border border-gray-600/50 text-white rounded-lg focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all duration-300 peer"
                        placeholder="Presentation URL (Drive Link)"
                        required
                      />
                  </div>
                </>
              )}
              {/* Common Description */}
              <div>
                <textarea name="description" value={currentData.description} onChange={viewingRound === 1 ? handleRound1Change : handleRound2Change} rows="8" className="w-full px-4 py-3 bg-black/50 border border-gray-600/50 text-white rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition resize-none" placeholder="Provide a detailed project description..." required/>
                <div className={`text-sm mt-2 text-right ${isWordCountExceeded ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`} style={{ color: isWordCountExceeded ? '#EF4444' : '#9CA3AF' }}>{wordCount} / 1000 words</div>
                {isWordCountExceeded && <div className="text-red-500 text-sm mt-1">Word count limit exceeded.</div>}
              </div>
              {error && <div className="text-red-500 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg" style={{ color: '#EF4444' }}>{error}</div>}
              <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || isWordCountExceeded}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-600 hover:via-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload size={18}/>
                  <span>{isSubmitting ? 'Submitting...' : (isEditing && submissions[`round${viewingRound}`] ? `Update Round ${viewingRound}` : `Submit Round ${viewingRound}`)}</span>
                </motion.button>
              {isEditing && currentSubmission && <button type="button" onClick={() => { setIsEditing(false); }} className="w-full mt-2 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg">Cancel</button>}
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SubmissionDetails;

