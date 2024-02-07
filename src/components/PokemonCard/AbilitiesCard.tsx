import { ScrollView } from "react-native";
import React from "react";
import Text from "../Text";
import { UniquePokemonData } from "../../interfaces/PokemonProps";

interface AbilitiesCardProps {
  pokemon: UniquePokemonData;
}
const AbilitiesCard = ({ pokemon }: AbilitiesCardProps) => {
  return (
    <ScrollView className="flex-1 px-4 bg-yellow-500">
      <Text>Abilities page</Text>
    </ScrollView>
  );
};

export default AbilitiesCard;
