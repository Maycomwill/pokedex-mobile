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

type Props = NativeStackScreenProps<RootStackParamList, "Ability">;
type RouteProps = NativeStackNavigationProp<RootStackParamList, "Ability">;

const Ability = ({ route }: Props) => {
  const { getAbility, ability, pokeList } = usePokedex();
  const navigation = useNavigation<RouteProps>();

  const renderItem = useCallback(
    ({ item }: { item: PokemonDataProps }) => (
      <PokemonCard
        key={item.id}
        pokemon={item}
        onPress={() => {
          navigation.navigate("Pokemon", {
            name: item.name,
            type: item.types[0].name,
          });
        }}
      />
    ),
    []
  );

  useEffect(() => {
    getAbility(route.params.ability);
  }, []);

  return (
    <View className="w-full flex-1 bg-sky-500">
      {ability?.flavor.flavor_text !== "" ? (
        <View className="flex-1 w-full items-center justify-start px-4 pt-2">
          {ability && ability.flavor ? (
            <View className="w-full items-center justify-center ">
              <Text weight="BOLD" size="LG" align="JUSTIFY" color="WHITE">
                {ability.flavor.flavor_text.split("\n").join(" ")}
              </Text>
            </View>
          ) : (
            <Loading />
          )}
          <View className="w-full flex-1 pt-4">
            {pokeList.length !== 0 ? (
              <FlatList
                windowSize={21}
                maxToRenderPerBatch={80}
                initialNumToRender={20}
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
                data={pokeList}
                renderItem={renderItem}
                keyExtractor={(item) => `${item.id.toString()}-${item.name}`}
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
