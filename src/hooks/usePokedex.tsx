import { useContext } from "react";
import { PokedexContext, PokedexContextDataProps } from "../context/PokedexContext";

export default function usePokedex(): PokedexContextDataProps {
  const context = useContext(PokedexContext);
  return context;
}
