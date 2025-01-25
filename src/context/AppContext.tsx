// src/context/AppContext.js
import React, { createContext, useState, useContext } from 'react';
import { ContextKey, ContextModel } from './ContextModel';
import { useContextController } from './useContextController';

// Create a context
const AppContext = createContext({} as ContextModel);

// Create a provider component
export const AppProvider = (props: any) => {
    const {children} = props;
    const { context, updateContext } = useContextController();

  return (
    <AppContext.Provider value={{ context, updateContext }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook for using the context
export const useAppContext = () => useContext(AppContext);
