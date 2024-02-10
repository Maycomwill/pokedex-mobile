import { View } from "react-native";
import React from "react";
import { UniquePokemonData } from "../../interfaces/PokemonProps";
import Text from "../Text";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface AboutCardProps {
  pokemon: UniquePokemonData;
}

const AboutCard = ({ pokemon }: AboutCardProps) => {
  return (
    <View className="flex-1 px-4">
      <View className="w-full flex-row">
        <View className="w-[30%] items-start justify-start">
          <Text className="mb-4 text-zinc-500">Altura:</Text>
          <Text className="mb-4 text-zinc-500">Peso:</Text>
          <Text className="mb-4 text-zinc-500">Habilidades:</Text>
        </View>
        <View className="w-[70%] items-start justify-start pl-2">
          <Text className="mb-4" color="BLACK">
            {pokemon.height.toFixed(2).toString()}m
          </Text>
          <Text className="mb-4" color="BLACK">
            {pokemon.weight.toFixed(2).toString()}kg
          </Text>
          <Text className="mb-4" color="BLACK" transform="CAP">
            {pokemon.abilities.join(", ")}
          </Text>
        </View>
      </View>
      <View className="pt-2 flex-1">
        <Text weight="BOLD" size="LG">
          Reprodução
        </Text>
        <View className="pt-4 flex-row">
          <View className="w-[30%]">
            <Text>Gênero</Text>
          </View>
          <View className="w-[70%] flex-row items-center">
            <View className="flex-row items-center">
              <MaterialIcons name="female" size={24} color={colors.pink[500]} />
              <Text>{pokemon.gender.female.toString()}%</Text>
            </View>
            <View className="flex-row items-center ml-4">
              <MaterialIcons name="male" size={24} color={colors.sky[500]} />
              <Text>{pokemon.gender.male.toString()}%</Text>
            </View>
          </View>
        </View>
        <Text className="mt-12 text-zinc-600" size="SM">
          Em breve mais informações ...
        </Text>
      </View>
    </View>
  );
};

export default AboutCard;