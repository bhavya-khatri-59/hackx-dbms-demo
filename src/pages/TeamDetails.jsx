import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Copy, 
  Check, 
  Trash2, 
  Plus, 
  Crown,
  Mail,
  Calendar
} from 'lucide-react';
import { useTeam } from '../contexts/TeamContext';

const TeamDetails = () => {
  const { user, team, removeTeamMember } = useTeam();
  const [copiedCode, setCopiedCode] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const copyInviteCode = () => {
    navigator.clipboard.writeText(team?.code || '');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDeleteMember = (member) => {
    setMemberToDelete(member);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      removeTeamMember(memberToDelete.id);
      setShowSuccess(true);
      setShowDeleteConfirm(false);
      setMemberToDelete(null);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  if (!team) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 shadow-xl"
        >
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Team Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Create or join a team to view team details</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/dashboard'}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
          >
            Go to Dashboard
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const isAdmin = user?.id === team.createdBy;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Team Details
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your team and track member contributions
          </p>
        </motion.div>

        {/* Team Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{team.name}</h2>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Created {new Date(team.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{team.members.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Members</div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyInviteCode}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Copied!' : team.code}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Team Members */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Team Members</h3>
            {isAdmin && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300"
              >
                <Plus className="w-4 h-4" />
                <span>Invite Members</span>
              </motion.button>
            )}
          </div>

          <div className="grid gap-4">
            {team.members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {member.name.charAt(0)}
                    </div>
                    {member.id === team.createdBy && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h4>
                      {member.id === team.createdBy && (
                        <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full font-medium">
                          Team Lead
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm">
                      <Mail className="w-3 h-3" />
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>

                {isAdmin && member.id !== user.id && (
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteMember(member)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowDeleteConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Remove Team Member</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Are you sure you want to remove <strong>{memberToDelete?.name}</strong> from the team? This action cannot be undone.
                </p>
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmDelete}
                    className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
            >
              Team member removed successfully
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeamDetails;