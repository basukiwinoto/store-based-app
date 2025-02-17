import { Theme } from "@/src/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchThemeFromDB = async () => {
    try {
      const response = await fetch("https://api.example.com/theme");
      const data = await response.json();
      await AsyncStorage.setItem('theme', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Failed to fetch theme data", error);
      return { darkMode: false };
    }
  };
  
  export const fetchThemeFromLocal = async () => {
    try {
      const localData = await AsyncStorage.getItem('theme');
      return localData ? JSON.parse(localData) : { darkMode: false };
    } catch (error) {
      console.error("Failed to load theme data from local storage", error);
      return { darkMode: false };
    }
  };
  
  export const updateThemeInDatabase = async (updatedTheme: Theme) => {
    try {
      await fetch("https://api.example.com/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTheme),
      });
      await AsyncStorage.setItem('theme', JSON.stringify(updatedTheme));
    } catch (error) {
      console.error("Failed to update theme in the database", error);
      await AsyncStorage.setItem('pending_theme_update', JSON.stringify(updatedTheme));
    }
  };
  
  export const retryThemeUpdate = async () => {
      try {
        const pendingUpdate = await AsyncStorage.getItem('pending_theme_update');
        if (pendingUpdate) {
          const theme = JSON.parse(pendingUpdate);
          await updateThemeInDatabase(theme);
          await AsyncStorage.removeItem('pending_theme_update');
        }
      } catch (error) {
        console.error("Failed to retry theme update", error);
      }
    };
    