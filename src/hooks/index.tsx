import React, { ReactNode } from "react";
import { PokedexContextProvider } from "../context/PokedexContext";
import { TypesContextProvider } from "../context/TypesContext";
import { GenerationContextProvider } from "../context/GenerationContext";
import { MovesContextProvider } from "../context/MovesContext";
import { AbilityContextProvider } from "../context/AbilitiesContext";
import { EvolutionContextProvider } from "../context/EvolutionContext";
import { FormContextProvider } from "../context/FormsContext";
import { FavoritesContextProvider } from "../context/FavoritesContext";

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <EvolutionContextProvider>
      <FormContextProvider>
        <PokedexContextProvider>
          <GenerationContextProvider>
            <TypesContextProvider>
              <AbilityContextProvider>
                <MovesContextProvider>
                  <FavoritesContextProvider>
                    {children}
                  </FavoritesContextProvider>
                </MovesContextProvider>
              </AbilityContextProvider>
            </TypesContextProvider>
          </GenerationContextProvider>
        </PokedexContextProvider>
      </FormContextProvider>
    </EvolutionContextProvider>
  );
}

export default AppProvider;
