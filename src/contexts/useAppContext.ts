import reactotron from "reactotron-react-native";
import { useThemeContext } from "./ThemeContext/ThemeContext";
import { useUserContext } from "./UserContext/UserContext";

// src/hooks/useAppContext.ts
export const useAppContext = () => {
  const { data: user, setData: setUser } = useUserContext();
  const { data: theme, setData: setTheme } = useThemeContext();

  if (__DEV__){
    reactotron.stateValuesChange([
      {
        path: 'user',
        value: user,
      },
      {
        path: 'theme',
        value: theme,
      }
    ])  
  }

  return {
    user,
    setUser,
    theme,
    setTheme,
  };
};
