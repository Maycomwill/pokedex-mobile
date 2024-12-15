import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";
import { useCallback, useState } from "react";
import Text from "../components/Text";
import { useFavorites } from "../hooks/useFavorites";

import { PokemonDataProps } from "../interfaces/PokemonProps";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/AppRoutes";
import PokemonCard from "../components/PokemonCard";
import { Feather } from "@expo/vector-icons";
import BottomSheet from "../components/BottomSheet";

type RoutesProps = NativeStackNavigationProp<RootStackParamList, "Pokelist">;

const Favorites = () => {
  const { favorites } = useFavorites();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSheet = () => {
    setIsOpen((prev) => !prev);
  };

  const navigation = useNavigation<RoutesProps>();
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
    [favorites]
  );
  return (
    <SafeAreaView className="flex-1 relative items-center justify-start bg-red-500">
      {favorites.length === 0 && (
        <View className="text-center items-center space-y-4 px-4">
          <View>
            <Text align="CENTER" size="LG" color="WHITE">
              Você ainda não possuí nenhum pokémon favorito!
            </Text>
          </View>
          <View>
            <Text align="CENTER" size="LG" color="WHITE">
              Você pode favoritar um pokémon clicando no coração no canto
              superior direito na tela de detalhes do pokémon
            </Text>
          </View>
          <View>
            <Text align="CENTER" size="LG" color="WHITE">
              Você pode armazenar até 25 pokémon favoritos
            </Text>
          </View>
        </View>
      )}
      {favorites.length !== 0 && (
        <View className="items-center space-y-2">
          <Text color="WHITE">Aqui estão seus pokémon favoritos!</Text>
          <FlatList
            className="w-screen px-4"
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "center",
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
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
          />
          <View className="flex-1 justify-end items-center pb-8">
            <TouchableOpacity onPress={toggleSheet}>
              <Feather name="trash-2" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {isOpen && <BottomSheet onClose={toggleSheet} />}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Favorites;
