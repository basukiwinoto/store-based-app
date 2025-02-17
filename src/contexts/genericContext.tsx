// src/utils/genericContext.ts
import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FetchFunction<T> = () => Promise<T>;
type UpdateFunction<T> = (data: T) => Promise<void>;

interface GenericContextType<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

export const createGenericContext = <T,>(
  contextKey: string,
  fetchFromDB: FetchFunction<T>,
  updateToDB: UpdateFunction<T>,
  defaultValue: T
) => {
  const GenericContext = createContext<GenericContextType<T> | null>(null);

  const GenericProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<T>(defaultValue);
    const isFirstLoad = useRef(true);

    // Load from local storage first, then fetch from DB
    useEffect(() => {
      const initializeData = async () => {
        const localData = await AsyncStorage.getItem(contextKey);
        if (localData) {
          setData(JSON.parse(localData));
        }

        fetchFromDB().then((dbData) => {
          setData(dbData);
          AsyncStorage.setItem(contextKey, JSON.stringify(dbData));
        });

        isFirstLoad.current = false;
      };

      initializeData();
    }, []);

    // Update database and cache on state changes
    useEffect(() => {
      if (!isFirstLoad.current) {
        updateToDB(data)
          .then(() => AsyncStorage.setItem(contextKey, JSON.stringify(data)))
          .catch(async () => {
            console.error(`Failed to update ${contextKey} in DB, storing for retry`);
            await AsyncStorage.setItem(`pending_${contextKey}_update`, JSON.stringify(data));
          });
      }
    }, [data]);

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
