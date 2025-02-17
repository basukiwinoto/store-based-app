# Contributing to React Native Context Management

Thank you for your interest in contributing! This guide outlines the steps to add a new context to the project using the **generic context factory**.

## Steps to Add a New Context

### 1. Define Context Names in Constants File
All context names should be stored in a constants file for better organization and maintainability.

#### Example: `src/constants/contextNames.ts`
```typescript
export const CONTEXT_NAMES = {
  EXAMPLE: "example",
  USER: "user",
  THEME: "theme",
};
```

### 2. Define API URLs in Constants File
All API endpoint URLs should be stored in a constants file to maintain consistency and allow easy modifications.

#### Example: `src/constants/apiUrls.ts`
```typescript
export const API_URLS = {
  EXAMPLE: "https://api.example.com/example",
  USER: "https://api.example.com/user",
  THEME: "https://api.example.com/theme",
};
```

### 3. Create API Functions
Each context should interact with an API. Add a new file under `src/api/` to manage database interactions.

#### Example: `src/api/exampleApi.ts`
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONTEXT_NAMES } from '../constants/contextNames';
import { API_URLS } from '../constants/apiUrls';

export const fetchExampleFromDB = async () => {
  try {
    const response = await fetch(API_URLS.EXAMPLE);
    const data = await response.json();
    await AsyncStorage.setItem(CONTEXT_NAMES.EXAMPLE, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Failed to fetch example data", error);
    return {};
  }
};

export const updateExampleInDatabase = async (updatedExample: any) => {
  try {
    await fetch(API_URLS.EXAMPLE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedExample),
    });
    await AsyncStorage.setItem(CONTEXT_NAMES.EXAMPLE, JSON.stringify(updatedExample));
  } catch (error) {
    console.error("Failed to update example in the database", error);
    await AsyncStorage.setItem(`pending_${CONTEXT_NAMES.EXAMPLE}_update`, JSON.stringify(updatedExample));
  }
};
```

### 4. Create a New Context Using the Generic Factory
Define a new context under `src/context/` using the `createGenericContext` function.

#### Example: `src/context/ExampleContext.ts`
```typescript
import { createGenericContext } from "../utils/genericContext";
import { fetchExampleFromDB, updateExampleInDatabase } from "../api/exampleApi";
import { CONTEXT_NAMES } from "../constants/contextNames";

const defaultExample = {};
export const { GenericProvider: ExampleProvider, useGenericContext: useExampleContext } =
  createGenericContext(CONTEXT_NAMES.EXAMPLE, fetchExampleFromDB, updateExampleInDatabase, defaultExample);
```

### 5. Integrate with `AppProvider`
Add the new context to `src/context/AppContext.ts`.

```typescript
import React from "react";
import { ExampleProvider } from "./ExampleContext";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ExampleProvider>{children}</ExampleProvider>;
};
```

### 6. Use the Context in Components
In your components, use the new context:
```typescript
import { useExampleContext } from "../context/ExampleContext";

const ExampleComponent: React.FC = () => {
  const { data: example, setData: setExample } = useExampleContext();
  return <div>{JSON.stringify(example)}</div>;
};
```

### 7. Test the Integration
Ensure:
- The context initializes correctly.
- Updates persist to local storage and the database.
- The retry mechanism works when offline.

### 8. Submit Your Changes
- Run `eslint` and `prettier` to format your code.
- Submit a pull request with a detailed description.

Thank you for contributing! 🎉