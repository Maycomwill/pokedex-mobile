import { ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import { UniquePokemonData } from "../../interfaces/pokemonInterfaces";
import Loading from "../Loading";
import { AbilityProps } from "../../interfaces/AbilityProps";
import AbilityDescriptionCard from "./AbilityCardComponents/AbilityDescriptionCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/AppRoutes";
import useAbility from "../../hooks/useAbility";

interface AbilitiesCardProps {
  pokemon: UniquePokemonData;
}

type RouteProps = NativeStackNavigationProp<RootStackParamList, "Pokemon">;

const AbilitiesCard = ({ pokemon }: AbilitiesCardProps) => {
  const navigation = useNavigation<RouteProps>();
  const abilities_names = pokemon.abilities.map((ability) => {
    return ability.ability.name;
  });
const { getPokemonAbilities, abilities } = useAbility();
  useEffect(() => {
    getPokemonAbilities(abilities_names);
  }, []);

  return (
    <>
      {abilities ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 mb-12 w-full flex flex-col"
        >
          {abilities.map((ability: AbilityProps) => {
            if (ability !== undefined) {
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
