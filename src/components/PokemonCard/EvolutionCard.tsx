import { View } from "react-native";
import React from "react";
import Text from "../Text";
import { UniquePokemonData } from "../../interfaces/PokemonProps";

interface EvolutionCardProps {
  pokemon: UniquePokemonData;
}
const EvolutionCard = ({ pokemon }: EvolutionCardProps) => {
  return (
    <View className="flex-1 px-4 items-center justify-start">
      <Text className="pt-24" size="XS">Coming soon, stay tuned!</Text>
    </View>
  );
};

export default EvolutionCard;
