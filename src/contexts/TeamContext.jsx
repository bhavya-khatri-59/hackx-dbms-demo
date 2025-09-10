import React, { createContext, useContext, useState } from 'react';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // After login, you might want to fetch if the user is already in a team
  };

  const logout = () => {
    setUser(null);
    setTeam(null);
    setIsAuthenticated(false);
  };

  const createTeam = async (teamName) => {
    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The backend expects 'teamName', not 'name'
        body: JSON.stringify({ teamName }),
      });
      const data = await response.json();
      if (response.ok) {
        setTeam(data);
        return data;
      } else {
        throw new Error(data.error || 'Error creating team');
      }
    } catch (err) {
      alert(err.message);
      return null;
    }
  };

  const joinTeam = async (inviteCode) => {
    // This is now a real API call
    try {
       if (!user) {
           throw new Error("You must be logged in to join a team.");
       }
       // Using relative URL to work with the Vite proxy
       const response = await fetch('/api/teams/join', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ email: user.email, teamId: inviteCode }),
       });

       const data = await response.json();
       if (response.ok) {
           // After joining, we need to fetch the full team details
           const teamResponse = await fetch(`/api/teams/${inviteCode}`);
           const teamData = await teamResponse.json();
           if (teamResponse.ok) {
               setTeam(teamData);
               return teamData;
           } else {
               throw new Error(teamData.error || 'Could not fetch team details after joining.');
           }
       } else {
           throw new Error(data.error || 'Error joining team');
       }
    } catch (err) {
        alert(err.message);
        return null;
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
      joinTeam
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

