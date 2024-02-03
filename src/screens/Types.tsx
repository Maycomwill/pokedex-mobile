import { FlatList, ScrollView, View } from "react-native";
import React from "react";
import Text from "../components/Text";
import TypeCard from "../components/TypeCard";

const Types = () => {
  const types = [
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ];
  return (
    <View className="w-full px-4 pt-4 items-start justify-start flex-1 bg-green-500 space-y-4">
      <Text color="WHITE" size="3XL" weight="BOLD">
        Escolha um tipo
      </Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical
        contentContainerStyle={{
          paddingBottom: 64,
          gap: 12,
          width: "100%",
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-evenly", columnGap: 12 }}
        data={types}
        className="w-full "
        renderItem={({ item }) => <TypeCard type={item} />}
      />
    </View>
  );
};

export default Types;
