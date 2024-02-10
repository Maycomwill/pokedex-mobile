import { SafeAreaView, TouchableOpacity, View } from "react-native";
import React from "react";
import { StatusBarHeight } from "../../utils/StatusBarHeight";
import { Feather } from "@expo/vector-icons";
import Text from "../Text";
import colors from "tailwindcss/colors";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  leftIcon?: boolean;
  title?: string;
  rightIcon?: boolean;
}

const Header = ({ leftIcon, title, rightIcon }: HeaderProps) => {
  const naviagation = useNavigation();
  // const paddingTop = {StatusBarHeight ? StatusBarHeight : 64}
  return (
    <SafeAreaView
      style={{
        paddingTop: StatusBarHeight,
        minHeight: StatusBarHeight,
      }}
      className="transparent w-full flex flex-row items-center justify-between px-4 mb-6"
    >
      <TouchableOpacity
        onPress={() => {
          naviagation.goBack();
        }}
        className="w-1/4 min-h-1 items-center justify-center"
      >
        {leftIcon ? (
          <Feather name="chevron-left" size={32} color={colors.zinc[100]} />
        ) : null}
      </TouchableOpacity>
      <View className="w-1/2 items-center justify-center">
        {title ? (
          <Text color="WHITE" size="LG" weight="BOLD">
            {title}
          </Text>
        ) : null}
      </View>
      <View className="w-1/4 min-h-1 items-center justify-center">
        {rightIcon ? (
          <Feather name="chevron-left" size={32} color={colors.zinc[100]} />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Header;
