// src/context/ThemeContext.ts
import { CONTEXT_NAMES } from '@/src/constants/contextNames';
import { createGenericContext } from '../genericContext';
import { fetchThemeFromDB, updateThemeInDatabase } from '@/src/apis';
import { DEFAULT_VALUES } from '@/src/constants/defaultValues';

export const { GenericProvider: ThemeProvider, useGenericContext: useThemeContext } =
  createGenericContext(CONTEXT_NAMES.THEME, fetchThemeFromDB, updateThemeInDatabase, DEFAULT_VALUES.THEME);
