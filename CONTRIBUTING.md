# Contributing to React Native Context Management

Thank you for your interest in contributing! This guide outlines the steps to add a new context to the project using the **generic context factory** and integrate all context hooks into a single `useAppContext` hook.

## Steps to Add a New Context

### 1. Define Constants for Context Names, API URLs, and Default Values
All context names, API URLs, and default values should be stored in constants files for better organization and maintainability.

#### Example: `src/constants/contextNames.ts`
```typescript
export const CONTEXT_NAMES = {
  EXAMPLE: "example",
  USER: "user",
  THEME: "theme",
};
```

#### Example: `src/constants/apiUrls.ts`
```typescript
export const API_URLS = {
  EXAMPLE: "https://api.example.com/example",
  USER: "https://api.example.com/user",
  THEME: "https://api.example.com/theme",
};
```

#### Example: `src/constants/defaultValues.ts`
```typescript
export const DEFAULT_VALUES = {
  EXAMPLE: {},
  USER: { name: "", age: 0 },
  THEME: { darkMode: false },
};
```

### 2. Create API Functions
Each context should interact with an API. Add a new file under `src/api/` to manage database interactions.

#### Example: `src/api/exampleApi.ts`
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONTEXT_NAMES } from '../constants/contextNames';
import { API_URLS } from '../constants/apiUrls';

export const fetchExampleFromDB = async (userId: string) => {
  try {
    const response = await fetch(`${API_URLS.EXAMPLE}?userId=${userId}`);
    const data = await response.json();
    await AsyncStorage.setItem(`${CONTEXT_NAMES.EXAMPLE}-${userId}`, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Failed to fetch example data", error);
    return {};
  }
};

export const updateExampleInDatabase = async (userId: string, updatedExample: any) => {
  try {
    await fetch(`${API_URLS.EXAMPLE}?userId=${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedExample),
    });
    await AsyncStorage.setItem(`${CONTEXT_NAMES.EXAMPLE}-${userId}`, JSON.stringify(updatedExample));
  } catch (error) {
    console.error("Failed to update example in the database", error);
    await AsyncStorage.setItem(`pending_${CONTEXT_NAMES.EXAMPLE}_update-${userId}`, JSON.stringify(updatedExample));
  }
};
```

### 3. Create a New Context Using the Generic Factory
Define a new context under `src/context/` using the `createGenericContext` function.

#### Example: `src/context/ExampleContext.ts`
```typescript
import { createGenericContext } from "../utils/genericContext";
import { fetchExampleFromDB, updateExampleInDatabase } from "../api/exampleApi";
import { CONTEXT_NAMES } from "../constants/contextNames";
import { DEFAULT_VALUES } from "../constants/defaultValues";

export const { GenericProvider: ExampleProvider, useGenericContext: useExampleContext } =
  createGenericContext(CONTEXT_NAMES.EXAMPLE, fetchExampleFromDB, updateExampleInDatabase, DEFAULT_VALUES.EXAMPLE);
```

### 4. Integrate with `AppProvider` and `useAppContext`
Add the new context to `src/context/AppContext.ts` and create a `useAppContext` hook to combine all contexts.

#### Example: `src/context/AppContext.ts`
```typescript
import React from "react";
import { ExampleProvider, useExampleContext } from "./ExampleContext";
import { UserProvider, useUserContext } from "./UserContext";
import { ThemeProvider, useThemeContext } from "./ThemeContext";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <UserProvider>
      <ThemeProvider>
        <ExampleProvider>{children}</ExampleProvider>
      </ThemeProvider>
    </UserProvider>
  );
};

export const useAppContext = () => {
  const { data: user, setData: setUser } = useUserContext();
  const { data: theme, setData: setTheme } = useThemeContext();
  const { data: example, setData: setExample } = useExampleContext();

  return {
    user,
    setUser,
    theme,
    setTheme,
    example,
    setExample,
  };
};
```

### 5. Use the Context in Components
In your components, use the unified `useAppContext`:
```typescript
import { useAppContext } from "../context/AppContext";

const ExampleComponent: React.FC = () => {
  const context = useAppContext();
  
  return (
    <div>
      <p>User: {context.user.name}</p>
      <p>Theme: {context.theme.darkMode ? "Dark" : "Light"}</p>
      <p>Example Data: {JSON.stringify(context.example)}</p>
    </div>
  );
};
```

### 6. Test the Integration
Ensure:
- The context initializes correctly.
- Updates persist to local storage and the database.
- The retry mechanism works when offline.

### 7. Submit Your Changes
- Run `eslint` and `prettier` to format your code.
- Submit a pull request with a detailed description.

Thank you for contributing! 🎉
