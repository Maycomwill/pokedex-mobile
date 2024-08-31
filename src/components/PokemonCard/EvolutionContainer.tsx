import { View, ScrollView } from "react-native";
import React, { useCallback } from "react";
import Text from "../Text";
import { UniquePokemonData } from "../../interfaces/pokemonInterfaces";
import { Image } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Evolution } from "../../interfaces/evolutionInterface";
import useEvolution from "../../hooks/useEvolution";
import EvolutionCard from "./EvolutionCard";
import { ScreenHeight, ScreenWidth } from "../../utils/StatusBarHeight";

interface EvolutionContainerProps {
  pokemon: UniquePokemonData;
  shiny?: boolean;
}

const EvolutionContainer = ({
  pokemon,
  shiny = false,
}: EvolutionContainerProps) => {
  const { firstEvolution, secondEvolution, thirdEvolution } = useEvolution();
  const renderItem = useCallback(
    ({ item }: { item: Evolution }) => {
      return <EvolutionCard data={item} shiny={shiny} />;
    },
    [shiny]
  );

  function handleTrigger(
    evolution: Evolution,
    trigger: { name: string; sprite?: string }
  ) {
    switch (trigger.name) {
      case "level-up":
        // console.log("level-up evolutions: ", evolution.name);
        return (
          <View className="flex items-center justify-center flex-row">
            {evolution.details[0].min_level && (
              <View className="items-center">
                <Feather name="chevron-up" size={18} color="#141292" />
                <Text size="XS">
                  {evolution.details[0].min_level.toString()}
                </Text>
                {evolution.details[0].time_of_day === "day" && (
                  <Ionicons name="sunny" size={16} color={"#ffdc17"} />
                )}
                {evolution.details[0].time_of_day === "night" && (
                  <Ionicons name="moon" size={16} color={"#1b1b1b"} />
                )}
              </View>
            )}
            {evolution.details[0].min_beauty && (
              <Ionicons name="sparkles" size={16} color={"#ffdc17"} />
            )}
            {evolution.details[0].min_affection && (
              <>
                <Ionicons name="heart" size={16} color={"#ff1f17"} />
                <Text className="ml-1">
                  {evolution.details[0].min_affection.toString()}
                </Text>
                {evolution.details[0].time_of_day === "day" && (
                  <Ionicons name="sunny" size={16} color={"#ffdc17"} />
                )}
                {evolution.details[0].time_of_day === "night" && (
                  <Ionicons name="moon" size={16} color={"#1b1b1b"} />
                )}
              </>
            )}
            {evolution.details[0].min_happiness && (
              <View className="justify-center flex-row items-center">
                <Ionicons name="happy-outline" size={16} color={"#1b1b1b"} />
                <Text className="mx-1">
                  {evolution.details[0].min_happiness.toString()}
                </Text>
                {evolution.details[0].time_of_day === "day" && (
                  <Ionicons name="sunny" size={16} color={"#ffdc17"} />
                )}
                {evolution.details[0].time_of_day === "night" && (
                  <Ionicons name="moon" size={16} color={"#1b1b1b"} />
                )}
              </View>
            )}
          </View>
        );
      case "trade":
        return (
          <View className="flex rotate-90 items-center justify-center flex-row">
            <AntDesign name="swap" size={18} color="#141292" />
          </View>
        );
      case "use-item":
        if (evolution.name === "glaceon" || evolution.name === "leafeon") {
          return (
            <View>
              {trigger.sprite && (
                <Image
                  alt={evolution.details[3].item.name.split("-").join(" ")}
                  source={{ uri: trigger.sprite }}
                  width={48}
                  height={48}
                />
              )}
            </View>
          );
        }
        return (
          <View className="flex items-center justify-center flex-row">
            {trigger.sprite && (
              <Image
                alt={evolution.details[0].item.name.split("-").join(" ")}
                source={{ uri: trigger.sprite }}
                width={48}
                height={48}
              />
            )}
          </View>
        );
      default:
        return null;
    }
  }

  function handleWithRenderEvolutionChain(evolution: Evolution[]) {
    return evolution.map((e, i) => {
      return (
        <View
          className="flex flex-1 flex-row items-center justify-center space-x-4"
          key={e.name}
        >
          {evolution[0].details[0] !== undefined && (
            <View className="flex items-center justify-center flex-col space-y-2">
              {handleTrigger(evolution[i], e.trigger)}
              <Feather name="chevrons-right" size={24} color="black" />
            </View>
          )}
          <View className="flex flex-col items-center justify-center">
            <Image
              width={240}
              height={240}
              key={e.name}
              source={{
                uri: `${shiny ? e.sprites.shiny : e.sprites.default}`,
              }}
            />
            <Text className="capitalize">{e.name}</Text>
          </View>
        </View>
      );
    });
  }

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingStart: ScreenWidth * 0.12,
        paddingEnd: ScreenWidth * 0.12,
        marginTop: -48,
      }}
      horizontal
    >
      {firstEvolution && handleWithRenderEvolutionChain(firstEvolution)}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: ScreenHeight * 0.08,
          paddingTop: ScreenHeight * 0.08,
        }}
        showsVerticalScrollIndicator={false}
      >
        {secondEvolution && handleWithRenderEvolutionChain(secondEvolution)}
      </ScrollView>
      {thirdEvolution && handleWithRenderEvolutionChain(thirdEvolution)}
    </ScrollView>
  );
};

export default EvolutionContainer;
