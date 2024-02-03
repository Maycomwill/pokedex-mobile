import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import colors from "tailwindcss/colors";

interface ButtonIconProps {
  icon: "heart" | "map-marker" | "star" | "pokeball";
  color?: "WHITE" | "BLACK";
}

const ButtonIcon = ({ icon, color = "WHITE" }: ButtonIconProps) => {
  function handleColor(color: string) {
    switch (color) {
      case "WHITE":
        return colors.zinc[100];
      case "BLACK":
        return colors.zinc[900];
    }
  }
  return (
    <View className="absolute right-6">
      <MaterialCommunityIcons
        name={icon}
        size={28}
        color={handleColor(color)}
      />
    </View>
  );
};

export default ButtonIcon;
