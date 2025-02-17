import { API_URLS } from "@/src/constants/apiUrls";
import { CONTEXT_NAMES } from "@/src/constants/contextNames";
import { DEFAULT_VALUES } from "@/src/constants/defaultValues";
import { Theme } from "@/src/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchThemeFromDB = async (userId: string) => {
    try {
      const response = await fetch(`${API_URLS.THEME}?userId=${userId}`);
      const data = await response.json();
      await AsyncStorage.setItem(`${CONTEXT_NAMES.THEME}-${userId}`, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Failed to fetch theme data", error);
      return DEFAULT_VALUES.THEME;
    }
  };
  
  export const fetchThemeFromLocal = async (userId: string) => {
    try {
      const localData = await AsyncStorage.getItem(`${CONTEXT_NAMES.THEME}-${userId}`);
      return localData ? JSON.parse(localData) : DEFAULT_VALUES.THEME;
    } catch (error) {
      console.error("Failed to load theme data from local storage", error);
      return DEFAULT_VALUES.THEME;
    }
  };
  
  export const updateThemeInDatabase = async (userId: string, updatedTheme: Theme) => {
    try {
      await fetch(`${API_URLS.THEME}?userId=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTheme),
      });
      await AsyncStorage.setItem(`${CONTEXT_NAMES.THEME}-${userId}`, JSON.stringify(updatedTheme));
    } catch (error) {
      console.error("Failed to update theme in the database", error);
      await AsyncStorage.setItem(`pending_${CONTEXT_NAMES.THEME}_update-${userId}`, JSON.stringify(updatedTheme));
    }
  };
  
  export const retryThemeUpdate = async (userId: string) => {
      try {
        const pendingUpdate = await AsyncStorage.getItem(`pending_${CONTEXT_NAMES.THEME}_update-${userId}`);
        if (pendingUpdate) {
          const theme = JSON.parse(pendingUpdate);
          await updateThemeInDatabase(userId, theme);
          await AsyncStorage.removeItem(`pending_${CONTEXT_NAMES.THEME}_update-${userId}`);
        }
      } catch (error) {
        console.error("Failed to retry theme update", error);
      }
    };
    