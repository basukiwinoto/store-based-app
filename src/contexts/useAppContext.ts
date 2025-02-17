import { useThemeContext, useUserContext } from ".";

// src/hooks/useAppContext.ts
export const useAppContext = () => {
  const { data: user, setData: setUser } = useUserContext();
  const { data: theme, setData: setTheme } = useThemeContext();

  return {
    user,
    setUser,
    theme,
    setTheme,
  };
};
