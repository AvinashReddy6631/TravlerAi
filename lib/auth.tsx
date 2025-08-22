"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, FakeDB } from './database';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: { email: string; password: string; name: string; phone: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check for stored user session only on client side
    const initializeAuth = () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          const userData = FakeDB.getUserById(storedUserId);
          if (userData) {
            setUser(userData);
          } else {
            // Clean up invalid stored user
            localStorage.removeItem('userId');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clean up on error
        try {
          localStorage.removeItem('userId');
        } catch (e) {
          // Ignore cleanup errors
        }
      } finally {
        setIsInitialized(true);
      }
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      initializeAuth();
    } else {
      setIsInitialized(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = FakeDB.getUser(email, password);
      if (userData) {
        setUser(userData);
        if (typeof window !== 'undefined') {
          localStorage.setItem('userId', userData.id);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: { email: string; password: string; name: string; phone: string }): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = FakeDB.getUser(userData.email, userData.password);
      if (existingUser) {
        return false; // User already exists
      }
      
      const newUser = FakeDB.createUser(userData);
      setUser(newUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('userId', newUser.id);
      }
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('userId');
      } catch (error) {
        console.error('Error removing user from localStorage:', error);
      }
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
    isInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}