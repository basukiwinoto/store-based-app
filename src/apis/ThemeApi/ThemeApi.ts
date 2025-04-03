import { COLLECTION_NAMES } from "@/src/constants/collectionNames";
import { CONTEXT_NAMES } from "@/src/constants/contextNames";
import { Theme } from "@/src/models";
import { fetchFromDB, fetchFromLocal, retryUpdate, updateInDatabase } from "../genericApi";

// Fetch theme settings from the database
export const fetchThemeFromDB = async (docId: string): Promise<Theme> => {
  return fetchFromDB<Theme>(CONTEXT_NAMES.THEME, COLLECTION_NAMES.THEME, docId);
};

// Fetch theme settings from local storage
export const fetchThemeFromLocal = async (docId: string): Promise<Theme> => {
  return fetchFromLocal<Theme>(CONTEXT_NAMES.THEME, docId);
};

// Update theme settings in the database
export const updateThemeInDatabase = async (docId: string, updatedTheme: Theme) => {
  return updateInDatabase(CONTEXT_NAMES.THEME, COLLECTION_NAMES.THEME, docId, updatedTheme);
};

// Retry updating theme settings if previous updates failed
export const retryThemeUpdate = async (docId: string) => {
  return retryUpdate<Theme>(CONTEXT_NAMES.THEME, COLLECTION_NAMES.THEME, docId);
};
