import { ScrollView, View } from "react-native";
import React from "react";
import Text from "../Text";
import { UniquePokemonData } from "../../interfaces/PokemonProps";
import StatsValues from "./StatsCardComponents/StatsValues";
import SymbolTypeCard from "../TypeCard/SymbolTypeCard";

interface StatsCardProps {
  pokemon: UniquePokemonData;
}

const StatsCard = ({ pokemon }: StatsCardProps) => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
      className="flex-1 px-4 flex-col"
    >
      <View className="w-full space-y-4">
        <Text size="LG" weight="BOLD" className="pb-2">
          Status básicos
        </Text>
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

      <View className="h-px w-full bg-slate-900 my-4" />

      <View className="w-full">
        <Text weight="BOLD" size="LG">
          Relação de dano
        </Text>
        <View className="pt-2">
          <Text>Forças:</Text>
          <View className="pt-1">
            <View className="w-full flex-row">
              {pokemon.damage_relation.double_damage_to.map((type) => {
                return <SymbolTypeCard key={type} type={type} />;
              })}
            </View>
          </View>
        </View>
        <View className="pt-2">
          <Text>Fraquezas:</Text>
          <View className="pt-1">
            <View className="w-full flex-row">
              {pokemon.damage_relation.double_damage_from.map((type) => {
                return <SymbolTypeCard key={type} type={type} />;
              })}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StatsCard;
