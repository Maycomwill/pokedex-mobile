import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const colors = {
  primary: "#673ab7",
  secondary: "#03dac6",
};
const Loading = () => {
  return (
    <View className="flex-1 bg-transparent items-center justify-center">
      <ActivityIndicator size={128} color={colors.secondary} />
    </View>
  );
};

export default Loading;
