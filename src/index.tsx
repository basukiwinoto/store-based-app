import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { AppProvider } from './contexts/AppContext';
import UserComponent from './components/UserComponents';
import ThemeComponent from './components/ThemeComponents';
import './configs/firebaseConfig';
import { getAuth, signInAnonymously } from 'firebase/auth';

if(__DEV__) {
  require('./configs/reactotronConfig');
}

const App: React.FC = () => {
  const [userId, setUserId] = useState<string|null>(null);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      console.log('User:', user?.uid);
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
      <SafeAreaView>
        <UserComponent />
        <ThemeComponent />
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;
