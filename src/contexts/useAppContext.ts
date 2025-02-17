import { useThemeContext } from "./ThemeContext/ThemeContext";
import { useUserContext } from "./UserContext/UserContext";

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
