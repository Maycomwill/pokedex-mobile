import { ScrollView, View } from "react-native";
import React from "react";
import Text from "../Text";
import { UniquePokemonData } from "../../interfaces/PokemonProps";
import StatsValues from "./StatsCardComponents/StatsValues";

interface StatsCardProps {
  pokemon: UniquePokemonData;
}

const StatsCard = ({ pokemon }: StatsCardProps) => {
  console.log(pokemon.stats);
  return (
    <ScrollView className="flex-1 px-4 flex-col">
      <View className="w-full">
        <StatsValues name="HP" value={pokemon.stats.hp.base_stat} />
        <StatsValues name="Ataque" value={pokemon.stats.attack.base_stat} />
        <StatsValues name="Defesa" value={pokemon.stats.defense.base_stat} />
        <StatsValues
          name="Ataque sp."
          value={pokemon.stats.specialAttack.base_stat}
        />
        <StatsValues
          name="Defesa sp."
          value={pokemon.stats.specialDefense.base_stat}
        />
        <StatsValues name="Speed" value={pokemon.stats.speed.base_stat} />
      </View>

      <View></View>
    </ScrollView>
  );
};

export default StatsCard;
