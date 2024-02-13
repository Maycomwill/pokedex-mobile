import { View, FlatList, ScrollView } from "react-native";
import React, { useCallback } from "react";
import Text from "../Text";
import { UniquePokemonData } from "../../interfaces/PokemonProps";
import { Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { EvolutionProps } from "../../interfaces/EvolutionChainProps";
import colors from "tailwindcss/colors";

interface EvolutionCardProps {
  pokemon: UniquePokemonData;
  shiny?: boolean;
}

const EvolutionCard = ({ pokemon, shiny = false }: EvolutionCardProps) => {
  const renderItem = useCallback(
    ({ item }: { item: EvolutionProps }) => {
      return (
        <View className="items-center flex-1 justify-center">
          <Text weight="BOLD" size="BASE" transform="CAP">
            {item.name}
          </Text>
          <Text size="XS">#{item.id.toString().padStart(3, "0")}</Text>
          <Image
            width={200}
            height={200}
            source={{
              uri: shiny ? item.sprite.shiny : item.sprite.default,
            }}
          />
        </View>
      );
    },
    [shiny]
  );

  function handleWithRenderEvolutionChain(pokemon: EvolutionProps[]) {
    if (pokemon.length === 3) {
      return (
        <View className="w-full flex-1 flex-col items-start justify-center">
          <View className="flex-row items-center justify-between w-full">
            <View className="items-center justify-center">
              <Text transform="CAP" weight="BOLD" size="BASE">
                {pokemon[0].name}
              </Text>
              <Text size="XS">
                #{pokemon[0].id.toString().padStart(3, "0")}
              </Text>
              <Image
                width={124}
                height={124}
                source={{
                  uri: shiny
                    ? pokemon[0].sprite.shiny
                    : pokemon[0].sprite.default,
                }}
              />
            </View>

            <Feather name="chevron-right" size={32} color={colors.zinc[400]} />
            <View className="items-center justify-center">
              <Text transform="CAP" weight="BOLD" size="BASE">
                {pokemon[1].name}
              </Text>
              <Text size="XS">
                #{pokemon[1].id.toString().padStart(3, "0")}
              </Text>
              <Image
                width={124}
                height={124}
                source={{
                  uri: shiny
                    ? pokemon[1].sprite.shiny
                    : pokemon[1].sprite.default,
                }}
              />
            </View>
          </View>
          <View className="flex-row items-center justify-between w-full">
            <View className="items-center justify-center">
              <Text transform="CAP" weight="BOLD" size="BASE">
                {pokemon[1].name}
              </Text>
              <Text size="XS">
                #{pokemon[1].id.toString().padStart(3, "0")}
              </Text>
              <Image
                width={124}
                height={124}
                source={{
                  uri: shiny
                    ? pokemon[1].sprite.shiny
                    : pokemon[1].sprite.default,
                }}
              />
            </View>

            <Feather name="chevron-right" size={32} color={colors.zinc[400]} />
            <View className="items-center justify-center">
              <Text transform="CAP" weight="BOLD" size="BASE">
                {pokemon[2].name}
              </Text>
              <Text size="XS">
                #{pokemon[2].id.toString().padStart(3, "0")}
              </Text>
              <Image
                width={124}
                height={124}
                source={{
                  uri: shiny
                    ? pokemon[2].sprite.shiny
                    : pokemon[2].sprite.default,
                }}
              />
            </View>
          </View>
        </View>
      );
    } else if (pokemon.length === 2) {
      return (
        <View className="w-full flex-1 flex-col items-center justify-center">
          <View className="flex-row items-center justify-center w-full">
            <View className="items-center justify-center">
              <Text transform="CAP" weight="BOLD" size="BASE">
                {pokemon[0].name}
              </Text>
              <Text size="XS">
                #{pokemon[0].id.toString().padStart(3, "0")}
              </Text>
              <Image
                width={156}
                height={156}
                source={{
                  uri: shiny
                    ? pokemon[0].sprite.shiny
                    : pokemon[0].sprite.default,
                }}
              />
            </View>

            <Feather name="chevron-right" size={32} color={colors.zinc[400]} />
            <View className="items-center justify-center">
              <Text transform="CAP" weight="BOLD" size="BASE">
                {pokemon[1].name}
              </Text>
              <Text size="XS">
                #{pokemon[1].id.toString().padStart(3, "0")}
              </Text>
              <Image
                width={156}
                height={156}
                source={{
                  uri: shiny
                    ? pokemon[1].sprite.shiny
                    : pokemon[1].sprite.default,
                }}
              />
            </View>
          </View>
        </View>
      );
    } else {
      return renderItem({ item: pokemon[0] });
    }
  }

  return (
    <View className="flex-1 px-4 pb-4 items-center justify-start">
      {handleWithRenderEvolutionChain(pokemon.evolution_chain)}
    </View>
  );
};

export default EvolutionCard;
