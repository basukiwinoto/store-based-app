// src/context/UserContext.tsx
import { fetchUserFromDB, fetchUserFromLocal, updateUserInDatabase } from '@/src/apis';
import { User } from '@/src/models';
import { debounce } from '@/src/utils/commonUtils';
import React, { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react';

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}
  
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ name: "John", age: 30, address: { city: "Unknown", street: "Unknown" } });
  const isFirstLoad = useRef(true);

  useEffect(() => {
    fetchUserFromLocal().then((localData) => {
      setUser(localData);
      fetchUserFromDB().then(setUser);
      isFirstLoad.current = false;
    });
  }, []);

  useEffect(() => {
    const debouncedUpdateUser = debounce(updateUserInDatabase, 2000);
    if (!isFirstLoad.current) {
      debouncedUpdateUser(user);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
