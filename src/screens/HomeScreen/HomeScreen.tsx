import { useAppContext } from "@/src/contexts/useAppContext";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import React from "react";
import { View, Button, Text } from "react-native";

// Sample Screens with TypeScript types
export function HomeScreen() {
  const router = useRouter();
  const { user } = useAppContext();
  const auth = getAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Text>User: {`${user.name}`}</Text>
      <Text>UserId: {`${auth.currentUser?.uid}`}</Text>
      <Button title="Go to Details" onPress={() => router.navigate('./details')} />
    </View>
  );
}

