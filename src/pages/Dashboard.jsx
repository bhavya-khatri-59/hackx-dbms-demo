import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Hash, Copy, Check } from 'lucide-react';
import { useTeam } from '../contexts/TeamContext';

const Dashboard = () => {
  const [teamName, setTeamName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const { user, team, createTeam, joinTeam, hasTeam } = useTeam();

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (teamName.trim()) {
      const newTeam = createTeam(teamName.trim());
      setShowSuccess(true);
      setTeamName('');
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    if (inviteCode.trim()) {
      const joinedTeam = joinTeam(inviteCode.trim().toUpperCase());
      setShowSuccess(true);
      setInviteCode('');
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(team.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (hasTeam) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You're part of <span className="font-semibold text-blue-600 dark:text-blue-400">{team.name}</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Information</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyInviteCode}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </motion.button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Team Name</label>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{team.name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Invite Code</label>
                  <div className="text-lg font-mono font-semibold text-blue-600 dark:text-blue-400">{team.code}</div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Team Members ({team.members.length})</label>
                <div className="space-y-2">
                  {team.members.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{member.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
              >
                Successfully updated team information!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to HackXpertise
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ready to start your hackathon journey? Create a new team or join an existing one to unlock all features.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Team Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Team</h3>
              <p className="text-gray-600 dark:text-gray-400">Start your own team and invite others</p>
            </div>

            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-transparent peer"
                  placeholder="Team Name"
                  required
                />
                <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:top-1 peer-valid:text-xs">
                  Team Name
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Create Team
              </motion.button>
            </form>
          </motion.div>

          {/* Join Team Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:bg-gradient-to-br hover:from-teal-50/50 hover:to-green-50/50 dark:hover:from-teal-900/20 dark:hover:to-green-900/20"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Join Team</h3>
              <p className="text-gray-600 dark:text-gray-400">Enter an invite code to join a team</p>
            </div>

            <form onSubmit={handleJoinTeam} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300 placeholder-transparent peer font-mono text-center text-lg tracking-widest"
                  placeholder="INVITE CODE"
                  maxLength={8}
                  required
                />
                <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-teal-500 peer-valid:top-1 peer-valid:text-xs">
                  Invite Code
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Join Team
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
            >
              🎉 Team operation successful!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;