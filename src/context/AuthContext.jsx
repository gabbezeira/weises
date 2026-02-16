import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const res = await api.get('/auth/me');
          setProfile(res.data);
        } catch {
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const res = await api.get('/auth/me');
    setProfile(res.data);
    return res.data;
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // State will be updated by onAuthStateChanged, but we clear it here too for immediate UI feedback
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    profile,
    loading,
    login,
    logout,
    isAuthenticated: !!user && !!profile,
    isAdmin: profile?.role === 'admin',
    isClient: profile?.role === 'client',
    mustChangePassword: profile?.mustChangePassword === true,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
