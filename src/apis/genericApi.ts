import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_VALUES } from "@/src/constants/defaultValues";
import { doc, DocumentData, getDoc, getFirestore, setDoc } from "firebase/firestore";

export const fetchFromDB = async <T>(contextKey: string, collectionName: string, docId: string): Promise<T> => {
  try {
    const db = getFirestore();
    const data = (await getDoc(doc(db, collectionName, docId))).data() as T;
    await AsyncStorage.setItem(`${contextKey}-${docId}`, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(`Failed to fetch data for ${contextKey}`, error);
    return DEFAULT_VALUES[contextKey as keyof typeof DEFAULT_VALUES] as T;
  }
};

export const fetchFromLocal = async <T>(contextKey: string, docId: string): Promise<T> => {
  try {
    const localData = await AsyncStorage.getItem(`${contextKey}-${docId}`);
    return localData ? JSON.parse(localData) : DEFAULT_VALUES[contextKey as keyof typeof DEFAULT_VALUES] as T;
  } catch (error) {
    console.error(`Failed to load local data for ${contextKey}`, error);
    return DEFAULT_VALUES[contextKey as keyof typeof DEFAULT_VALUES] as T;
  }
};

export const updateInDatabase = async <T>(contextKey: string, collectionName: string, docId: string, updatedData: T) => {
  try {
    const db = getFirestore();
    await setDoc(doc(db, collectionName, docId), updatedData as DocumentData);
    await AsyncStorage.setItem(`${contextKey}-${docId}`, JSON.stringify(updatedData));
  } catch (error) {
    console.error(`Failed to update data for ${contextKey}`, error);
    await AsyncStorage.setItem(`pending_${contextKey}_update-${docId}`, JSON.stringify(updatedData));
  }
};

export const retryUpdate = async <T>(contextKey: string, collectionName: string, docId: string) => {
  try {
    const pendingUpdate = await AsyncStorage.getItem(`pending_${contextKey}_update-${docId}`);
    if (pendingUpdate) {
      const data = JSON.parse(pendingUpdate) as T;
      await updateInDatabase(contextKey, collectionName, docId, data);
      await AsyncStorage.removeItem(`pending_${contextKey}_update-${docId}`);
    }
  } catch (error) {
    console.error(`Failed to retry update for ${contextKey}`, error);
  }
};
