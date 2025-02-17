import { User } from "@/src/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserFromDB = async () => {
    try {
      const response = await fetch("https://api.example.com/user");
      const data = await response.json();
      await AsyncStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Failed to fetch user data", error);
      return { name: "John", age: 30, address: { city: "Unknown", street: "Unknown" } };
    }
  };
  
  export const fetchUserFromLocal = async () => {
    try {
      const localData = await AsyncStorage.getItem('user');
      return localData ? JSON.parse(localData) : { name: "John", age: 30, address: { city: "Unknown", street: "Unknown" } };
    } catch (error) {
      console.error("Failed to load user data from local storage", error);
      return { name: "John", age: 30, address: { city: "Unknown", street: "Unknown" } };
    }
  };
  
  export const updateUserInDatabase = async (updatedUser: User) => {
    try {
      await fetch("https://api.example.com/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Failed to update user in the database", error);
      await AsyncStorage.setItem('pending_user_update', JSON.stringify(updatedUser));
    }
  };
  
  export const retryUserUpdate = async () => {
      try {
        const pendingUpdate = await AsyncStorage.getItem('pending_user_update');
        if (pendingUpdate) {
          const user = JSON.parse(pendingUpdate);
          await updateUserInDatabase(user);
          await AsyncStorage.removeItem('pending_user_update');
        }
      } catch (error) {
        console.error("Failed to retry user update", error);
      }
    };
  