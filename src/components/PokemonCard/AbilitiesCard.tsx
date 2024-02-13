import { ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import { UniquePokemonData } from "../../interfaces/PokemonProps";
import { useAbility } from "../../hooks/useAbility";
import Loading from "../Loading";
import { AbilityProps } from "../../interfaces/AbilityProps";
import AbilityDescriptionCard from "./AbilityCardComponents/AbilityDescriptionCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/AppRoutes";

interface AbilitiesCardProps {
  pokemon: UniquePokemonData;
}

type RouteProps = NativeStackNavigationProp<RootStackParamList, "Pokemon">;

const AbilitiesCard = ({ pokemon }: AbilitiesCardProps) => {
  const navigation = useNavigation<RouteProps>();
  const abilities = pokemon.abilities.map((ability) => {
    return ability.ability.name;
  });
  const { getAbilities, abilityData } = useAbility();
  useEffect(() => {
    getAbilities(abilities);
  }, []);

  return (
    <>
      {abilityData ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 mb-12 w-full flex flex-col"
        >
          {abilityData.map((ability: AbilityProps) => {
            if (ability.effect.effect !== undefined) {
              return (
                <AbilityDescriptionCard
                  onPress={() =>
                    navigation.navigate("Ability", {
                      ability: ability.name,
                    })
                  }
                  ability={ability}
                  pokemonInfo={pokemon.abilities.find((newAbility) => {
                    return newAbility.ability.name === ability.name;
                  })}
                  key={ability.name}
                />
              );
            }
            <Loading />;
          })}
        </ScrollView>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AbilitiesCard;
