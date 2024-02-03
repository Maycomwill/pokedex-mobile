import { View, Text } from "react-native";
import React from "react";
import { RootStackParamList } from "../routes/AppRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Type">;

const Type = ({ route }: Props) => {
  return (
    <View
      className="items-center
    justify-center flex-1"
    >
      <Text>{route.params.type}</Text>
    </View>
  );
};

export default Type;
