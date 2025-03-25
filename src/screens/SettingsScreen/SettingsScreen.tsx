import { SettingsScreenProps } from "@/src/navigation/types";
import React from "react";
import { View, Button, Text } from "react-native";

export function SettingsScreen({ navigation }: SettingsScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
    </View>
  );
}
