import { FlatList, Image, SafeAreaView, ScrollView, View } from "react-native";
import React from "react";
import { UniquePokemonData } from "../../interfaces/pokemonInterfaces";
import Text from "../Text";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import useEvolution from "../../hooks/useEvolution";
import { useForms } from "../../hooks/useForms";
import handleWithRenderEvolutionChain from "../../utils/handleEvolutions";
import { ScreenHeight } from "../../utils/StatusBarHeight";
import { clsx } from "clsx";

interface AboutCardProps {
  pokemon: UniquePokemonData;
  shiny?: boolean;
}

const AboutCard = ({ pokemon, shiny = false }: AboutCardProps) => {
  const { firstEvolution, secondEvolution, thirdEvolution } = useEvolution();
  const { forms } = useForms();

  return (
    <ScrollView
      className="flex-1 px-4"
      contentContainerStyle={{ paddingBottom: 72 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full flex-row">
        <View className="w-[30%] items-start justify-start">
          <Text className="mb-4 text-zinc-500">Altura:</Text>
          <Text className="mb-4 text-zinc-500">Peso:</Text>
          <Text className="mb-4 text-zinc-500">Habilidades:</Text>
        </View>
        <View className="w-[70%] items-start justify-start pl-2">
          <Text className="mb-4" color="BLACK">
            {(pokemon.height * 0.1).toLocaleString("pt-BR", {
              style: "decimal",
              maximumFractionDigits: 3,
              minimumFractionDigits: 2,
            })}
            m
          </Text>
          <Text className="mb-4" color="BLACK">
            {(pokemon.weight * 0.1).toLocaleString("pt-BR", {
              style: "decimal",
              maximumFractionDigits: 3,
              minimumFractionDigits: 2,
            })}
            kg
          </Text>
          <Text className="mb-4" color="BLACK" transform="CAP">
            {pokemon.abilities
              .map((ability) => {
                return ability.ability.name;
              })
              .join(", ")}
          </Text>
        </View>
      </View>
      <View className="pt-2 flex-1">
        <Text weight="BOLD" size="LG">
          Gênero
        </Text>
        <View className="pt-4 flex-row">
          <View className="w-[70%] flex-row items-center">
            <View className="flex-row items-center">
              <MaterialIcons name="female" size={24} color={colors.pink[500]} />
              <Text>
                {pokemon.gender.female <= 0
                  ? "0"
                  : pokemon.gender.female >= 100
                  ? "100"
                  : pokemon.gender.female.toLocaleString("pt-BR", {
                      style: "decimal",
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 1,
                    })}
                %
              </Text>
            </View>
            <View className="flex-row items-center ml-4">
              <MaterialIcons name="male" size={24} color={colors.sky[500]} />
              <Text>
                {pokemon.gender.male <= 0
                  ? "0"
                  : pokemon.gender.male >= 100
                  ? "100"
                  : pokemon.gender.male.toLocaleString("pt-BR", {
                      style: "decimal",
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 1,
                    })}
                %
              </Text>
            </View>
          </View>
        </View>

        <SafeAreaView className="flex flex-1 items-start text-left justify-start pt-6 space-y-4">
          <Text weight="BOLD" size="LG">
            Evoluções
          </Text>
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

          {forms.length > 1 && (
            <View className="flex flex-1 items-start justify-start space-y-4">
              <Text weight="BOLD" size="LG">
                Variações
              </Text>
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
            </View>
          )}
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default AboutCard;
