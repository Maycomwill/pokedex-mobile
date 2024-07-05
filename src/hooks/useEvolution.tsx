import { useContext } from "react";
import {
  EvolutionContext,
  EvolutionContextProps,
} from "../context/EvolutionContext";

export default function useEvolution(): EvolutionContextProps {
  const context = useContext(EvolutionContext);
  return context;
}
