import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import { setAuthToken, clearAuthToken } from '../service/api.service';
import { getModules } from '@/core/redux/Actions/ModuleActions'
interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, expiresIn: number) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);

  const getModulesData = async () => {
    dispatch(getModules())
  }

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('auth_token');
      const expiresAtStr = await AsyncStorage.getItem('auth_expires_at');
      if (token && expiresAtStr) {
        const expiresAt = parseInt(expiresAtStr, 10);
        if (Date.now() < expiresAt) {
          setAuthToken(token);
          setIsAuthenticated(true);
           getModulesData()
        } else {
          await logout();
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  const login = async (token: string, expiresIn: number) => {
    setAuthToken(token, expiresIn);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    clearAuthToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
