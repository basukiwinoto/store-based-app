// src/components/ThemeComponent.tsx
import React from 'react';
import { Button } from 'react-native';
import { useAppContext } from '../contexts/useAppContext';

const ThemeComponent: React.FC = () => {
  const context = useAppContext();
  return (
    <Button
      title="Toggle Dark Mode"
      onPress={() => context.setTheme({ darkMode: !context.theme.darkMode })}
    />
  );
};

export default ThemeComponent;
