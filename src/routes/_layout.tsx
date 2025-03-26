import React, { useEffect, useState } from 'react';
import { Drawer } from 'expo-router/drawer';
import { AppProvider } from '../contexts/AppContext';
import { getAuth, signInAnonymously } from 'firebase/auth';
import '../configs/firebaseConfig';

if(__DEV__) {
    require('../configs/reactotronConfig');
  }
  
export default function RootLayout() {
  const [userId, setUserId] = useState<string|null>(null);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUserId(user.uid);
      }
    });
    signInAnonymously(auth).catch((error) => {
      console.error('Failed to sign in anonymously:', error);
    }
    );
  }
  , []);

  return (
    <AppProvider userId={userId}>
        <Drawer>
          <Drawer.Screen name="(tabs)" options={{ title: 'Home' }} />
          <Drawer.Screen name="settings"  options={{ title: 'Settings' }} />
        </Drawer>
    </AppProvider>
  );
}