import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
}

const CURRENT_USER_KEY = 'mockCurrentUser';
const USERS_KEY = 'mockUsers';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const users: Array<{ id: string; email: string; password: string; full_name?: string }> =
      JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid login credentials');
    const u: AuthUser = { id: found.id, email: found.email, full_name: found.full_name };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(u));
    setUser(u);
  };

  const signUp = async (email: string, password: string, full_name?: string) => {
    const users: Array<{ id: string; email: string; password: string; full_name?: string }> =
      JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.some(u => u.email === email)) throw new Error('Account exists');
    const newRec = { id: uuidv4(), email, password, full_name };
    users.push(newRec);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const u: AuthUser = { id: newRec.id, email, full_name };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(u));
    setUser(u);
  };

  const signOut = async () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
};