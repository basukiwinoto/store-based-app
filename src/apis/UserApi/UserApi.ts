import { API_URLS } from "@/src/constants/apiUrls";
import { CONTEXT_NAMES } from "@/src/constants/contextNames";
import { DEFAULT_VALUES } from "@/src/constants/defaultValues";
import { User } from "@/src/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserFromDB = async (userId: string) => {
    try {
      const response = await fetch(`${API_URLS.USER}?userId=${userId}`);
      const data = await response.json();
      await AsyncStorage.setItem(`${CONTEXT_NAMES.THEME}-${userId}`, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Failed to fetch user data", error);
      return DEFAULT_VALUES.USER;
    }
  };
  
  export const fetchUserFromLocal = async (userId: string) => {
    try {
      const localData = await AsyncStorage.getItem(`${CONTEXT_NAMES.THEME}-${userId}`);
      return localData ? JSON.parse(localData) : DEFAULT_VALUES.USER;
    } catch (error) {
      console.error("Failed to load user data from local storage", error);
      return DEFAULT_VALUES.USER;
    }
  };
  
  export const updateUserInDatabase = async (userId: string, updatedUser: User) => {
    try {
      await fetch(`${API_URLS.USER}?userId=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      await AsyncStorage.setItem(`${CONTEXT_NAMES.THEME}-${userId}`, JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Failed to update user in the database", error);
      await AsyncStorage.setItem(`pending_${CONTEXT_NAMES.THEME}_update-${userId}`, JSON.stringify(updatedUser));
    }
  };
  
  export const retryUserUpdate = async (userId: string) => {
      try {
        const pendingUpdate = await AsyncStorage.getItem(`pending_${CONTEXT_NAMES.THEME}_update-${userId}`);
        if (pendingUpdate) {
          const user = JSON.parse(pendingUpdate);
          await updateUserInDatabase(userId, user);
          await AsyncStorage.removeItem(`pending_${CONTEXT_NAMES.THEME}_update-${userId}`);
        }
      } catch (error) {
        console.error("Failed to retry user update", error);
      }
    };
  