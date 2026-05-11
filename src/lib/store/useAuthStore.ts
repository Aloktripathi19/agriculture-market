'use client';
import { create } from 'zustand';
import { authService, type AuthSession } from '@/lib/services/authService';

interface AuthStore {
  session: AuthSession | null;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  isLoading: true,

  initialize: () => {
    const session = authService.getSession();
    set({ session, isLoading: false });
  },

  login: (email, password) => {
    const session = authService.login(email, password);
    if (session) {
      set({ session });
      return true;
    }
    return false;
  },

  logout: () => {
    authService.logout();
    set({ session: null });
  },
}));
