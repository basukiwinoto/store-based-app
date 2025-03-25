import { HomeScreenProps } from "@/src/navigation/types";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Button, Text } from "react-native";

// Sample Screens with TypeScript types
export function HomeScreen() {
    const { navigation } = useNavigation<HomeScreenProps>();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

