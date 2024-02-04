import { View, FlatList } from "react-native";
import React, { useCallback, useEffect } from "react";
import usePokedex from "../hooks/usePokedex";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/AppRoutes";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";
import { PokemonDataProps } from "../interfaces/PokemonProps";

type Props = NativeStackScreenProps<RootStackParamList, "Pokelist">;

const PokeList = ({ route }: Props) => {
  const { getPokedex, pokeList } = usePokedex();

  const regionName = route.params.region;
  const renderItem = useCallback(
    ({ item }: { item: PokemonDataProps }) => (
      <PokemonCard key={item.id} pokemon={item} />
    ),
    []
  );

  useEffect(() => {
    getPokedex(regionName);
  }, []);

  return (
    <View className="w-full bg-orange-500 items-center flex-1 justify-center">
      {pokeList && pokeList.length !== 0 ? (
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
  );
};

export default PokeList;
