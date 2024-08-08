import { FlatList, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import Text from "../components/Text";
import usePokedex from "../hooks/usePokedex";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/AppRoutes";
import Loading from "../components/Loading";
import { PokemonDataProps } from "../interfaces/PokemonProps";
import PokemonCard from "../components/PokemonCard";
import { useNavigation } from "@react-navigation/native";
import useAbility from "../hooks/useAbility";

type Props = NativeStackScreenProps<RootStackParamList, "Ability">;
type RouteProps = NativeStackNavigationProp<RootStackParamList, "Ability">;

const Ability = ({ route }: Props) => {
  const { getAbilityInfo, commonAbilityPokemon, abilityInfo } = useAbility();
  const navigation = useNavigation<RouteProps>();
  const abilityName = route.params.ability;
  const renderItem = useCallback(
    ({ item }: { item: PokemonDataProps }) => {
      const handlePress = () => {
        // console.log("item.id", item.id);
        navigation.navigate("Pokemon", {
          ref: item.id,
          type: item.types[0].name,
        });
      };
      return <PokemonCard pokemon={item} onPress={handlePress} />;
    },
    [navigation]
  );

  useEffect(() => {
    getAbilityInfo(abilityName);
  }, [abilityName]);

  return (
    <View className="w-full flex-1 bg-sky-500">
      {abilityInfo?.flavor.flavor_text !== "" ? (
        <View className="flex-1 w-full items-center justify-start px-4 pt-2">
          {abilityInfo && abilityInfo.flavor ? (
            <View className="w-full items-center justify-center">
              <Text weight="BOLD" size="LG" align="JUSTIFY" color="WHITE">
                {abilityInfo.flavor.flavor_text.split("\n").join(" ")}
              </Text>

              <Text className="pt-2" size="SM" align="JUSTIFY" color="WHITE">
                {abilityInfo.effect.effect}
              </Text>
            </View>
          ) : (
            <Loading />
          )}
          <View className="w-full flex-1 pt-4">
            {commonAbilityPokemon && commonAbilityPokemon.length !== 0 ? (
              <FlatList
                className="w-full space-y-2"
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  columnGap: 4,
                  rowGap: 2,
                }}
                contentContainerStyle={{
                  paddingBottom: 64,
                  gap: 12,
                  width: "100%",
                }}
                showsVerticalScrollIndicator={false}
                data={commonAbilityPokemon}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : (
              <Loading />
            )}
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Ability;
