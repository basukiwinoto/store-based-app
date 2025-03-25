import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabsParamList, RootDrawerParamList } from './types';
import { HomeScreen, ProfileScreen, DetailsScreen, SettingsScreen } from '../screens';

// Bottom Tab Navigator with TypeScript types
const Tab = createBottomTabNavigator<HomeTabsParamList>();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
    </Tab.Navigator>
  );
}

// Drawer Navigator with TypeScript types
const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function Navigation() {
  return (
    <>
      <Drawer.Navigator initialRouteName="HomeTabs">
        <Drawer.Screen name="HomeTabs" component={HomeTabs} options={{ title: 'Home' }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </>
  );
}