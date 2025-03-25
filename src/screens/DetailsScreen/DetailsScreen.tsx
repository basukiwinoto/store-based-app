import { DetailsScreenProps } from "@/src/navigation/types";
import { View, Text } from "react-native";

export function DetailsScreen({ navigation }: DetailsScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
