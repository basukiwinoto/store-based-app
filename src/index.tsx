import React from 'react';
import { SafeAreaView } from 'react-native';
import { AppProvider } from './contexts/AppContext';
import UserComponent from './components/UserComponents';
import ThemeComponent from './components/ThemeComponents';

const App: React.FC = () => {
  const userId = 'example-user-id'; // Replace with dynamic user ID retrieval

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
