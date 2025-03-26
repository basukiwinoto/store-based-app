import React from "react";
import { View, Button, Text } from "react-native";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

export function SettingsScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Drawer" onPress={() => { navigation.dispatch(DrawerActions.openDrawer()); }} />
    </View>
  );
}
