import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import React from "react";
import {
  AbilityPokemonProp,
  AbilityProps,
} from "../../../interfaces/AbilityProps";
import Text from "../../Text";

interface AbilityDescriptionCardProps extends TouchableOpacityProps {
  ability: AbilityProps;
  pokemonInfo: AbilityPokemonProp | undefined;
}

const AbilityDescriptionCard = ({
  ability,
  pokemonInfo,
  ...rest
}: AbilityDescriptionCardProps) => {
  function handleWithStringSize(text: string) {
    if (text.length >= 150) {
      const newText = text.split(".");
      return newText.slice(0, 2).join(".").concat("...");
    } else {
      return text;
    }
  }
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      className="flex-col items-end justify-center w-full mb-4 bg-zinc-100 py-2 px-4 rounded-lg "
      {...rest}
    >
      <View className="flex-row w-full items-start justify-center py-1">
        <View className="w-1/4">
          <Text>Nome:</Text>
        </View>
        <View className="w-3/4 pl-1">
          <Text weight="BOLD" transform="CAP" size="XL">
            {ability.name.split("-").join(" ")}
          </Text>
        </View>
      </View>
      <View className="flex-row w-full items-start justify-center py-1">
        <View className="w-1/4">
          <Text>Descrição:</Text>
        </View>
        <View className="w-3/4 pl-1">
          <Text align="JUSTIFY">
            {handleWithStringSize(
              ability.flavor.flavor_text
                .split("-")
                .join(" ")
                .split("\n")
                .join(" ")
            )}
          </Text>
        </View>
      </View>
      <View className="flex-row w-full items-start justify-center py-1">
        <View className="w-1/4">
          <Text>Efeito:</Text>
        </View>
        <View className="w-3/4 pl-1">
          <Text align="JUSTIFY">
            {handleWithStringSize(
              ability.effect.short_effect.split("\n").join(" ")
            )}
          </Text>
        </View>
      </View>
      {pokemonInfo ? (
        <View className="flex-row w-full items-start justify-center py-1">
          <View className="w-1/4">
            <Text>Secreta:</Text>
          </View>
          <View className="w-3/4 pl-1">
            <Text align="JUSTIFY">{pokemonInfo.is_hidden ? "Sim" : "Não"}</Text>
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default AbilityDescriptionCard;
