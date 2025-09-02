import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { Users, Plus } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { createTeam, joinTeam } = useUser();
  const { isDark } = useTheme();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      const code = createTeam(teamName);
      setGeneratedCode(code);
      setTimeout(() => navigate('/portal'), 2000);
    }
  };

  const handleJoinTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinTeam(teamCode)) {
      navigate('/portal');
    } else {
      alert('Invalid team code!');
    }
  };

  return (
    <div className={`min-h-screen relative transition-all duration-700 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50'
    }`}>
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-6xl font-bold mb-16 text-center ${
            isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400' 
            : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
          }`}
        >
          Welcome to HackXpertise
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Create Team Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`p-8 rounded-2xl backdrop-blur-md border cursor-pointer transition-all duration-300 ${
              isDark 
                ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20' 
                : 'bg-white/80 border-white/40 hover:bg-white/90 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20'
            }`}
            onClick={() => setShowCreateForm(true)}
          >
            <div className="text-center">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                <Plus className="w-10 h-10 text-white" />
              </div>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Create Team
              </h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Start your own team and get a unique team code to share with members
              </p>
            </div>
          </motion.div>

          {/* Join Team Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`p-8 rounded-2xl backdrop-blur-md border cursor-pointer transition-all duration-300 ${
              isDark 
                ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20' 
                : 'bg-white/80 border-white/40 hover:bg-white/90 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20'
            }`}
            onClick={() => setShowJoinForm(true)}
          >
            <div className="text-center">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                isDark ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-gradient-to-r from-purple-500 to-blue-600'
              }`}>
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Join Team
              </h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Have a team code? Join an existing team and start collaborating
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Create Team Modal */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowCreateForm(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-md border ${
              isDark 
                ? 'bg-gray-900/90 border-cyan-500/30' 
                : 'bg-white/95 border-blue-500/30'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Create Your Team
            </h3>
            
            {generatedCode ? (
              <div className="text-center">
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Team created successfully!
                </p>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-cyan-500/20' : 'bg-blue-500/20'} mb-4`}>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Your team code:</p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-cyan-300' : 'text-blue-600'}`}>
                    {generatedCode}
                  </p>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Redirecting to portal...
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateTeam}>
                <input
                  type="text"
                  placeholder="Enter team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-lg backdrop-blur-md border mb-6 transition-all duration-300 focus:outline-none focus:ring-2 ${
                    isDark 
                      ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-cyan-500/50' 
                      : 'bg-white/60 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500/50'
                  }`}
                />
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className={`flex-1 py-3 px-6 rounded-lg border transition-all duration-300 ${
                      isDark 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      isDark 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white'
                    }`}
                  >
                    Create
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Join Team Modal */}
      {showJoinForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowJoinForm(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-md border ${
              isDark 
                ? 'bg-gray-900/90 border-purple-500/30' 
                : 'bg-white/95 border-purple-500/30'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Join a Team
            </h3>
            <form onSubmit={handleJoinTeam}>
              <input
                type="text"
                placeholder="Enter team code"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value.toUpperCase())}
                required
                maxLength={6}
                className={`w-full px-4 py-3 rounded-lg backdrop-blur-md border mb-6 transition-all duration-300 focus:outline-none focus:ring-2 text-center text-2xl font-mono tracking-wider ${
                  isDark 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-purple-500/50' 
                    : 'bg-white/60 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-purple-500/50'
                }`}
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowJoinForm(false)}
                  className={`flex-1 py-3 px-6 rounded-lg border transition-all duration-300 ${
                    isDark 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                      : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isDark 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white' 
                      : 'bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 text-white'
                  }`}
                >
                  Join
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;