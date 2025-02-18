import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_VALUES } from "@/src/constants/defaultValues";

export const fetchFromDB = async <T>(contextKey: string, apiUrl: string, userId: string): Promise<T> => {
  try {
    const response = await fetch(`${apiUrl}?userId=${userId}`);
    const data = await response.json();
    await AsyncStorage.setItem(`${contextKey}-${userId}`, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(`Failed to fetch data for ${contextKey}`, error);
    return DEFAULT_VALUES[contextKey as keyof typeof DEFAULT_VALUES] as T;
  }
};

export const fetchFromLocal = async <T>(contextKey: string, userId: string): Promise<T> => {
  try {
    const localData = await AsyncStorage.getItem(`${contextKey}-${userId}`);
    return localData ? JSON.parse(localData) : DEFAULT_VALUES[contextKey as keyof typeof DEFAULT_VALUES] as T;
  } catch (error) {
    console.error(`Failed to load local data for ${contextKey}`, error);
    return DEFAULT_VALUES[contextKey as keyof typeof DEFAULT_VALUES] as T;
  }
};

export const updateInDatabase = async <T>(contextKey: string, apiUrl: string, userId: string, updatedData: T) => {
  try {
    await fetch(`${apiUrl}?userId=${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    await AsyncStorage.setItem(`${contextKey}-${userId}`, JSON.stringify(updatedData));
  } catch (error) {
    console.error(`Failed to update data for ${contextKey}`, error);
    await AsyncStorage.setItem(`pending_${contextKey}_update-${userId}`, JSON.stringify(updatedData));
  }
};

export const retryUpdate = async <T>(contextKey: string, apiUrl: string, userId: string) => {
  try {
    const pendingUpdate = await AsyncStorage.getItem(`pending_${contextKey}_update-${userId}`);
    if (pendingUpdate) {
      const data = JSON.parse(pendingUpdate) as T;
      await updateInDatabase(contextKey, apiUrl, userId, data);
      await AsyncStorage.removeItem(`pending_${contextKey}_update-${userId}`);
    }
  } catch (error) {
    console.error(`Failed to retry update for ${contextKey}`, error);
  }
};
