import { View, FlatList } from "react-native";
import React, { useCallback, useEffect } from "react";
import { RootStackParamList } from "../routes/AppRoutes";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import usePokedex from "../hooks/usePokedex";
import { PokemonDataProps } from "../interfaces/PokemonProps";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";
import Text from "../components/Text";
import { typesObjColors } from "../utils/typesArray";
import { shade } from "polished";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Type">;
type RouteProps = NativeStackNavigationProp<RootStackParamList, "Type">;

const Type = ({ route }: Props) => {
  const type = route.params.type;
  const { getTypePokedex, typeList } = usePokedex();
  const navigation = useNavigation<RouteProps>();
  const renderItem = useCallback(
    ({ item }: { item: PokemonDataProps }) => (
      <PokemonCard
        onPress={() => {
          navigation.navigate("Pokemon", {
            ref: item.id,
            type: item.types[0].name,
          });
        }}
        key={item.id}
        pokemon={item}
      />
    ),
    []
  );

  function handleWithTypeColor(type: string) {
    if (type in typesObjColors && type === typesObjColors[type])
      console.log("cor", typesObjColors[type]);
    const color = shade(0.1, typesObjColors[type]);
    return color;
  }

  useEffect(() => {
    getTypePokedex(type);
  }, []);

  return (
    <View
      style={{ backgroundColor: handleWithTypeColor(type) }}
      className="w-full items-center justify-start flex-1 px-4 pt-2"
    >
      <Text color="WHITE" align="CENTER" className="w-full">
        Aqui estão os pokemon do que possuem o tipo {type}
      </Text>
      <View className="w-full flex-1">
        {typeList && typeList.length !== 0 ? (
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
            data={typeList}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id.toString()}-${item.name}`}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Loading type={route.params.type} />
        )}
      </View>
    </View>
  );
};

export default Type;
