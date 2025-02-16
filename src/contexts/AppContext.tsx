// src/context/AppContext.tsx
import React, { ReactNode } from 'react';
import { ThemeProvider, UserProvider } from '.';

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
