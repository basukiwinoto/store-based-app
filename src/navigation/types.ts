import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer";

// Define types for route parameters (if any)
export type RootDrawerParamList = {
  HomeTabs: undefined;
  Settings: undefined;
};

export type HomeTabsParamList = {
  Home: undefined;
  Profile: undefined;
  Details: undefined;
};

// Define screen component props types
export type HomeScreenProps = BottomTabScreenProps<HomeTabsParamList, 'Home'>;
export type SettingsScreenProps = DrawerScreenProps<RootDrawerParamList, 'Settings'>;
export type ProfileScreenProps = BottomTabScreenProps<HomeTabsParamList, 'Profile'>;
export type DetailsScreenProps = BottomTabScreenProps<HomeTabsParamList, 'Details'>;

