"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { getClientAuth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<any>;
  signOutUser: () => Promise<void>;
}>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOutUser: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const clientAuth = getClientAuth();
      const unsubscribe = onAuthStateChanged(clientAuth, (user) => {
        setUser(user);
        setLoading(false);
      });
      return () => unsubscribe();
  }, []);

  const signIn = (email: string, pass: string) => {
    const clientAuth = getClientAuth();
    return signInWithEmailAndPassword(clientAuth, email, pass);
  }

  const signOutUser = async () => {
    const clientAuth = getClientAuth();
    await signOut(clientAuth);
    // onAuthStateChanged will handle the UI update
  };

  const value = { user, loading, signIn, signOutUser };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
            <Skeleton className="w-full h-full" />
        </div>
      ) : children}
    </AuthContext.Provider>
  );
};
