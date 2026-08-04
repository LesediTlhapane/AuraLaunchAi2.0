import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { initialUserProfile } from '../lib/mockData';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  authMode: 'login' | 'register' | 'forgot';
  setAuthMode: (mode: 'login' | 'register' | 'forgot') => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (fullName: string, companyName: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'aura_auth_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile | null>(initialUserProfile);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setIsAuthenticated(true);
          setUser({
            ...initialUserProfile,
            id: session.user.id,
            email: session.user.email || 'user@auratech.ai',
            fullName: session.user.user_metadata?.full_name || 'Aura Launch User',
          });
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setIsAuthenticated(true);
          setUser((prev) => ({
            ...(prev || initialUserProfile),
            id: session.user.id,
            email: session.user.email || 'user@auratech.ai',
            fullName: session.user.user_metadata?.full_name || 'Aura Launch User',
          }));
        }
      });

      return () => subscription.unsubscribe();
    } else {
      // Local storage persistence fallback
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setIsAuthenticated(true);
        } catch {
          // ignore error
        }
      }
    }
  }, []);

  const login = async (email: string, pass: string) => {
    if (!email || !pass) {
      return { success: false, error: 'Please enter both email and password' };
    }

    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        const loggedUser: UserProfile = {
          ...initialUserProfile,
          id: data.user.id,
          email: data.user.email || email,
        };
        setUser(loggedUser);
        setIsAuthenticated(true);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loggedUser));
        return { success: true };
      }
    }

    // Local authentication fallback for instant demo
    const loggedUser: UserProfile = {
      ...initialUserProfile,
      email: email,
      fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loggedUser));
    return { success: true };
  };

  const register = async (fullName: string, companyName: string, email: string, pass: string) => {
    if (!email || !pass || !fullName) {
      return { success: false, error: 'Please fill in all required fields.' };
    }

    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: { full_name: fullName, company_name: companyName },
        },
      });
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        const newUser: UserProfile = {
          ...initialUserProfile,
          id: data.user.id,
          email: data.user.email || email,
          fullName,
          companyName: companyName || 'Aura Client',
        };
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
        return { success: true };
      }
    }

    // Local register fallback
    const newUser: UserProfile = {
      ...initialUserProfile,
      id: `usr_${Date.now()}`,
      email,
      fullName,
      companyName: companyName || 'Aura Intelligence Client',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
    return { success: true };
  };

  const forgotPassword = async (email: string) => {
    if (!email) {
      return { success: false, error: 'Please enter your account email address.' };
    }

    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) return { success: false, error: error.message };
    }

    return { success: true };
  };

  const logout = async () => {
    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const next = { ...user, ...updated };
    setUser(next);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        authMode,
        setAuthMode,
        login,
        register,
        forgotPassword,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
