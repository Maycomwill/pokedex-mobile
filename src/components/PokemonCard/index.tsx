import {
  View,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { PokemonDataProps } from "../../interfaces/PokemonProps";
import Text from "../Text";
import clsx from "clsx";
import Pokeball from "../../assets/pokeball.svg";
import Pattern from "../../assets/pattern.svg";

interface Data extends TouchableOpacityProps {
  pokemon: PokemonDataProps;
}

const PokemonCard = ({ pokemon, ...rest }: Data) => {
  return (
    <TouchableOpacity
      style={{ elevation: 6 }}
      activeOpacity={0.4}
      key={pokemon.id}
      className={clsx(
        "w-[45%] h-36 p-2 items-start px-4 relative justify-start rounded-lg overflow-hidden flex-col z-10 my-2",
        {
          "bg-backgroundCard-bug": pokemon.types[0].name === "bug",
          "bg-backgroundCard-dark": pokemon.types[0].name === "dark",
          "bg-backgroundCard-dragon": pokemon.types[0].name === "dragon",
          "bg-backgroundCard-electric": pokemon.types[0].name === "electric",
          "bg-backgroundCard-fairy": pokemon.types[0].name === "fairy",
          "bg-backgroundCard-fighting": pokemon.types[0].name === "fighting",
          "bg-backgroundCard-fire": pokemon.types[0].name === "fire",
          "bg-backgroundCard-flying": pokemon.types[0].name === "flying",
          "bg-backgroundCard-ghost": pokemon.types[0].name === "ghost",
          "bg-backgroundCard-grass": pokemon.types[0].name === "grass",
          "bg-backgroundCard-ground": pokemon.types[0].name === "ground",
          "bg-backgroundCard-ice": pokemon.types[0].name === "ice",
          "bg-backgroundCard-normal": pokemon.types[0].name === "normal",
          "bg-backgroundCard-poison": pokemon.types[0].name === "poison",
          "bg-backgroundCard-psychic": pokemon.types[0].name === "psychic",
          "bg-backgroundCard-rock": pokemon.types[0].name === "rock",
          "bg-backgroundCard-steel": pokemon.types[0].name === "steel",
          "bg-backgroundCard-water": pokemon.types[0].name === "water",
        }
      )}
      {...rest}
    >
      <View className="absolute -right-5 -bottom-2 items-center justify-center z-0 opacity-10 -rotate-45">
        <Pokeball width={102} height={102} />
      </View>
      <View className="absolute left-0 -top-2 items-center justify-center z-0 opacity-10 -rotate-90">
        <Pattern width={102} height={102} />
      </View>
      <View className="w-full items-end">
        <Text size="XS" weight="BOLD" className="opacity-50">
          #{pokemon.id.toString().padStart(3, "0")}
        </Text>
      </View>
      <View className="w-full flex-row h-full">
        <View className="w-full items-start z-10">
          <Text
            transform="CAP"
            color="WHITE"
            weight="BOLD"
            size="BASE"
            className="mb-2"
          >
            {pokemon.name.split("-").join(" ")}
          </Text>
          {pokemon.types.map((type, index) => (
            <View
              key={type.name}
              className={clsx("w-fit rounded-full space-y-2 mt-2 px-2", {
                "bg-boxType-bug": pokemon.types[index].name === "bug",
                "bg-boxType-dark": pokemon.types[index].name === "dark",
                "bg-boxType-dragon": pokemon.types[index].name === "dragon",
                "bg-boxType-electric": pokemon.types[index].name === "electric",
                "bg-boxType-fairy": pokemon.types[index].name === "fairy",
                "bg-boxType-fighting": pokemon.types[index].name === "fighting",
                "bg-boxType-fire": pokemon.types[index].name === "fire",
                "bg-boxType-flying": pokemon.types[index].name === "flying",
                "bg-boxType-ghost": pokemon.types[index].name === "ghost",
                "bg-boxType-grass": pokemon.types[index].name === "grass",
                "bg-boxType-ground": pokemon.types[index].name === "ground",
                "bg-boxType-ice": pokemon.types[index].name === "ice",
                "bg-boxType-normal": pokemon.types[index].name === "normal",
                "bg-boxType-poison": pokemon.types[index].name === "poison",
                "bg-boxType-psychic": pokemon.types[index].name === "psychic",
                "bg-boxType-rock": pokemon.types[index].name === "rock",
                "bg-boxType-steel": pokemon.types[index].name === "steel",
                "bg-boxType-water": pokemon.types[index].name === "water",
              })}
            >
              <Text color="WHITE" transform="CAP" size="XS">
                {type.name}
              </Text>
            </View>
          ))}
        </View>
        <View className="absolute -right-4 -top-0 bottom-0 items-center justify-center z-0">
          <Image
            source={{ uri: pokemon.sprites.artwork.default }}
            width={86}
            height={86}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;
