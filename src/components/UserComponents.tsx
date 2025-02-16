// src/components/UserComponent.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAppContext } from '../contexts/useAppContext';

const UserComponent: React.FC = () => {
  const { context } = useAppContext();
  return (
    <View>
      <Text>User: {context.user.name}</Text>
      <Button title="Change Name" onPress={() => context.setUser({ ...context.user, name: "Alice" })} />
    </View>
  );
};

export default UserComponent;
