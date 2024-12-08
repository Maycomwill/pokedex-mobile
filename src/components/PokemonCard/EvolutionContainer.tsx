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
import handleTrigger from "../../utils/handleTrigger";
import handleWithRenderEvolutionChain from "../../utils/handleEvolutions";

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
          {firstEvolution &&
            handleWithRenderEvolutionChain(firstEvolution, shiny)}
        </View>
        {secondEvolution && secondEvolution.length > 1 ? (
          <ScrollView
            className="max-w-[33%]"
            contentContainerStyle={{
              paddingBottom: ScreenHeight * 0.075,
            }}
            showsVerticalScrollIndicator={false}
          >
            {secondEvolution &&
              handleWithRenderEvolutionChain(secondEvolution, shiny)}
          </ScrollView>
        ) : (
          <View className="max-w-[33%] ">
            {secondEvolution &&
              handleWithRenderEvolutionChain(secondEvolution, shiny)}
          </View>
        )}

        <View className="max-w-[25%]">
          {thirdEvolution &&
            handleWithRenderEvolutionChain(thirdEvolution, shiny)}
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
