import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchFromLocal, fetchFromDB, updateInDatabase } from "../apis/genericApi";

interface GenericContextType<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

export const createGenericContext = <T,>(contextKey: string, collectionName: string, defaultValue: T) => {
  const GenericContext = createContext<GenericContextType<T> | null>(null);

  const GenericProvider: React.FC<{ children: React.ReactNode; docId: string|null }> = ({ children, docId }) => {
    const [data, setData] = useState<T>(defaultValue);
    const initCompleted = useRef(false);

    useEffect(() => {
      if (!docId) return;

      const initializeData = async () => {        
        fetchFromDB<T>(contextKey, collectionName, docId).then((dbData) => {
          setData(dbData);
          AsyncStorage.setItem(`${contextKey}-${docId}`, JSON.stringify(dbData));
        }).catch(async () => {
          console.error(`Failed to fetch ${contextKey} from DB for user ${docId}`);
          const localData = await fetchFromLocal<T>(contextKey, docId);
          setData(localData ?? defaultValue);
        });
      };

      initializeData();
    }, [docId]);

    useEffect(() => {
      if (!docId) return;
      if (!initCompleted.current) {
        initCompleted.current = true;
        return;
      }
      updateInDatabase(contextKey, collectionName, docId, data)
        .then(() => AsyncStorage.setItem(`${contextKey}-${docId}`, JSON.stringify(data)))
        .catch(async () => {
          console.error(`Failed to update ${contextKey} in DB for user ${docId}, storing for retry`);
          await AsyncStorage.setItem(`pending_${contextKey}_update-${docId}`, JSON.stringify(data));
        });
    }, [data, docId]);

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
