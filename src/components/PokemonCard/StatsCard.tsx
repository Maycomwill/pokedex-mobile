import { ScrollView, View } from "react-native";
import React from "react";
import Text from "../Text";
import { UniquePokemonData } from "../../interfaces/PokemonProps";
import StatsValues from "./StatsCardComponents/StatsValues";
import SymbolTypeCard from "../TypeCard/SymbolTypeCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/AppRoutes";

interface StatsCardProps {
  pokemon: UniquePokemonData;
}

type RouteProps = NativeStackNavigationProp<RootStackParamList, "Pokemon">;

const StatsCard = ({ pokemon }: StatsCardProps) => {
  const navigation = useNavigation<RouteProps>();
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingEnd: 16 }}
            className="pt-1"
          >
            <View className="w-full flex-row">
              {pokemon.damage_relation.double_damage_to.map((type) => {
                return (
                  <SymbolTypeCard
                    onPress={() =>
                      navigation.navigate("Type", {
                        type,
                      })
                    }
                    key={type}
                    type={type}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View className="pt-2">
          <Text>Fraquezas:</Text>
          <View className="pt-1">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingEnd: 16 }}
              className="w-full flex-row"
            >
              {pokemon.damage_relation.double_damage_from.map((type) => {
                return (
                  <SymbolTypeCard
                    onPress={() =>
                      navigation.navigate("Type", {
                        type,
                      })
                    }
                    key={type}
                    type={type}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StatsCard;
