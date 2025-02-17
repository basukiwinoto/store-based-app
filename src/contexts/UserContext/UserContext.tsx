// src/context/UserContext.ts
import { fetchUserFromDB, updateUserInDatabase } from '@/src/apis';
import { createGenericContext } from '../genericContext';
import { CONTEXT_NAMES } from '@/src/constants/contextNames';

const defaultUser = { name: "", age: 0, address: { city: "", street: "" } };
export const { GenericProvider: UserProvider, useGenericContext: useUserContext } =
  createGenericContext(CONTEXT_NAMES.USER, fetchUserFromDB, updateUserInDatabase, defaultUser);
