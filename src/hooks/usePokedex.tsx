import { useContext } from "react";
import { PokedexContext, PokedexContextProps } from "../context/Pokedex";

export default function usePokedex(): PokedexContextProps {
  const context = useContext(PokedexContext);
  return context;
}
