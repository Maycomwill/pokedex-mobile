import { ReactNode, createContext, useState } from "react";
import { api } from "../lib/axios";
import {
  AbilityProps,
  effectEntrie,
  flavorEntrie,
} from "../interfaces/AbilityProps";

interface AbilityContextProps {
  getAbilities: (abilities: string[]) => void;
  abilityData: AbilityProps[];
}

export const AbilityContext = createContext({} as AbilityContextProps);

export function AbilityContextProvider({ children }: { children: ReactNode }) {
  const [abilityData, setAbilitiesPayload] = useState<AbilityProps[]>([]);
  async function getAbilities(abilities: string[]) {
    setAbilitiesPayload([]);
    const abilityPayload = await Promise.all(
      abilities.map(async (ability: string) => {
        const data = await getAbilityInfo(ability);

        return {
          name: data.name,
          flavor: data.flavor,
          effect: data.effect,
          pokemon: data.pokemon,
        };
      })
    );
    setAbilitiesPayload(abilityPayload);
  }

  async function getAbilityInfo(ability: string) {
    const data = await api.get(`ability/${ability}`);

    const effect: effectEntrie = data.data.effect_entries
      .filter(
        (effect: {
          effect: string;
          language: { name: string; url: string };
        }) => {
          if (effect.language.name === "en") {
            return effect;
          }
        }
      )
      .slice(0, 1)[0];
    const flavor: flavorEntrie = data.data.flavor_text_entries
      .filter(
        (flavor: {
          flavor_text: string;
          language: { name: string; url: string };
        }) => {
          if (flavor.language.name === "en") {
            return {
              flavor_text: flavor.flavor_text,
              language: flavor.language,
            };
          }
        }
      )
      .slice(0, 1)[0];

    const abilityData: AbilityProps = {
      name: data.data.name,
      effect,
      flavor,
      pokemon: data.data.pokemon,
    };

    return abilityData;
  }

  return (
    <AbilityContext.Provider value={{ getAbilities, abilityData }}>
      {children}
    </AbilityContext.Provider>
  );
}
