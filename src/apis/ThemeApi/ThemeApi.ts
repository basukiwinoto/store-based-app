import { API_URLS } from "@/src/constants/apiUrls";
import { CONTEXT_NAMES } from "@/src/constants/contextNames";
import { Theme } from "@/src/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchThemeFromDB = async () => {
    try {
      const response = await fetch(API_URLS.THEME);
      const data = await response.json();
      await AsyncStorage.setItem(CONTEXT_NAMES.THEME, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Failed to fetch theme data", error);
      return { darkMode: false };
    }
  };
  
  export const fetchThemeFromLocal = async () => {
    try {
      const localData = await AsyncStorage.getItem(CONTEXT_NAMES.THEME);
      return localData ? JSON.parse(localData) : { darkMode: false };
    } catch (error) {
      console.error("Failed to load theme data from local storage", error);
      return { darkMode: false };
    }
  };
  
  export const updateThemeInDatabase = async (updatedTheme: Theme) => {
    try {
      await fetch(API_URLS.THEME, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTheme),
      });
      await AsyncStorage.setItem(CONTEXT_NAMES.THEME, JSON.stringify(updatedTheme));
    } catch (error) {
      console.error("Failed to update theme in the database", error);
      await AsyncStorage.setItem(`pending_${CONTEXT_NAMES.THEME}_update`, JSON.stringify(updatedTheme));
    }
  };
  
  export const retryThemeUpdate = async () => {
      try {
        const pendingUpdate = await AsyncStorage.getItem(`pending_${CONTEXT_NAMES.THEME}_update`);
        if (pendingUpdate) {
          const theme = JSON.parse(pendingUpdate);
          await updateThemeInDatabase(theme);
          await AsyncStorage.removeItem(`pending_${CONTEXT_NAMES.THEME}_update`);
        }
      } catch (error) {
        console.error("Failed to retry theme update", error);
      }
    };
    