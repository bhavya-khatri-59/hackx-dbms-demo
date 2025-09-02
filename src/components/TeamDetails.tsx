import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import { Copy, Crown, Code, Palette, Search, Phone, Mail } from 'lucide-react';

const TeamDetails: React.FC = () => {
  const { isDark } = useTheme();
  const { team, user } = useUser();
  const [copiedCode, setCopiedCode] = useState(false);

  // Mock team data for demonstration
  const mockTeamMembers = [
    { id: '1', name: 'Alex Johnson', role: 'Team Leader', branch: 'CSE', email: 'alex@email.com', phone: '+91 9876543210' },
    { id: '2', name: 'Sarah Chen', role: 'Developer', branch: 'CSE', email: 'sarah@email.com', phone: '+91 9876543211' },
    { id: '3', name: 'Mike Rodriguez', role: 'Designer', branch: 'ECE', email: 'mike@email.com', phone: '+91 9876543212' },
    { id: '4', name: 'Emma Wilson', role: 'Researcher', branch: 'IT', email: 'emma@email.com', phone: '+91 9876543213' }
  ];

  const copyTeamCode = () => {
    if (team?.code) {
      navigator.clipboard.writeText(team.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'team leader': return <Crown className="w-5 h-5" />;
      case 'developer': return <Code className="w-5 h-5" />;
      case 'designer': return <Palette className="w-5 h-5" />;
      case 'researcher': return <Search className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'team leader': return isDark ? 'text-yellow-400 bg-yellow-500/20' : 'text-yellow-600 bg-yellow-500/20';
      case 'developer': return isDark ? 'text-green-400 bg-green-500/20' : 'text-green-600 bg-green-500/20';
      case 'designer': return isDark ? 'text-purple-400 bg-purple-500/20' : 'text-purple-600 bg-purple-500/20';
      case 'researcher': return isDark ? 'text-blue-400 bg-blue-500/20' : 'text-blue-600 bg-blue-500/20';
      default: return isDark ? 'text-gray-400 bg-gray-500/20' : 'text-gray-600 bg-gray-500/20';
    }
  };

  if (!team) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          You're not part of any team yet. Please create or join a team first.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-center ${
          isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400' 
          : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
        }`}>
          Team Details
        </h1>
      </motion.div>

      {/* Team Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`p-8 rounded-2xl backdrop-blur-md border mb-8 text-center ${
          isDark 
            ? 'bg-white/10 border-white/20' 
            : 'bg-white/80 border-white/40'
        }`}
        style={{
          boxShadow: isDark 
            ? '0 0 30px rgba(0, 255, 255, 0.1)' 
            : '0 0 30px rgba(59, 130, 246, 0.1)'
        }}
      >
        <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {team.name}
        </h2>
        <div className="flex items-center justify-center space-x-2">
          <span className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Team Code:
          </span>
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            isDark ? 'bg-cyan-500/20' : 'bg-blue-500/20'
          }`}>
            <span className={`text-2xl font-mono font-bold ${
              isDark ? 'text-cyan-300' : 'text-blue-600'
            }`}>
              {team.code}
            </span>
            <button
              onClick={copyTeamCode}
              className={`p-1 rounded transition-colors duration-200 ${
                isDark ? 'hover:bg-cyan-500/30' : 'hover:bg-blue-500/30'
              }`}
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        {copiedCode && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-2 text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}
          >
            Team code copied to clipboard!
          </motion.p>
        )}
      </motion.div>

      {/* Team Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Team Members
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {mockTeamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: isDark 
                  ? '0 10px 30px rgba(0, 255, 255, 0.1)' 
                  : '0 10px 30px rgba(59, 130, 246, 0.1)'
              }}
              className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                isDark 
                  ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                  : 'bg-white/80 border-white/40 hover:bg-white/90'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                    isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                  }`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {member.name}
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {member.branch}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getRoleColor(member.role)}`}>
                  {getRoleIcon(member.role)}
                  <span>{member.role}</span>
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {member.email}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {member.phone}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TeamDetails;