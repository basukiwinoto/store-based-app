import { CONTEXT_NAMES } from '@/src/constants/contextNames';
import { DEFAULT_VALUES } from '@/src/constants/defaultValues';
import { createGenericContext } from '../genericContext';
import { DB_PATHS } from '@/src/constants/dbPaths';

export const { GenericProvider: UserProvider, useGenericContext: useUserContext } =
  createGenericContext(CONTEXT_NAMES.USER, DB_PATHS.USER, DEFAULT_VALUES.USER);