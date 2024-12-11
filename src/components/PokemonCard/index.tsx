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

const PokemonCard: React.FC<Data> = React.memo(({ pokemon, ...rest }: Data) => {
  return (
    <TouchableOpacity
      style={{ elevation: 4 }}
      activeOpacity={0.4}
      key={pokemon.id}
      className={clsx(
        "w-[45%] h-36 p-2 items-start px-4 relative justify-start rounded-lg overflow-hidden flex-col z-10 my-2",
        {
          "bg-boxType-bug-default": pokemon.types[0].name === "bug",
          "bg-boxType-dark-default": pokemon.types[0].name === "dark",
          "bg-boxType-dragon-default": pokemon.types[0].name === "dragon",
          "bg-boxType-electric-default": pokemon.types[0].name === "electric",
          "bg-boxType-fairy-default": pokemon.types[0].name === "fairy",
          "bg-boxType-fighting-default": pokemon.types[0].name === "fighting",
          "bg-boxType-fire-default": pokemon.types[0].name === "fire",
          "bg-boxType-flying-default": pokemon.types[0].name === "flying",
          "bg-boxType-ghost-default": pokemon.types[0].name === "ghost",
          "bg-boxType-grass-default": pokemon.types[0].name === "grass",
          "bg-boxType-ground-default": pokemon.types[0].name === "ground",
          "bg-boxType-ice-default": pokemon.types[0].name === "ice",
          "bg-boxType-normal-default": pokemon.types[0].name === "normal",
          "bg-boxType-poison-default": pokemon.types[0].name === "poison",
          "bg-boxType-psychic-default": pokemon.types[0].name === "psychic",
          "bg-boxType-rock-default": pokemon.types[0].name === "rock",
          "bg-boxType-steel-default": pokemon.types[0].name === "steel",
          "bg-boxType-water-default": pokemon.types[0].name === "water",
          "bg-slate-950": pokemon.types[0].name === undefined,
        }
      )}
      {...rest}
    >
      <View className="absolute -right-5 -bottom-2 items-center justify-center z-0 opacity-20 -rotate-45">
        <Pokeball width={102} height={102} />
      </View>
      <View className="absolute left-0 -top-2 items-center justify-center z-0 opacity-20 -rotate-90">
        <Pattern width={102} height={102} />
      </View>
      <View className="w-full items-end">
        <Text size="XS" weight="BOLD" className="opacity-70">
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
                "bg-boxType-bug-dark": pokemon.types[index].name === "bug",
                "bg-boxType-dark-dark": pokemon.types[index].name === "dark",
                "bg-boxType-dragon-dark":
                  pokemon.types[index].name === "dragon",
                "bg-boxType-electric-dark":
                  pokemon.types[index].name === "electric",
                "bg-boxType-fairy-dark": pokemon.types[index].name === "fairy",
                "bg-boxType-fighting-dark":
                  pokemon.types[index].name === "fighting",
                "bg-boxType-fire-dark": pokemon.types[index].name === "fire",
                "bg-boxType-flying-dark":
                  pokemon.types[index].name === "flying",
                "bg-boxType-ghost-dark": pokemon.types[index].name === "ghost",
                "bg-boxType-grass-dark": pokemon.types[index].name === "grass",
                "bg-boxType-ground-dark":
                  pokemon.types[index].name === "ground",
                "bg-boxType-ice-dark": pokemon.types[index].name === "ice",
                "bg-boxType-normal-dark":
                  pokemon.types[index].name === "normal",
                "bg-boxType-poison-dark":
                  pokemon.types[index].name === "poison",
                "bg-boxType-psychic-dark":
                  pokemon.types[index].name === "psychic",
                "bg-boxType-rock-dark": pokemon.types[index].name === "rock",
                "bg-boxType-steel-dark": pokemon.types[index].name === "steel",
                "bg-boxType-water-dark": pokemon.types[index].name === "water",
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
            source={{
              uri: pokemon.sprites.artwork.default
                ? pokemon.sprites.artwork.default
                : pokemon.sprites.default.default,
            }}
            width={86}
            height={86}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default PokemonCard;
