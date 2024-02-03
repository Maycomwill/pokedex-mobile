import { View, Text, FlatList } from "react-native";
import React, { useCallback, useEffect } from "react";
import usePokedex from "../hooks/usePokedex";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/AppRoutes";
import PokemonCard from "../components/PokemonCard";
import Loading from "./Loading";
import { PokemonDataProps } from "../interfaces/pokemon";

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

  if (pokeList.length === 0) {
    return <Loading />;
  } else {
    return (
      <View className="w-full">
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
          data={pokeList}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id.toString()}-${item.name}`}
        />
        {/* <FlatList
          data={pokeList}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        /> */}
      </View>
    );
  }
};

export default PokeList;
