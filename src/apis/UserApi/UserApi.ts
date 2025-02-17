import { API_URLS } from "@/src/constants/apiUrls";
import { CONTEXT_NAMES } from "@/src/constants/contextNames";
import { User } from "@/src/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserFromDB = async () => {
    try {
      const response = await fetch(API_URLS.USER);
      const data = await response.json();
      await AsyncStorage.setItem(CONTEXT_NAMES.THEME, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Failed to fetch user data", error);
      return { name: "John", age: 30, address: { city: "Unknown", street: "Unknown" } };
    }
  };
  
  export const fetchUserFromLocal = async () => {
    try {
      const localData = await AsyncStorage.getItem(CONTEXT_NAMES.THEME);
      return localData ? JSON.parse(localData) : { name: "John", age: 30, address: { city: "Unknown", street: "Unknown" } };
    } catch (error) {
      console.error("Failed to load user data from local storage", error);
      return { name: "John", age: 30, address: { city: "Unknown", street: "Unknown" } };
    }
  };
  
  export const updateUserInDatabase = async (updatedUser: User) => {
    try {
      await fetch(API_URLS.USER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      await AsyncStorage.setItem(CONTEXT_NAMES.THEME, JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Failed to update user in the database", error);
      await AsyncStorage.setItem(`pending_${CONTEXT_NAMES.THEME}_update`, JSON.stringify(updatedUser));
    }
  };
  
  export const retryUserUpdate = async () => {
      try {
        const pendingUpdate = await AsyncStorage.getItem(`pending_${CONTEXT_NAMES.THEME}_update`);
        if (pendingUpdate) {
          const user = JSON.parse(pendingUpdate);
          await updateUserInDatabase(user);
          await AsyncStorage.removeItem(`pending_${CONTEXT_NAMES.THEME}_update`);
        }
      } catch (error) {
        console.error("Failed to retry user update", error);
      }
    };
  