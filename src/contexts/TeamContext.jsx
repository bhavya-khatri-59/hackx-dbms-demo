import React, { createContext, useContext, useState } from 'react';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setTeam(null);
    setIsAuthenticated(false);
  };

  const createTeam = (teamName) => {
    const inviteCode = Math.random().toString(36).substr(2, 8).toUpperCase();
    const newTeam = {
      name: teamName,
      code: inviteCode,
      members: [user],
      createdBy: user.id,
      createdAt: new Date().toISOString()
    };
    setTeam(newTeam);
    return newTeam;
  };

  const joinTeam = (inviteCode) => {
    // Mock team joining - in real app this would validate the code
    const mockTeam = {
      name: `Team ${inviteCode.slice(0, 4)}`,
      code: inviteCode,
      members: [
        user,
        { id: '2', name: 'John Doe', role: 'Developer', email: 'john@example.com' },
        { id: '3', name: 'Jane Smith', role: 'Designer', email: 'jane@example.com' }
      ],
      createdBy: '2',
      createdAt: new Date().toISOString()
    };
    setTeam(mockTeam);
    return mockTeam;
  };

  const removeTeamMember = (memberId) => {
    if (team) {
      setTeam({
        ...team,
        members: team.members.filter(member => member.id !== memberId)
      });
    }
  };

  const hasTeam = Boolean(team);

  return (
    <TeamContext.Provider value={{ 
      user, 
      team, 
      isAuthenticated, 
      hasTeam,
      login, 
      logout, 
      createTeam, 
      joinTeam,
      removeTeamMember
    }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};