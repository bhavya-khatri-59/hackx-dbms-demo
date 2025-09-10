import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Copy, Check, AlertCircle } from 'lucide-react';
import { useTeam } from '../contexts/TeamContext.jsx';

const Dashboard = () => {
  const [teamName, setTeamName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const { user, team, createTeam, joinTeam, hasTeam } = useTeam();

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    setIsLoading(true);
    setError('');
    
    const newTeam = await createTeam(teamName.trim());
    
    if (newTeam) {
      setShowSuccess(true);
      setTeamName('');
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setError('Failed to create team. The team name might already exist.');
      setTimeout(() => setError(''), 5000);
    }
    setIsLoading(false);
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;

    setIsLoading(true);
    setError('');

    const joinedTeam = await joinTeam(inviteCode.trim().toUpperCase());

    if (joinedTeam) {
      setShowSuccess(true);
      setInviteCode('');
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setError('Failed to join team. Please check the code and try again.');
       setTimeout(() => setError(''), 5000);
    }
    setIsLoading(false);
  };

  const copyInviteCode = () => {
    // Fallback for non-secure contexts (like http)
    if (navigator.clipboard) {
        navigator.clipboard.writeText(team.code);
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = team.code;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (hasTeam) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You're part of <span className="font-semibold text-blue-600 dark:text-blue-400">{team.name}</span>
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold">Team Information</h2>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={copyInviteCode} className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 w-full sm:w-auto justify-center">
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Invite Code'}</span>
              </motion.button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Team Name</label>
                  <div className="text-lg font-semibold">{team.name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Invite Code</label>
                  <div className="text-lg font-mono font-semibold text-blue-600 dark:text-blue-400">{team.code}</div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Team Members ({team.members?.length || 0})</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {team.members?.map((member) => (
                    <div key={member.email} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{member.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{member.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to HackXpertise
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ready to start your hackathon journey? Create a new team or join an existing one to get started.
          </p>
        </motion.div>
        
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-8 max-w-md mx-auto"
            >
              <AlertCircle className="w-5 h-5"/> {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Team Card */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Create a Team</h3>
              <p className="text-gray-600 dark:text-gray-400">Start your own team and invite others.</p>
            </div>
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Enter Team Name" required />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition disabled:opacity-50">
                {isLoading ? 'Creating...' : 'Create Team'}
              </motion.button>
            </form>
          </motion.div>

          {/* Join Team Card */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50">
             <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Join a Team</h3>
              <p className="text-gray-600 dark:text-gray-400">Enter an invite code to join a team.</p>
            </div>
            <form onSubmit={handleJoinTeam} className="space-y-4">
              <input type="text" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition font-mono text-center tracking-widest" placeholder="ENTER INVITE CODE" required />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition disabled:opacity-50">
                {isLoading ? 'Joining...' : 'Join Team'}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
              🎉 Success! Your team is ready.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;

