import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export type UserRole = 'admin' | 'technician' | 'user';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  campus_building?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'user-001',
    email: 'admin@aquasense.ai',
    full_name: 'Alex Rivera (Master Admin)',
    role: 'admin',
    campus_building: 'HQ Control'
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem('aquasense_token') || 'demo-token');
  const [role, setRoleState] = useState<UserRole>('admin');

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      const names = {
        admin: 'Alex Rivera (Master Admin)',
        technician: 'Jordan Lee (Field Tech)',
        user: 'Sarah Miller (Resident User)'
      };
      setUser({
        ...user,
        role: newRole,
        full_name: names[newRole]
      });
    }
  };

  const login = (email: string, userRole: UserRole = 'admin') => {
    const names = {
      admin: 'Alex Rivera (Master Admin)',
      technician: 'Jordan Lee (Field Tech)',
      user: 'Sarah Miller (Resident User)'
    };
    const mockUser: User = {
      id: `usr-${Date.now()}`,
      email,
      full_name: names[userRole],
      role: userRole,
      campus_building: 'HQ Control'
    };
    setUser(mockUser);
    setRoleState(userRole);
    setToken('demo-jwt-token');
    localStorage.setItem('aquasense_token', 'demo-jwt-token');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('aquasense_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
