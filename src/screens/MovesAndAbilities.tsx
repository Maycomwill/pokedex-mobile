import { FlatList, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import usePokedex from "../hooks/usePokedex";
import Loading from "../components/Loading";
import Text from "../components/Text";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../routes/AppRoutes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const MovesAndAbilities = () => {
  type MovesScreenNavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "MovesAndAbilities"
  >;
  const { getMoves, movesList } = usePokedex();
  const navigation = useNavigation<MovesScreenNavigationProps>();

  useEffect(() => {
    getMoves();
  }, []);
  return (
    <View className="flex-1 px-4 items-start justify-start bg-sky-500 space-y-2">
      <Text color="WHITE" weight="BOLD">
        Aqui estão todos os golpes e habilidades dos Pokémon
      </Text>
      <View className="w-full flex-1 items-center justify-center">
        {movesList && movesList.length !== 0 ? (
          <FlatList
            data={movesList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Ability", {
                    ability: item.name,
                  })
                }
                activeOpacity={0.4}
                className="w-[45%] items-center justify-center bg-orange-500 rounded-full py-2"
              >
                <Text color="WHITE" size="BASE" transform="CAP">
                  {item.name.split("-").join(" ")}
                </Text>
              </TouchableOpacity>
            )}
            windowSize={21}
            maxToRenderPerBatch={80}
            initialNumToRender={20}
            className="w-full space-y-2"
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-evenly",
              alignItems: "center",
              columnGap: 2,
              rowGap: 2,
            }}
            contentContainerStyle={{
              paddingBottom: 64,
              gap: 12,
              width: "100%",
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item.name}`}
          />
        ) : (
          <Loading />
        )}
      </View>
    </View>
  );
};

export default MovesAndAbilities;
