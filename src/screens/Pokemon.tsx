import { View, Image, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Text from "../components/Text";
import { RootStackParamList } from "../routes/AppRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import clsx from "clsx";
import { typesObjColors } from "../utils/typesArray";
import { shade } from "polished";
import usePokedex from "../hooks/usePokedex";
import Loading from "../components/Loading";
import Pokeball from "../assets/pokeball.svg";
import AboutCard from "../components/PokemonCard/AboutCard";
import StatsCard from "../components/PokemonCard/StatsCard";
import EvolutionCard from "../components/PokemonCard/EvolutionCard";
import AbilitiesCard from "../components/PokemonCard/AbilitiesCard";

type Props = NativeStackScreenProps<RootStackParamList, "Pokemon">;

const Pokemon = ({ route }: Props) => {
  function handleWithTypeColor(type: string) {
    if (type in typesObjColors && type === typesObjColors[type])
      console.log("cor", typesObjColors[type]);
    const color = shade(0.1, typesObjColors[type]);
    return color;
  }
  const { getUniquePokemon, pokemon } = usePokedex();
  useEffect(() => {
    getUniquePokemon(route.params.name);
  }, []);

  const [headerOption, setHeaderOption] = useState<
    "STATS" | "ABOUT" | "EVOLUTION" | "MOVES"
  >("ABOUT");

  return (
    <View
      style={{ backgroundColor: handleWithTypeColor(route.params.type) }}
      className={clsx(
        "w-full max-w-full flex-1 items-center justify-start pt-2 relative",
        {}
      )}
    >
      {pokemon ? (
        <View className="w-full h-full">
          <View className="flex-row px-4 h-[40%] w-full justify-between items-start z-20">
            <View className="w-1/2">
              <Text color="WHITE" size="4XL" weight="BOLD" transform="CAP">
                {pokemon.name}
              </Text>
              <View className="flex-row w-1/2 space-x-2">
                {pokemon.types.map((type) => {
                  return (
                    <View
                      key={type.name}
                      className={clsx(
                        "w-full items-center rounded-full space-y-2 mt-2 py-2 ",
                        {
                          "bg-backgroundCard-bug": type.name === "bug",
                          "bg-backgroundCard-dark": type.name === "dark",
                          "bg-backgroundCard-dragon": type.name === "dragon",
                          "bg-backgroundCard-electric":
                            type.name === "electric",
                          "bg-backgroundCard-fairy": type.name === "fairy",
                          "bg-backgroundCard-fighting":
                            type.name === "fighting",
                          "bg-backgroundCard-fire": type.name === "fire",
                          "bg-backgroundCard-flying": type.name === "flying",
                          "bg-backgroundCard-ghost": type.name === "ghost",
                          "bg-backgroundCard-grass": type.name === "grass",
                          "bg-backgroundCard-ground": type.name === "ground",
                          "bg-backgroundCard-ice": type.name === "ice",
                          "bg-backgroundCard-normal": type.name === "normal",
                          "bg-backgroundCard-poison": type.name === "poison",
                          "bg-backgroundCard-psychic": type.name === "psychic",
                          "bg-backgroundCard-rock": type.name === "rock",
                          "bg-backgroundCard-steel": type.name === "steel",
                          "bg-backgroundCard-water": type.name === "water",
                        }
                      )}
                    >
                      <Text
                        color="WHITE"
                        transform="CAP"
                        size="XS"
                        weight="SEMIBOLD"
                      >
                        {type.name}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <View className="w-1/2 items-end justify-center">
              <Text weight="BOLD" color="WHITE" size="LG">
                #{pokemon.id.toString().padStart(3, "0")}
              </Text>
            </View>
          </View>
          <View className="w-full absolute items-end justify-center bottom-[332px] right-0 z-0">
            <Pokeball width={300} height={300} opacity={0.2} rotation={45} />
          </View>
          <View className="w-full absolute items-center justify-center bottom-[364px] z-10">
            {pokemon.sprites.artwork.default ? (
              <Image
                width={256}
                height={256}
                source={{ uri: pokemon.sprites.artwork.default }}
              />
            ) : (
              <Image
                width={256}
                height={256}
                source={{ uri: pokemon.sprites.home.default }}
              />
            )}
          </View>
          <View className="bg-white flex-1 rounded-t-3xl p-4 pt-12">
            <View className="z-10 w-full flex-row items-center justify-between px-2 mb-2">
              <Pressable
                className="w-container p-2"
                onPress={() => {
                  setHeaderOption("ABOUT");
                }}
              >
                <Text
                  className={clsx("border-b-2 border-transparent", {
                    "border-primary-500": headerOption === "ABOUT",
                  })}
                  size="SM"
                  weight={headerOption === "ABOUT" ? "BOLD" : "REGULAR"}
                >
                  Sobre
                </Text>
              </Pressable>
              <Pressable
                className="w-container p-2"
                onPress={() => {
                  setHeaderOption("STATS");
                }}
              >
                <Text
                  size="SM"
                  weight={headerOption === "STATS" ? "BOLD" : "REGULAR"}
                  className={clsx("border-b-2 border-transparent", {
                    "border-primary-500": headerOption === "STATS",
                  })}
                >
                  Dados
                </Text>
              </Pressable>
              <Pressable
                className="w-container p-2 "
                onPress={() => {
                  setHeaderOption("EVOLUTION");
                }}
              >
                <Text
                  size="SM"
                  weight={headerOption === "EVOLUTION" ? "BOLD" : "REGULAR"}
                  className={clsx("border-b-2 border-transparent", {
                    "border-primary-500": headerOption === "EVOLUTION",
                  })}
                >
                  Evoluções
                </Text>
              </Pressable>
              <Pressable
                className="w-container p-2"
                onPress={() => {
                  setHeaderOption("MOVES");
                }}
              >
                <Text
                  className={clsx("border-b-2 border-transparent", {
                    "border-primary-500": headerOption === "MOVES",
                  })}
                  size="SM"
                  weight={headerOption === "MOVES" ? "BOLD" : "REGULAR"}
                >
                  Habilidades
                </Text>
              </Pressable>
            </View>
            {headerOption === "ABOUT" ? <AboutCard pokemon={pokemon} /> : null}
            {headerOption === "STATS" ? <StatsCard pokemon={pokemon} /> : null}
            {headerOption === "EVOLUTION" ? (
              <EvolutionCard pokemon={pokemon} />
            ) : null}
            {headerOption === "MOVES" ? (
              <AbilitiesCard pokemon={pokemon} />
            ) : null}
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Pokemon;
