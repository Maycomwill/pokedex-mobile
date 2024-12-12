import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PokemonDataProps } from "../interfaces/PokemonProps";

export interface FavoritesContextProps {
  favorites: PokemonDataProps[];
  toggleFavorite: (pokemon: PokemonDataProps) => void;
  clearFavorites: () => void;
}

export const FavoritesContext = createContext({} as FavoritesContextProps);

export function FavoritesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<PokemonDataProps[]>([]);
  useEffect(() => {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        setFavorites(JSON.parse(response));
      }
    });
  }, []);
  const toggleFavorite = async (pokemon: PokemonDataProps) => {
    if (favorites.length === 25) {
      return;
    }
    if (favorites.filter((favorite) => favorite.id === pokemon.id).length > 0) {
      console.log(pokemon.id);
      setFavorites(favorites.filter((favorite) => favorite.id !== pokemon.id));
      await AsyncStorage.setItem(
        "favorites",
        JSON.stringify(
          favorites.filter((favorite) => favorite.id !== pokemon.id)
        )
      );
      return;
    } else {
      setFavorites([...favorites, pokemon]);
      await AsyncStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, pokemon])
      );
      return;
    }
  };

  const clearFavorites = async () => {
    try {
      await AsyncStorage.removeItem("favorites");
      setFavorites([]);
    } catch (error) {
      return;
    }
  };
  return (
    <FavoritesContext.Provider
      value={{ toggleFavorite, clearFavorites, favorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
