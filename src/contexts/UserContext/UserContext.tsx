import { CONTEXT_NAMES } from '@/src/constants/contextNames';
import { DEFAULT_VALUES } from '@/src/constants/defaultValues';
import { createGenericContext } from '../genericContext';
import { COLLECTION_NAMES } from '@/src/constants/collectionNames';

export const { GenericProvider: UserProvider, useGenericContext: useUserContext } =
  createGenericContext(CONTEXT_NAMES.USER, COLLECTION_NAMES.USER, DEFAULT_VALUES.USER);