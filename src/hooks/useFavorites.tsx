import { useContext } from "react";
import {
  FavoritesContextProps,
  FavoritesContext,
} from "../context/FavoritesContext";

export function useFavorites(): FavoritesContextProps {
  const context = useContext(FavoritesContext);
  return context;
}
