import { useContext } from "react";
import {
  AbilityContext,
  AbilityContextProps,
} from "../context/AbilitiesContext";

export default function useAbility(): AbilityContextProps {
  const context = useContext(AbilityContext);
  return context;
}
