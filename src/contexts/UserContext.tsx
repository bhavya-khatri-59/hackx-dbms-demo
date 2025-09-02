import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  branch: string;
  phone: string;
  gender: string;
}

interface Team {
  id: string;
  name: string;
  code: string;
  members: User[];
}

interface UserContextType {
  user: User | null;
  team: Team | null;
  setUser: (user: User | null) => void;
  setTeam: (team: Team | null) => void;
  createTeam: (teamName: string) => string;
  joinTeam: (code: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [team, setTeam] = useState<Team | null>(null);

  const createTeam = (teamName: string): string => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newTeam: Team = {
      id: Math.random().toString(36).substring(2),
      name: teamName,
      code,
      members: user ? [user] : []
    };
    setTeam(newTeam);
    return code;
  };

  const joinTeam = (code: string): boolean => {
    // Simulate team joining - in real app, this would call an API
    if (code.length === 6 && user) {
      const mockTeam: Team = {
        id: Math.random().toString(36).substring(2),
        name: `Team ${code}`,
        code,
        members: [user]
      };
      setTeam(mockTeam);
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider value={{ user, team, setUser, setTeam, createTeam, joinTeam }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};