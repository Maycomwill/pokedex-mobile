import { View, FlatList } from "react-native";
import React, { useCallback, useEffect } from "react";
import { RootStackParamList } from "../routes/AppRoutes";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import usePokedex from "../hooks/usePokedex";
import { PokemonDataProps } from "../interfaces/PokemonProps";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";
import Text from "../components/Text";
import { typesObjColors } from "../utils/typesArray";
import { shade } from "polished";
import { useNavigation } from "@react-navigation/native";
import useTypes from "../hooks/useTypes";
import { handleWithTypeColor } from "../utils/handleTypeColors";

type Props = NativeStackScreenProps<RootStackParamList, "Type">;
type RouteProps = NativeStackNavigationProp<RootStackParamList, "Type">;

const Type = ({ route }: Props) => {
  const type = route.params.type;
  console.log("type", type);
  const { getTypeData, commonTypesPokemon, isLoading } = useTypes();
  const navigation = useNavigation<RouteProps>();
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
    getTypeData(type);
  }, [type]);

  if (isLoading) {
    return (
      <View
        style={{ backgroundColor: handleWithTypeColor(type) }}
        className="w-full items-center justify-start flex-1 px-4 pt-2"
      >
        <Loading />
      </View>
    );
  }
  return (
    <View
      style={{ backgroundColor: handleWithTypeColor(type) }}
      className="w-full items-center justify-start flex-1 px-4 pt-2"
    >
      <Text color="WHITE" align="CENTER" className="w-full">
        Aqui estão os pokemon do que possuem o tipo {type}
      </Text>
      <View className="w-full flex-1">
        {commonTypesPokemon && commonTypesPokemon.length !== 0 ? (
          <FlatList
            className="w-full space-y-2"
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-evenly",
              alignItems: "center",
              columnGap: 4,
              rowGap: 2,
            }}
            data={commonTypesPokemon}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Loading type={type} />
        )}
      </View>
    </View>
  );
};

export default Type;
