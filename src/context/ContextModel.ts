import { Profile } from "../models";

export enum ContextKey {
    value = 'value',
    secondValue = 'secondValue',
    PROFILE = 'PROFILE',
    VALUE_STORE = 'VALUE_STORE',
}

export interface ContextStore {
    value: string;
    secondValue: string;
    profile: Profile;
}

export type ContextValue = ReturnType<{[K in keyof ContextStore]: () => (ContextStore)[K]}[keyof ContextStore]>;

export interface ContextModel {
    context: ContextStore;
    updateContext: (key: ContextKey, value: any) => void;
}