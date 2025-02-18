import { CONTEXT_NAMES } from '@/src/constants/contextNames';
import { DEFAULT_VALUES } from '@/src/constants/defaultValues';
import { createGenericContext } from '../genericContext';
import { API_URLS } from '@/src/constants/apiUrls';

export const { GenericProvider: ThemeProvider, useGenericContext: useThemeContext } =
  createGenericContext(CONTEXT_NAMES.THEME, API_URLS.THEME, DEFAULT_VALUES.THEME);