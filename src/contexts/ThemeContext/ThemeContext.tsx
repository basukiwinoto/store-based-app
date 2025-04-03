import { CONTEXT_NAMES } from '@/src/constants/contextNames';
import { DEFAULT_VALUES } from '@/src/constants/defaultValues';
import { createGenericContext } from '../genericContext';
import { COLLECTION_NAMES } from '@/src/constants/collectionNames';

export const { GenericProvider: ThemeProvider, useGenericContext: useThemeContext } =
  createGenericContext(CONTEXT_NAMES.THEME, COLLECTION_NAMES.THEME, DEFAULT_VALUES.THEME);