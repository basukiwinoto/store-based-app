# Contributing to React Native Context Management

Thank you for your interest in contributing! This guide outlines the steps to add a new context to the project.

## Steps to Add a New Context

### 1. Create API Functions
Each context should interact with an API. Add a new file under `src/api/` to manage database interactions.

#### Example: `src/api/exampleApi.ts`
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchExampleFromDB = async () => {
  try {
    const response = await fetch("https://api.example.com/example");
    const data = await response.json();
    await AsyncStorage.setItem('example', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Failed to fetch example data", error);
    return {};
  }
};

export const fetchExampleFromLocal = async () => {
  try {
    const localData = await AsyncStorage.getItem('example');
    return localData ? JSON.parse(localData) : {};
  } catch (error) {
    console.error("Failed to load example data from local storage", error);
    return {};
  }
};

export const updateExampleInDatabase = async (updatedExample: any) => {
  try {
    await fetch("https://api.example.com/example", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedExample),
    });
    await AsyncStorage.setItem('example', JSON.stringify(updatedExample));
  } catch (error) {
    console.error("Failed to update example in the database", error);
    await AsyncStorage.setItem('pending_example_update', JSON.stringify(updatedExample));
  }
};

export const retryExampleUpdate = async () => {
  try {
    const pendingUpdate = await AsyncStorage.getItem('pending_example_update');
    if (pendingUpdate) {
      const example = JSON.parse(pendingUpdate);
      await updateExampleInDatabase(example);
      await AsyncStorage.removeItem('pending_example_update');
    }
  } catch (error) {
    console.error("Failed to retry example update", error);
  }
};
```

### 2. Create the Context
Define a new context under `src/context/`.

#### Example: `src/context/ExampleContext.tsx`
```typescript
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { fetchExampleFromLocal, fetchExampleFromDB, updateExampleInDatabase } from '../api/exampleApi';

interface ExampleContextType {
  example: any;
  setExample: React.Dispatch<React.SetStateAction<any>>;
}

const ExampleContext = createContext<ExampleContextType | null>(null);

export const ExampleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [example, setExample] = useState<any>({});
  const isFirstLoad = useRef(true);

  useEffect(() => {
    fetchExampleFromLocal().then((localData) => {
      setExample(localData);
      fetchExampleFromDB().then(setExample);
      isFirstLoad.current = false;
    });
  }, []);

  useEffect(() => {
    if (!isFirstLoad.current) {
      updateExampleInDatabase(example);
    }
  }, [example]);

  return (
    <ExampleContext.Provider value={{ example, setExample }}>
      {children}
    </ExampleContext.Provider>
  );
};

export const useExampleContext = (): ExampleContextType => {
  const context = useContext(ExampleContext);
  if (!context) {
    throw new Error("useExampleContext must be used within an ExampleProvider");
  }
  return context;
};
```

### 3. Integrate with `AppProvider`
Add the new context to `src/context/AppContext.tsx`.

```typescript
import React from 'react';
import { ExampleProvider } from './ExampleContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ExampleProvider>
      {children}
    </ExampleProvider>
  );
};
```

### 4. Use the Context in Components
In your components, use the new context:
```typescript
import { useExampleContext } from '../context/ExampleContext';

const ExampleComponent: React.FC = () => {
  const { example, setExample } = useExampleContext();
  return <div>{JSON.stringify(example)}</div>;
};
```

### 5. Test the Integration
Ensure:
- The context initializes correctly.
- Updates persist to local storage and the database.
- The retry mechanism works when offline.

### 6. Submit Your Changes
- Run `eslint` and `prettier` to format your code.
- Submit a pull request with a detailed description.

Thank you for contributing! 🎉

