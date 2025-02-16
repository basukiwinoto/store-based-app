// src/App.tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import { AppProvider } from './contexts/AppContext';
import UserComponent from './components/UserComponents';
import ThemeComponent from './components/ThemeComponents';

const App: React.FC = () => {
  return (
    <AppProvider>
      <SafeAreaView>
        <UserComponent />
        <ThemeComponent />
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;