import { CONTEXT_NAMES } from '@/src/constants/contextNames';
import { DEFAULT_VALUES } from '@/src/constants/defaultValues';
import { createGenericContext } from '../genericContext';
import { DB_PATHS } from '@/src/constants/dbPaths';

export const { GenericProvider: ThemeProvider, useGenericContext: useThemeContext } =
  createGenericContext(CONTEXT_NAMES.THEME, DB_PATHS.THEME, DEFAULT_VALUES.THEME);