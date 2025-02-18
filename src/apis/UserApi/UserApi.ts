import { API_URLS } from "@/src/constants/apiUrls";
import { CONTEXT_NAMES } from "@/src/constants/contextNames";
import { User } from "@/src/models";
import { fetchFromDB, fetchFromLocal, retryUpdate, updateInDatabase } from "../genericApi";

// Fetch user data from the database
export const fetchUserFromDB = async (userId: string): Promise<User> => {
  return fetchFromDB<User>(CONTEXT_NAMES.USER, API_URLS.USER, userId);
};

// Fetch user data from local storage
export const fetchUserFromLocal = async (userId: string): Promise<User> => {
  return fetchFromLocal<User>(CONTEXT_NAMES.USER, userId);
};

// Update user data in the database
export const updateUserInDatabase = async (userId: string, updatedUser: User) => {
  return updateInDatabase(CONTEXT_NAMES.USER, API_URLS.USER, userId, updatedUser);
};

// Retry updating user data if previous updates failed
export const retryUserUpdate = async (userId: string) => {
  return retryUpdate<User>(CONTEXT_NAMES.USER, API_URLS.USER, userId);
};
