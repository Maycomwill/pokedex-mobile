import { useContext } from "react";
import { AbilityContext } from "../context/Abilities";

export function useAbility() {
  const context = useContext(AbilityContext);
  return context;
}
