import { View, ScrollView, SafeAreaView, FlatList } from "react-native";
import React, { useCallback } from "react";
import Text from "../Text";
import { UniquePokemonData } from "../../interfaces/pokemonInterfaces";
import { Image } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Evolution } from "../../interfaces/evolutionInterface";
import useEvolution from "../../hooks/useEvolution";
import { ScreenHeight } from "../../utils/StatusBarHeight";
import clsx from "clsx";
import { useForms } from "../../hooks/useForms";

interface EvolutionContainerProps {
  pokemon: UniquePokemonData;
  shiny?: boolean;
}

const EvolutionContainer = ({
  pokemon,
  shiny = false,
}: EvolutionContainerProps) => {
  const { firstEvolution, secondEvolution, thirdEvolution } = useEvolution();
  const { forms } = useForms();

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
                <Text className="text-xs mx-1">
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
                <Text className="mx-1 text-xs">
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
                <Text className="text-xs mx-1">
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
                  width={32}
                  height={32}
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
                width={32}
                height={32}
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
          className="flex flex-row items-center justify-center"
          key={e.name}
        >
          <View className="flex flex-row items-center justify-center space-y-2">
            {evolution[0].details[0] !== undefined && (
              <View className="flex items-center justify-center flex-col space-y-2 w-14">
                {handleTrigger(evolution[i], e.trigger)}
                <Feather name="chevrons-right" size={24} color="black" />
              </View>
            )}
            <View className="flex flex-col items-center justify-center">
              <Image
                width={70}
                height={70}
                key={e.name}
                source={{
                  uri: `${shiny ? e.sprites.shiny : e.sprites.default}`,
                }}
              />
              <Text
                className={clsx("capitalize", {
                  "pt-2": evolution[0].details[0] === undefined,
                })}
                size="XS"
              >
                {e.name}
              </Text>
            </View>
          </View>
        </View>
      );
    });
  }

  return (
    <SafeAreaView className="flex flex-1 items-center justify-start pt-6 space-y-4">
      <Text>Evoluções</Text>
      <View
        className={clsx(
          "flex flex-row w-full pb-4 max-h-[40%] justify-center space-x-2 ",
          {
            "flex-1 pb-0": secondEvolution && secondEvolution.length > 1,
          }
        )}
      >
        <View className="max-w-[25%]">
          {firstEvolution && handleWithRenderEvolutionChain(firstEvolution)}
        </View>
        {secondEvolution && secondEvolution.length > 1 ? (
          <ScrollView
            className="max-w-[33%]"
            contentContainerStyle={{
              paddingBottom: ScreenHeight * 0.075,
            }}
            showsVerticalScrollIndicator={false}
          >
            {secondEvolution && handleWithRenderEvolutionChain(secondEvolution)}
          </ScrollView>
        ) : (
          <View className="max-w-[33%] ">
            {secondEvolution && handleWithRenderEvolutionChain(secondEvolution)}
          </View>
        )}

        <View className="max-w-[25%]">
          {thirdEvolution && handleWithRenderEvolutionChain(thirdEvolution)}
        </View>
      </View>

      <View className="flex flex-1 items-center justify-start">
        {forms.length > 1 && (
          <>
            <Text>Variações</Text>
            <FlatList
              data={forms}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 6,
                paddingStart: 12,
                paddingEnd: 128,
                gap: 12,
              }}
              renderItem={({ item }) => {
                return (
                  <View
                    className="flex flex-row items-start justify-center gap-4"
                    key={item.name}
                  >
                    <View className="flex flex-col items-center justify-center space-y-2">
                      <Image
                        width={100}
                        height={100}
                        key={item.name}
                        source={{
                          uri: `${
                            shiny
                              ? item.sprites.artwork.shiny
                              : item.sprites.artwork.default
                          }`,
                        }}
                      />
                      <Text className="capitalize">
                        {item.name.split("-").join(" ")}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EvolutionContainer;
