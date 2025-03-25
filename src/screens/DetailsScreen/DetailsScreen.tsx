import { DetailsScreenProps } from "@/src/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";

export function DetailsScreen() {
    const { navigation } = useNavigation<DetailsScreenProps>();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
