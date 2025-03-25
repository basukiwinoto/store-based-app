import { DB_PATHS } from "@/src/constants/dbPaths";
import { CONTEXT_NAMES } from "@/src/constants/contextNames";
import { Theme } from "@/src/models";
import { fetchFromDB, fetchFromLocal, retryUpdate, updateInDatabase } from "../genericApi";

// Fetch theme settings from the database
export const fetchThemeFromDB = async (userId: string): Promise<Theme> => {
  return fetchFromDB<Theme>(CONTEXT_NAMES.THEME, DB_PATHS.THEME, userId);
};

// Fetch theme settings from local storage
export const fetchThemeFromLocal = async (userId: string): Promise<Theme> => {
  return fetchFromLocal<Theme>(CONTEXT_NAMES.THEME, userId);
};

// Update theme settings in the database
export const updateThemeInDatabase = async (userId: string, updatedTheme: Theme) => {
  return updateInDatabase(CONTEXT_NAMES.THEME, DB_PATHS.THEME, userId, updatedTheme);
};

// Retry updating theme settings if previous updates failed
export const retryThemeUpdate = async (userId: string) => {
  return retryUpdate<Theme>(CONTEXT_NAMES.THEME, DB_PATHS.THEME, userId);
};
