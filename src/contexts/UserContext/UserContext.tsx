// src/context/UserContext.ts
import { fetchUserFromDB, updateUserInDatabase } from '@/src/apis';
import { createGenericContext } from '../genericContext';
import { CONTEXT_NAMES } from '@/src/constants/contextNames';
import { DEFAULT_VALUES } from '@/src/constants/defaultValues';

export const { GenericProvider: UserProvider, useGenericContext: useUserContext } =
  createGenericContext(CONTEXT_NAMES.USER, fetchUserFromDB, updateUserInDatabase, DEFAULT_VALUES.USER);
