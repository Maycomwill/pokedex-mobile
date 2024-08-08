import { View, ScrollView } from "react-native";
import React, { useCallback } from "react";
import Text from "../Text";
import { UniquePokemonData } from "../../interfaces/pokemonInterfaces";
import { Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  Evolution,
  EvolutionDetail,
} from "../../interfaces/evolutionInterface";
import useEvolution from "../../hooks/useEvolution";

interface EvolutionCardProps {
  pokemon: UniquePokemonData;
  shiny?: boolean;
}

const EvolutionCard = ({ pokemon, shiny = false }: EvolutionCardProps) => {
  const { firstEvolution, secondEvolution, thirdEvolution } = useEvolution();
  const renderItem = useCallback(
    ({ item }: { item: Evolution }) => {
      return (
        <View key={item.name} className="items-center flex-1 justify-center">
          <Text weight="BOLD" size="BASE" transform="CAP">
            {item.name}
          </Text>
          {/* <Text size="XS">#{item.id.toString().padStart(3, "0")}</Text> */}
          <Image
            width={200}
            height={200}
            source={{
              uri: shiny ? item.sprites.shiny : item.sprites.default,
            }}
          />
        </View>
      );
    },
    [shiny]
  );

  function handleTrigger(details: EvolutionDetail) {
    switch (details.trigger.name) {
      case "level-up":
        return (
          <View className="flex items-center justify-center flex-row">
            <Feather name="chevron-up" size={18} color="black" />
            <Text size="XS">
              {details.min_level && details.min_level.toString()}
            </Text>
          </View>
        );

      default:
        return null;
    }
  }

  function handleWithRenderEvolutionChain(evolution: Evolution[]) {
    return evolution.map((e) => {
      return (
        <View
          className="flex flex-1 flex-row items-center justify-center space-x-4"
          key={e.name}
        >
          {evolution[0].details[0] !== undefined && (
            <View className="flex items-center justify-center flex-col space-y-2">
              {handleTrigger(evolution[0].details[0])}
              <Feather name="chevrons-right" size={24} color="black" />
            </View>
          )}
          <View className="flex flex-col items-center justify-center">
            <Image
              width={240}
              height={240}
              key={e.name}
              source={{
                uri: `${shiny ? e.sprites.shiny : e.sprites.default}`,
              }}
            />
            <Text className="capitalize">{e.name}</Text>
          </View>
        </View>
      );
    });
  }

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 48,
      }}
      horizontal
    >
      {firstEvolution && handleWithRenderEvolutionChain(firstEvolution)}
      <ScrollView horizontal>
        {secondEvolution && handleWithRenderEvolutionChain(secondEvolution)}
      </ScrollView>
      {thirdEvolution && handleWithRenderEvolutionChain(thirdEvolution)}
    </ScrollView>
  );
};

export default EvolutionCard;
