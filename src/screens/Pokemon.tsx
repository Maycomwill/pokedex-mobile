import {
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
import Pattern from "../assets/pattern.svg";
import AboutCard from "../components/PokemonCard/AboutCard";
import StatsCard from "../components/PokemonCard/StatsCard";
import EvolutionCard from "../components/PokemonCard/EvolutionCard";
import AbilitiesCard from "../components/PokemonCard/AbilitiesCard";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import colors from "tailwindcss/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Pokemon">;

const Pokemon = ({ route }: Props) => {
  const [shiny, setShiny] = useState(false);
  function handleWithTypeColor(type: string) {
    if (type in typesObjColors && type === typesObjColors[type])
      console.log("cor", typesObjColors[type]);
    const color = shade(0.1, typesObjColors[type]);
    return color;
  }
  const { getUniquePokemon, pokemon } = usePokedex();
  useEffect(() => {
    getUniquePokemon(route.params.ref);
  }, []);

  const [headerOption, setHeaderOption] = useState<
    "STATS" | "ABOUT" | "EVOLUTION" | "MOVES"
  >("ABOUT");

  return (
    <View
      style={{
        backgroundColor: `${
          pokemon ? handleWithTypeColor(pokemon.types[0].name) : null
        }`,
      }}
      className={clsx(
        "w-full flex-1 items-center justify-start pt-2 relative pb-12",
        {}
      )}
    >
      <Header leftIcon />
      {pokemon ? (
        <View className="w-full h-full">
          <View className="flex-row px-4 h-[40%] w-full justify-between items-start z-20">
            <View className="w-3/4 flex-col">
              <View className="w-full">
                <Text color="WHITE" size="4XL" weight="BOLD" transform="CAP">
                  {pokemon.name.split("-").join(" ")}
                </Text>
              </View>
              <View className="flex-row w-full space-x-2">
                {pokemon.types.map((type) => {
                  return (
                    <View
                      key={type.name}
                      className={clsx(
                        "w-1/3 items-center rounded-full space-y-2 mt-2 py-2 ",
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
            <View className="w-1/4">
              <View className="w-full items-end justify-center flex-col space-y-4">
                <View>
                  <Text weight="BOLD" color="WHITE" size="LG">
                    #{pokemon.id.toString().padStart(3, "0")}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() => setShiny(!shiny)}
                  className={clsx(" text-zinc-100 p-2 rounded-full", {
                    "bg-backgroundCard-bug": pokemon.types[0].name === "bug",
                    "bg-backgroundCard-dark": pokemon.types[0].name === "dark",
                    "bg-backgroundCard-dragon":
                      pokemon.types[0].name === "dragon",
                    "bg-backgroundCard-electric":
                      pokemon.types[0].name === "electric",
                    "bg-backgroundCard-fairy":
                      pokemon.types[0].name === "fairy",
                    "bg-backgroundCard-fighting":
                      pokemon.types[0].name === "fighting",
                    "bg-backgroundCard-fire": pokemon.types[0].name === "fire",
                    "bg-backgroundCard-flying":
                      pokemon.types[0].name === "flying",
                    "bg-backgroundCard-ghost":
                      pokemon.types[0].name === "ghost",
                    "bg-backgroundCard-grass":
                      pokemon.types[0].name === "grass",
                    "bg-backgroundCard-ground":
                      pokemon.types[0].name === "ground",
                    "bg-backgroundCard-ice": pokemon.types[0].name === "ice",
                    "bg-backgroundCard-normal":
                      pokemon.types[0].name === "normal",
                    "bg-backgroundCard-poison":
                      pokemon.types[0].name === "poison",
                    "bg-backgroundCard-psychic":
                      pokemon.types[0].name === "psychic",
                    "bg-backgroundCard-rock": pokemon.types[0].name === "rock",
                    "bg-backgroundCard-steel":
                      pokemon.types[0].name === "steel",
                    "bg-backgroundCard-water":
                      pokemon.types[0].name === "water",
                  })}
                >
                  <Ionicons
                    name={shiny ? "sparkles" : "sparkles-outline"}
                    size={24}
                    color={colors.zinc[100]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="w-full absolute items-end justify-center bottom-96 right-0 z-0">
            <Pokeball width={300} height={300} opacity={0.2} rotation={45} />
          </View>
          <View className="w-full absolute items-end justify-center -top-10 -right-10 z-0">
            <Pokeball width={120} height={120} opacity={0.1} rotation={-70} />
          </View>
          <View className="w-full absolute items-start justify-center -top-10 left-0 z-0">
            <Pattern width={120} height={120} opacity={0.2} />
          </View>
          <View className="w-full absolute items-center justify-center top-20  z-10 pointer-events-none">
            {pokemon.sprites.artwork.default ? (
              <Image
                className="pointer-events-none"
                width={256}
                height={256}
                source={{
                  uri: `${
                    shiny
                      ? pokemon.sprites.artwork.shiny
                      : pokemon.sprites.artwork.default
                  }`,
                }}
              />
            ) : (
              <Image
                className="pointer-events-none"
                width={256}
                height={256}
                source={{
                  uri: `${
                    shiny
                      ? pokemon.sprites.home.shiny
                      : pokemon.sprites.home.default
                  }`,
                }}
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
