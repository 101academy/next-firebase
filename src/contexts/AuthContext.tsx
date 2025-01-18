'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import {UserInfo} from '@/models/models';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<any>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};