import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import colors from "tailwindcss/colors";

const Loading = () => {
  return (
    <View className="flex-1 bg-zinc-100 items-center justify-center">
      <ActivityIndicator size={128} color={colors.green[500]} />
    </View>
  );
};

export default Loading;
