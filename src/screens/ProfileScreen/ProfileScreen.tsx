import { ProfileScreenProps } from "@/src/navigation/types";
import React from "react";
import { View, Button, Text } from "react-native";

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
