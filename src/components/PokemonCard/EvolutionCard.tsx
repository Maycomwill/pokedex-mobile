import { View, ScrollView } from "react-native";
import React, { useCallback } from "react";
import Text from "../Text";
import {
  evolutionProps,
  UniquePokemonData,
} from "../../interfaces/pokemonInterfaces";
import { Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Evolution } from "../../interfaces/evolutionInterface";
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

  function handleWithRenderEvolutionChain(evolution: Evolution[]) {
    return evolution.map((e) => {
      return (
        <View>
          <Image
          width={120}
          height={120}
          key={e.name}
          source={{
            uri: `${shiny ? e.sprites.shiny : e.sprites.default}`,
          }}
        />
        </View>
      );
    });
  }

  return (
    <View className="flex-1 flex-row px-4 pb-4 items-start justify-center">
      {firstEvolution && handleWithRenderEvolutionChain(firstEvolution)}
      <ScrollView horizontal >{secondEvolution && handleWithRenderEvolutionChain(secondEvolution)}</ScrollView>
      {thirdEvolution && handleWithRenderEvolutionChain(thirdEvolution)}
    </View>
  );
};

export default EvolutionCard;
