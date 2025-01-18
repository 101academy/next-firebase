'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {UserInfo} from '@/models/models';
import { getSession, loginAction, logoutAction } from '@/actions/authActions';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<any>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  
  useEffect(() => {
    getSession()
      .then((session) => {
        setUserInfo(session?.userInfo);
    });
  }, []);

  const login = async (email:string, password:string) => {
    loginAction(email, password)
      .then((userInfo) => {
          setUserInfo(userInfo);
      })
      .catch((error) => {
          console.error(error);
      })
  }

  const logout = async () => {
    await logoutAction();
    setUserInfo(null);
  }

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
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