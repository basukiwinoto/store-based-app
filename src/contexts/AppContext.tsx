// src/context/AppContext.tsx
import React, { ReactNode } from 'react';
import { UserProvider } from './UserContext/UserContext';
import { ThemeProvider } from './ThemeContext/ThemeContext';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <UserProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </UserProvider>
  );
};
