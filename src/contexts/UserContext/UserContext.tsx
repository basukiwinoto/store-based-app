import { CONTEXT_NAMES } from '@/src/constants/contextNames';
import { DEFAULT_VALUES } from '@/src/constants/defaultValues';
import { createGenericContext } from '../genericContext';
import { API_URLS } from '@/src/constants/apiUrls';

export const { GenericProvider: UserProvider, useGenericContext: useUserContext } =
  createGenericContext(CONTEXT_NAMES.USER, API_URLS.USER, DEFAULT_VALUES.USER);