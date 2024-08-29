import { View, FlatList } from "react-native";
import React, { useCallback, useEffect } from "react";
import usePokedex from "../hooks/usePokedex";
import { RootStackParamList } from "../routes/AppRoutes";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";
import { PokemonDataProps } from "../interfaces/PokemonProps";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import useGeneration from "../hooks/useGeneration";

type RoutesProps = NativeStackNavigationProp<RootStackParamList, "Pokelist">;
type Props = NativeStackScreenProps<RootStackParamList, "Pokelist">;

const PokeList = ({ route }: Props) => {
  const navigation = useNavigation<RoutesProps>();
  const { getGenerationFromUserChoice, pokemonData, isLoading } =
    useGeneration();
  // console.log("Comprimento:", pokemonData.length);
  const regionName = route.params.region;
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
    getGenerationFromUserChoice(regionName);
  }, [regionName]);

  if (isLoading) {
    return (
      <View className="w-full bg-orange-500 items-center flex-1 justify-center">
        <Loading />
      </View>
    );
  }
  return (
    <View className="w-full bg-orange-500 items-center flex-1 justify-center">
      {pokemonData && pokemonData.length !== 0 ? (
        // (console.log(pokemonData[0]),
        // (
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
          data={pokemonData}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default PokeList;
