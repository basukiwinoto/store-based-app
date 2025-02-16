import { useThemeContext, useUserContext } from ".";

// src/hooks/useAppContext.ts
export const useAppContext = () => {
  return { context: { ...useUserContext(), ...useThemeContext() } };
};
