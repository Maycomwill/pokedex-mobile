import { useContext } from "react";
import {
  GenerationContext,
  GenerationContextProps,
} from "../context/GenerationContext";

export default function useGeneration(): GenerationContextProps {
  const context = useContext(GenerationContext);
  return context;
}
