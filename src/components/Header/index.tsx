import { SafeAreaView, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBarHeight } from "../../utils/StatusBarHeight";
import { AntDesign, Feather } from "@expo/vector-icons";
import Text from "../Text";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";
import { PokemonDataProps } from "../../interfaces/PokemonProps";
import { useFavorites } from "../../hooks/useFavorites";

interface HeaderProps {
  leftIcon?: boolean;
  title?: string;
  rightIcon?: {
    shown: boolean;
    pokemon: PokemonDataProps;
  };
}

const Header = ({ leftIcon, title, rightIcon }: HeaderProps) => {
  const naviagation = useNavigation();
  const { toggleFavorite, favorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    rightIcon.pokemon &&
    favorites.filter((favorite) => favorite.id === rightIcon.pokemon.id)
      .length > 0
      ? setIsFavorite(true)
      : setIsFavorite(false);
  }, [favorites, rightIcon.pokemon]);

  function handleFavorite() {
    toggleFavorite(rightIcon.pokemon);
  }

  // const paddingTop = {StatusBarHeight ? StatusBarHeight : 64}
  return (
    <SafeAreaView
      style={{
        paddingTop: StatusBarHeight,
        minHeight: StatusBarHeight,
      }}
      className="transparent w-full flex flex-row items-center justify-between px-4 mb-6"
    >
      {leftIcon && (
        <TouchableOpacity
          onPress={() => {
            naviagation.goBack();
          }}
          activeOpacity={0.7}
          className="min-h-1 items-start justify-center"
        >
          <Feather name="chevron-left" size={32} color={colors.zinc[100]} />
        </TouchableOpacity>
      )}

      {title && (
        <View className="w-1/2 items-center justify-center">
          <Text color="WHITE" size="LG" weight="BOLD">
            {title}
          </Text>
        </View>
      )}
      {rightIcon.shown && (
        <TouchableOpacity
          onPress={handleFavorite}
          activeOpacity={0.7}
          className="items-center h-8 justify-center"
        >
          <AntDesign
            name={isFavorite ? "heart" : "hearto"}
            size={32}
            color={colors.zinc[100]}
          />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Header;
