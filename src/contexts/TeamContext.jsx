import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../config/api.js';

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
    const response = await apiFetch(`api/teams/${teamId}`);
    const data = await response.json();
    if (response.ok) {
      setTeam(data);
      localStorage.setItem('hackx_team', JSON.stringify(data));
      return data;
    } else if (response.status === 404) {
      // Team not found, likely user not registered or not in a team
      setTeam(null);
      localStorage.removeItem('hackx_team');
      throw new Error('No team found. Please register or join a team.');
    } else {
      throw new Error(data.error || 'Failed to fetch team');
    }
  } catch (err) {
    console.error(err);
    setTeam(null);
    localStorage.removeItem('hackx_team');
    // Optionally, you can show a registration prompt here
  }
  };

  const createTeam = async (teamName) => {
    if (!user) {
      throw new Error("You must be logged in to create a team.");
    }
    try {
      const response = await apiFetch('api/teams', {
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
        throw new Error('Team name already exists!');
      }
    } catch (err) {
      console.error(err.message);
      throw new Error('Could not create team, cause a team with this name already exists.');
    }
  };

  const joinTeam = async (inviteCode) => {
    if (!user) {
        throw new Error("You must be logged in to join a team.");
    }
  try {
    const joinResponse = await apiFetch('api/teams/join', {
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
      throw new Error('Team is full or code is invalid!');
    }
  } catch (err) {
    console.error(err.message);
    throw new Error('Could not join team because of invalid code or team is full.');
  }
  };

  const leaveTeam = async () => {
    if (!user) {
        throw new Error("You must be logged in to leave a team.");
    }
    try {
        const response = await apiFetch('api/teams/leave', {
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

