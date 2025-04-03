import { COLLECTION_NAMES } from "@/src/constants/collectionNames";
import { CONTEXT_NAMES } from "@/src/constants/contextNames";
import { User } from "@/src/models";
import { fetchFromDB, fetchFromLocal, retryUpdate, updateInDatabase } from "../genericApi";

// Fetch user data from the database
export const fetchUserFromDB = async (docId: string): Promise<User> => {
  return fetchFromDB<User>(CONTEXT_NAMES.USER, COLLECTION_NAMES.USER, docId);
};

// Fetch user data from local storage
export const fetchUserFromLocal = async (docId: string): Promise<User> => {
  return fetchFromLocal<User>(CONTEXT_NAMES.USER, docId);
};

// Update user data in the database
export const updateUserInDatabase = async (docId: string, updatedUser: User) => {
  return updateInDatabase(CONTEXT_NAMES.USER, COLLECTION_NAMES.USER, docId, updatedUser);
};

// Retry updating user data if previous updates failed
export const retryUserUpdate = async (docId: string) => {
  return retryUpdate<User>(CONTEXT_NAMES.USER, COLLECTION_NAMES.USER, docId);
};
