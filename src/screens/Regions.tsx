import { FlatList, View } from "react-native";
import React from "react";
import Text from "../components/Text";
import RegionCard from "../components/RegionCard";

const Regions = () => {
  const regions = [
    {
      regionName: "kanto",
      generation: 1,
    },
    {
      regionName: "johto",
      generation: 2,
    },
    {
      regionName: "hoenn",
      generation: 3,
    },
    {
      regionName: "sinnoh",
      generation: 4,
    },
    {
      regionName: "unova",
      generation: 5,
    },
    {
      regionName: "kalos",
      generation: 6,
    },
    {
      regionName: "alola",
      generation: 7,
    },
    {
      regionName: "galar",
      generation: 8,
    },
    {
      regionName: "paldea",
      generation: 9,
    },
  ];
  return (
    <View className="px-4 pt-4 items-start justify-start flex-1 bg-orange-500 w-full space-y-4">
      <Text align="JUSTIFY" color="WHITE" weight="BOLD" size="3XL">
        Encontre novos Pokémon{"\n"}através das regiões
      </Text>
      <FlatList
        className="w-full "
        data={regions}
        renderItem={({ item }) => <RegionCard region={item} />}
        contentContainerStyle={{
          paddingBottom: 64,
        }}
      />
    </View>
  );
};

export default Regions;
