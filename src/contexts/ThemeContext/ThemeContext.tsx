// src/context/ThemeContext.tsx
import { fetchThemeFromDB, fetchThemeFromLocal, updateThemeInDatabase } from '@/src/apis';
import { Theme } from '@/src/models';
import { debounce } from '@/src/utils/commonUtils';
import React, { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react';

interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({ darkMode: false });
  const isFirstLoad = useRef(true);

  useEffect(() => {
    fetchThemeFromLocal().then((localData) => {
      setTheme(localData);
      fetchThemeFromDB().then(setTheme);
      isFirstLoad.current = false;
    });
  }, []);

  useEffect(() => {
    const debouncedUpdateTheme = debounce(updateThemeInDatabase, 2000);
    if (theme) {
      debouncedUpdateTheme(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
