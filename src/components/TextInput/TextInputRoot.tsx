import { View, Text } from "react-native";
import React, { ReactNode } from "react";

const TextInputRoot = ({ children }: { children: ReactNode }) => {
  return (
    <View className="w-full items-center justify-center relative z-0">
      {children}
    </View>
  );
};

export default TextInputRoot;
