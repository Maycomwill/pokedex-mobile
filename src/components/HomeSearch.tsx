import { KeyboardAvoidingView, SafeAreaView, View } from "react-native";
import React, { useState } from "react";
import Text from "../components/Text";
import { TextInput } from "../components/TextInput";
import Pokeball from "../assets/pokeball.svg";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/AppRoutes";

type RoutesProps = NativeStackNavigationProp<RootStackParamList, "Home">;
const HomeSearch = () => {
  const [search, setSearch] = useState("");
  const naviagation = useNavigation<RoutesProps>();

  function handleSubmit() {
    setSearch("");
    naviagation.navigate("Pokemon", {
      ref: search,
      type: "grass",
    });
  }

  console.log(search);

  return (
    <View className="flex-1 items-start justify-start w-full px-4">
      <View className=" flex-row items-center justify-start space-x-4 w-full">
        <Pokeball width={32} height={32} />
        <Text className="pl-4" color="WHITE" weight="BOLD" size="XL">
          Custom Pokedex
        </Text>
      </View>
      <View className="flex-1 items-start w-full justify-start pt-12">
        <View className="mb-2">
          <Text color="WHITE" size="4XL" weight="BOLD">
            Pesquise por seu pokemon favorito
          </Text>
        </View>
        {/* <TextInput.Root>
          <TextInput.Content
            value={search}
            onSubmitEditing={handleSubmit}
            onChangeText={(text) => setSearch(text)}
            placeholder="Ex: Pikachu"
          />
          <TextInput.Icon icon="search" />
        </TextInput.Root> */}
      </View>
    </View>
  );
};

export default HomeSearch;
