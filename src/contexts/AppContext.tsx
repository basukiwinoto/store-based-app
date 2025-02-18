import React, { ReactNode } from 'react';
import { UserProvider } from './UserContext/UserContext';
import { ThemeProvider } from './ThemeContext/ThemeContext';

interface AppProviderProps {
  children: ReactNode;
  userId: string;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children, userId }) => {
  return (
    <UserProvider userId={userId}>
      <ThemeProvider userId={userId}>{children}</ThemeProvider>
    </UserProvider>
  );
};