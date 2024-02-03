import { KeyboardAvoidingView, SafeAreaView, View } from "react-native";
import React from "react";
import Text from "../components/Text";
import { TextInput } from "../components/TextInput";
import Pokeball from "../assets/pokeball.svg";

const HomeSearch = () => {
  return (
    <KeyboardAvoidingView
    behavior="padding" className="flex-1 items-start justify-start w-full px-4">
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
        <TextInput.Root>
          <TextInput.Content placeholder="Ex: Pikachu" />
          <TextInput.Icon icon="search" />
        </TextInput.Root>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeSearch;
