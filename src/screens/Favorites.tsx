import { View } from "react-native";
import React from "react";
import Text from "../components/Text";

const Favorites = () => {
  return (
    <View className="flex-1 items-center justify-start bg-red-500">
      <Text color="WHITE">Upcoming soon, stay tuned!</Text>
      <View className="flex-1 items-center justify-end pb-8">
      <Text color="WHITE" size="XS">Created by Maycom Willams with 💚</Text>
      </View>
    </View>
  );
};

export default Favorites;
