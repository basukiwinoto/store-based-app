import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { View, Button, Text } from "react-native";

export function ProfileScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
      <Button title="Go to Home" onPress={() => router.navigate('../(tabs)')} />
    </View>
  );
}
