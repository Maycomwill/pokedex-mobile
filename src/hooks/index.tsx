import { ReactNode } from "react";
import { PokedexContextProvider } from "../context/Pokedex";

export default function AppProvider({ children }: { children: ReactNode }) {
  return <PokedexContextProvider>{children}</PokedexContextProvider>;
}
