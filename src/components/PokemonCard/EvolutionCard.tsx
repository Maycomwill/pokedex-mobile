import { ScrollView } from "react-native";
import React from "react";
import Text from "../Text";
import { UniquePokemonData } from "../../interfaces/PokemonProps";

interface EvolutionCardProps {
  pokemon: UniquePokemonData;
}
const EvolutionCard = ({ pokemon }: EvolutionCardProps) => {
  return (
    <ScrollView className="flex-1 px-4 bg-green-500">
      <Text>Evolution page</Text>
    </ScrollView>
  );
};

export default EvolutionCard;
