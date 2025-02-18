import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchFromLocal, fetchFromDB, updateInDatabase } from "../apis/genericApi";

interface GenericContextType<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

export const createGenericContext = <T,>(contextKey: string, apiUrl: string, defaultValue: T) => {
  const GenericContext = createContext<GenericContextType<T> | null>(null);

  const GenericProvider: React.FC<{ children: React.ReactNode; userId: string }> = ({ children, userId }) => {
    const [data, setData] = useState<T>(defaultValue);
    const isFirstLoad = useRef(true);

    useEffect(() => {
      const initializeData = async () => {
        const localData = await fetchFromLocal<T>(contextKey, userId);
        setData(localData);
        
        fetchFromDB<T>(contextKey, apiUrl, userId).then((dbData) => {
          setData(dbData);
          AsyncStorage.setItem(`${contextKey}-${userId}`, JSON.stringify(dbData));
        });
        
        isFirstLoad.current = false;
      };

      initializeData();
    }, [userId]);

    useEffect(() => {
      if (!isFirstLoad.current) {
        updateInDatabase(contextKey, apiUrl, userId, data)
          .then(() => AsyncStorage.setItem(`${contextKey}-${userId}`, JSON.stringify(data)))
          .catch(async () => {
            console.error(`Failed to update ${contextKey} in DB for user ${userId}, storing for retry`);
            await AsyncStorage.setItem(`pending_${contextKey}_update-${userId}`, JSON.stringify(data));
          });
      }
    }, [data, userId]);

    return <GenericContext.Provider value={{ data, setData }}>{children}</GenericContext.Provider>;
  };

  const useGenericContext = (): GenericContextType<T> => {
    const context = useContext(GenericContext);
    if (!context) {
      throw new Error(`useGenericContext must be used within a ${contextKey}Provider`);
    }
    return context;
  };

  return { GenericProvider, useGenericContext };
};
