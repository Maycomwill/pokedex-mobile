import { View, Image, Pressable, TouchableOpacity } from "react-native";
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
  const { getPokemonData, uniquePokemonData } = usePokedex();
  useEffect(() => {
    getPokemonData(String(route.params.ref));
  }, []);

  const [headerOption, setHeaderOption] = useState<
    "STATS" | "ABOUT" | "EVOLUTION" | "MOVES"
  >("ABOUT");

  return (
    <View
      style={{
        backgroundColor: `${
          uniquePokemonData
            ? handleWithTypeColor(uniquePokemonData.types[0].type)
            : null
        }`,
      }}
      className={clsx(
        "w-full flex-1 items-center justify-start pt-2 relative pb-12",
        {}
      )}
    >
      <Header leftIcon />
      {uniquePokemonData ? (
        <View className="w-full h-full">
          <View className="flex-row px-4 h-[40%] w-full justify-between items-start z-20">
            <View className="w-3/4 flex-col">
              <View className="w-full">
                <Text color="WHITE" size="4XL" weight="BOLD" transform="CAP">
                  {uniquePokemonData.name.split("-").join(" ")}
                </Text>
              </View>
              <View className="flex-row w-full space-x-2">
                {uniquePokemonData.types.map((type) => {
                  return (
                    <View
                      key={type.type}
                      className={clsx(
                        "w-1/3 items-center rounded-full space-y-2 mt-2 py-2 ",
                        {
                          "bg-backgroundCard-bug": type.type === "bug",
                          "bg-backgroundCard-dark": type.type === "dark",
                          "bg-backgroundCard-dragon": type.type === "dragon",
                          "bg-backgroundCard-electric":
                            type.type === "electric",
                          "bg-backgroundCard-fairy": type.type === "fairy",
                          "bg-backgroundCard-fighting":
                            type.type === "fighting",
                          "bg-backgroundCard-fire": type.type === "fire",
                          "bg-backgroundCard-flying": type.type === "flying",
                          "bg-backgroundCard-ghost": type.type === "ghost",
                          "bg-backgroundCard-grass": type.type === "grass",
                          "bg-backgroundCard-ground": type.type === "ground",
                          "bg-backgroundCard-ice": type.type === "ice",
                          "bg-backgroundCard-normal": type.type === "normal",
                          "bg-backgroundCard-poison": type.type === "poison",
                          "bg-backgroundCard-psychic": type.type === "psychic",
                          "bg-backgroundCard-rock": type.type === "rock",
                          "bg-backgroundCard-steel": type.type === "steel",
                          "bg-backgroundCard-water": type.type === "water",
                        }
                      )}
                    >
                      <Text
                        color="WHITE"
                        transform="CAP"
                        size="XS"
                        weight="SEMIBOLD"
                      >
                        {type.type}
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
                    #{uniquePokemonData.id.toString().padStart(3, "0")}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() => setShiny(!shiny)}
                  className={clsx(" text-zinc-100 p-2 rounded-full", {
                    "bg-backgroundCard-bug":
                      uniquePokemonData.types[0].type === "bug",
                    "bg-backgroundCard-dark":
                      uniquePokemonData.types[0].type === "dark",
                    "bg-backgroundCard-dragon":
                      uniquePokemonData.types[0].type === "dragon",
                    "bg-backgroundCard-electric":
                      uniquePokemonData.types[0].type === "electric",
                    "bg-backgroundCard-fairy":
                      uniquePokemonData.types[0].type === "fairy",
                    "bg-backgroundCard-fighting":
                      uniquePokemonData.types[0].type === "fighting",
                    "bg-backgroundCard-fire":
                      uniquePokemonData.types[0].type === "fire",
                    "bg-backgroundCard-flying":
                      uniquePokemonData.types[0].type === "flying",
                    "bg-backgroundCard-ghost":
                      uniquePokemonData.types[0].type === "ghost",
                    "bg-backgroundCard-grass":
                      uniquePokemonData.types[0].type === "grass",
                    "bg-backgroundCard-ground":
                      uniquePokemonData.types[0].type === "ground",
                    "bg-backgroundCard-ice":
                      uniquePokemonData.types[0].type === "ice",
                    "bg-backgroundCard-normal":
                      uniquePokemonData.types[0].type === "normal",
                    "bg-backgroundCard-poison":
                      uniquePokemonData.types[0].type === "poison",
                    "bg-backgroundCard-psychic":
                      uniquePokemonData.types[0].type === "psychic",
                    "bg-backgroundCard-rock":
                      uniquePokemonData.types[0].type === "rock",
                    "bg-backgroundCard-steel":
                      uniquePokemonData.types[0].type === "steel",
                    "bg-backgroundCard-water":
                      uniquePokemonData.types[0].type === "water",
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
            {uniquePokemonData.sprites.artwork ? (
              <Image
                className="pointer-events-none"
                width={256}
                height={256}
                source={{
                  uri: `${
                    shiny
                      ? uniquePokemonData.sprites.artwork.shiny
                      : uniquePokemonData.sprites.artwork.default
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
                      ? uniquePokemonData.sprites.home.shiny
                      : uniquePokemonData.sprites.home.default
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
            {headerOption === "ABOUT" ? (
              <AboutCard pokemon={uniquePokemonData} />
            ) : null}
            {headerOption === "STATS" ? (
              <StatsCard pokemon={uniquePokemonData} />
            ) : null}
            {headerOption === "EVOLUTION" ? (
              <EvolutionCard shiny={shiny} pokemon={uniquePokemonData} />
            ) : 
            null}
            {headerOption === "MOVES" ? (
              <AbilitiesCard pokemon={uniquePokemonData} />
            ) :
            null}
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Pokemon;
