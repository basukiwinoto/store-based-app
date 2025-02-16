// src/components/UserComponent.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAppContext } from '../contexts/useAppContext';

const UserComponent: React.FC = () => {
  const { context } = useAppContext();
  return (
    <View>
      <Text>User: {context.user.name}</Text>
      <Text>Address: {context.user.address.city}</Text>
      <Button title="Change Name" onPress={() => context.setUser({ ...context.user, name: "Alice" })} />
      <Button title="Change Address" onPress={() => context.setUser({ ...context.user, address: { ...context.user.address, city: "Boston"} })} />
    </View>
  );
};

export default UserComponent;
