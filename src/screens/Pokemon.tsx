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
import Pokeball from "../assets/Pokeball";
import Pattern from "../assets/Pattern";
import AboutCard from "../components/PokemonCard/AboutCard";
import StatsCard from "../components/PokemonCard/StatsCard";
import EvolutionContainer from "../components/PokemonCard/EvolutionContainer";
import AbilitiesCard from "../components/PokemonCard/AbilitiesCard";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Pokemon">;

const Pokemon = ({ route }: Props) => {
  const navigation = useNavigation();
  const [shiny, setShiny] = useState(false);
  const [isHide, setIsHide] = useState(true);
  function handleWithTypeColor(type: string) {
    if (type in typesObjColors) {
      // console.log("cor", typesObjColors[type]);
      const color = shade(0.1, typesObjColors[type]);
      return color;
    }
  }
  const { getPokemonData, uniquePokemonData, isLoading } = usePokedex();
  useEffect(() => {
    getPokemonData(String(route.params.ref));
  }, []);

  const [headerOption, setHeaderOption] = useState<
    "STATS" | "ABOUT" | "EVOLUTION" | "MOVES"
  >("ABOUT");
  setTimeout(() => {
    setIsHide(false);
  }, 2000);
  // console.log("Pokemonpage: ", uniquePokemonData);
  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: `${
            uniquePokemonData
              ? handleWithTypeColor(uniquePokemonData.types[0].name)
              : null
          }`,
        }}
        className={clsx(
          "w-full flex-1 items-center justify-center pt-2 relative pb-12",
          {}
        )}
      >
        <Loading />
        {isHide ? null : (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex items-center justify-center"
          >
            <Ionicons name="chevron-back" size={48} color="black" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
  return (
    <View
      style={{
        backgroundColor: `${
          uniquePokemonData &&
          handleWithTypeColor(uniquePokemonData.types[0].name)
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
                    #{uniquePokemonData.id.toString().padStart(3, "0")}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() => setShiny(!shiny)}
                  className={clsx("text-zinc-100 p-2 rounded-full", {
                    "bg-backgroundCard-bug":
                      uniquePokemonData.types[0].name === "bug",
                    "bg-backgroundCard-dark":
                      uniquePokemonData.types[0].name === "dark",
                    "bg-backgroundCard-dragon":
                      uniquePokemonData.types[0].name === "dragon",
                    "bg-backgroundCard-electric":
                      uniquePokemonData.types[0].name === "electric",
                    "bg-backgroundCard-fairy":
                      uniquePokemonData.types[0].name === "fairy",
                    "bg-backgroundCard-fighting":
                      uniquePokemonData.types[0].name === "fighting",
                    "bg-backgroundCard-fire":
                      uniquePokemonData.types[0].name === "fire",
                    "bg-backgroundCard-flying":
                      uniquePokemonData.types[0].name === "flying",
                    "bg-backgroundCard-ghost":
                      uniquePokemonData.types[0].name === "ghost",
                    "bg-backgroundCard-grass":
                      uniquePokemonData.types[0].name === "grass",
                    "bg-backgroundCard-ground":
                      uniquePokemonData.types[0].name === "ground",
                    "bg-backgroundCard-ice":
                      uniquePokemonData.types[0].name === "ice",
                    "bg-backgroundCard-normal":
                      uniquePokemonData.types[0].name === "normal",
                    "bg-backgroundCard-poison":
                      uniquePokemonData.types[0].name === "poison",
                    "bg-backgroundCard-psychic":
                      uniquePokemonData.types[0].name === "psychic",
                    "bg-backgroundCard-rock":
                      uniquePokemonData.types[0].name === "rock",
                    "bg-backgroundCard-steel":
                      uniquePokemonData.types[0].name === "steel",
                    "bg-backgroundCard-water":
                      uniquePokemonData.types[0].name === "water",
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
          <View className="w-full absolute items-center justify-center top-20 z-50 pointer-events-none">
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
          <View className="relative z-40 bg-white flex-1 rounded-t-3xl p-4 pt-12">
            <View className="w-full absolute -bottom-40 left-0 z-0">
              <Pokeball
                color={"#000"}
                width={420}
                height={420}
                opacity={0.05}
                rotation={-45}
              />
            </View>
            <View className="w-full absolute items-center justify-center bottom-72 -right-40 z-0">
              <Pattern
                color={"#000"}
                width={120}
                height={120}
                opacity={0.05}
                // rotation={90}
              />
            </View>
            <View className=" w-full flex-row items-center justify-between px-2 mb-2">
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
                  weight="REGULAR"
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
                  weight="REGULAR"
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
                  weight="REGULAR"
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
                  weight="REGULAR"
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
              <EvolutionContainer shiny={shiny} pokemon={uniquePokemonData} />
            ) : null}
            {headerOption === "MOVES" ? (
              <AbilitiesCard pokemon={uniquePokemonData} />
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
