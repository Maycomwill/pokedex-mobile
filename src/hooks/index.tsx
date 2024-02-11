import { ReactNode } from "react";
import { PokedexContextProvider } from "../context/Pokedex";
import { AbilityContextProvider } from "../context/Abilities";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <PokedexContextProvider>
      <AbilityContextProvider>{children}</AbilityContextProvider>
    </PokedexContextProvider>
  );
}
