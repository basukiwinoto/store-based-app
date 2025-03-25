import { SettingsScreenProps } from "@/src/navigation/types";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Button, Text } from "react-native";

export function SettingsScreen() {
    const { navigation } = useNavigation<SettingsScreenProps>();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
    </View>
  );
}
