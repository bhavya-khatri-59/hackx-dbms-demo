import React, { createContext, useContext, useState, useEffect } from 'react';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('hackx_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        if (parsedUser.teamid) {
          fetchTeam(parsedUser.teamid);
        }
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('hackx_user', JSON.stringify(userData));
    if (userData.teamid) {
        fetchTeam(userData.teamid);
    }
  };

  const logout = () => {
    setUser(null);
    setTeam(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hackx_user');
    localStorage.removeItem('hackx_team');
  };

  const fetchTeam = async (teamId) => {
    try {
        const response = await fetch(`/api/teams/${teamId}`);
        const data = await response.json();
        if (response.ok) {
            setTeam(data);
            localStorage.setItem('hackx_team', JSON.stringify(data));
            return data;
        } else {
            throw new Error(data.error || 'Failed to fetch team');
        }
    } catch (err) {
        console.error(err);
        // If team fetch fails, clear it from state/storage
        setTeam(null);
        localStorage.removeItem('hackx_team');
    }
  };

  const createTeam = async (teamName) => {
    if (!user) {
      throw new Error("You must be logged in to create a team.");
    }
    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: teamName, email: user.email }),
      });
      const data = await response.json();
      if (response.ok) {
        setTeam(data);
        localStorage.setItem('hackx_team', JSON.stringify(data));
        
        // Also update the user object in state and localStorage
        const updatedUser = { ...user, teamid: data.code };
        setUser(updatedUser);
        localStorage.setItem('hackx_user', JSON.stringify(updatedUser));
        
        return data;
      } else {
        window.alert("Error creating team: Your team name might already be taken.");
        throw new Error(data.error || 'Error creating team');
      }
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  const joinTeam = async (inviteCode) => {
    if (!user) {
        throw new Error("You must be logged in to join a team.");
    }
    try {
        const joinResponse = await fetch('/api/teams/join', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ teamId: inviteCode, email: user.email }),
        });
        const joinData = await joinResponse.json();

        if (joinResponse.ok) {
            // After successfully joining, fetch the complete team data to update the UI
            const teamData = await fetchTeam(inviteCode);
            if(teamData) {
                // Also update the user object in state and localStorage
                const updatedUser = { ...user, teamid: teamData.code };
                setUser(updatedUser);
                localStorage.setItem('hackx_user', JSON.stringify(updatedUser));
            }
            return teamData;
        } else {
            throw new Error(joinData.error || 'Error joining team');
        }
    } catch (err) {
        console.error(err.message);
        throw err; // Re-throw the error so the component can catch it
    }
  };

  const leaveTeam = async () => {
    if (!user) {
        throw new Error("You must be logged in to leave a team.");
    }
    try {
        const response = await fetch('/api/teams/leave', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email }),
        });
        const data = await response.json();
        if (response.ok) {
            // Clear team from state and storage
            setTeam(null);
            localStorage.removeItem('hackx_team');

            // Update user object to remove teamid
            const updatedUser = { ...user, teamid: null };
            setUser(updatedUser);
            localStorage.setItem('hackx_user', JSON.stringify(updatedUser));
            
            return true;
        } else {
            throw new Error(data.error || 'Error leaving team');
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
  };

  const hasTeam = Boolean(team);

  const value = {
    user,
    team,
    isAuthenticated,
    hasTeam,
    isLoading,
    login,
    logout,
    createTeam,
    joinTeam,
    leaveTeam,
  };

  return (
    <TeamContext.Provider value={value}>
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

