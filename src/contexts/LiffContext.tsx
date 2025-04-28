'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import liff from '@line/liff';
import { LIFF_CONFIG } from '@/config/liff';
import { User } from '@/types/card';

interface LiffContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  shareCard: (cardId: string) => Promise<void>;
}

const LiffContext = createContext<LiffContextType | null>(null);

export function LiffProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init(LIFF_CONFIG);
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          setUser({
            userId: profile.userId,
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
            memberLevel: 'NORMAL',
          });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('LIFF initialization failed:', error);
      }
    };

    initializeLiff();
  }, []);

  const login = () => {
    liff.login();
  };

  const logout = () => {
    liff.logout();
    setUser(null);
    setIsLoggedIn(false);
  };

  const shareCard = async (cardId: string) => {
    if (!liff.isLoggedIn()) {
      login();
      return;
    }

    try {
      await liff.shareTargetPicker([
        {
          type: 'text',
          text: `查看我的卡片：${window.location.origin}/card/${cardId}`,
        },
      ]);
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  return (
    <LiffContext.Provider value={{ user, isLoggedIn, login, logout, shareCard }}>
      {children}
    </LiffContext.Provider>
  );
}

export function useLiff() {
  const context = useContext(LiffContext);
  if (!context) {
    throw new Error('useLiff must be used within a LiffProvider');
  }
  return context;
} 