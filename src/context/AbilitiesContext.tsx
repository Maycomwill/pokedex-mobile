import { createContext, ReactNode, useState } from "react";
import { UniquePokemonData } from "../interfaces/pokemonInterfaces";
import { pokeapi } from "../lib/axios";
import {
  waitingAbilitiesPromises,
  waitingPromises,
} from "../utils/awaitPromises";
import { storagePokemonInformation } from "../utils/storagePokemonInfo";
import { PokemonDataProps } from "../interfaces/PokemonProps";
import {
  AbilityProps,
  flavorEntrie,
  effectEntrie,
} from "../interfaces/AbilityProps";

export interface AbilityContextProps {
  getPokemonAbilities: (abilities: string[]) => void;
  getAbilityInfo: (ability: string | undefined) => void;
  abilityInfo: AbilityProps | undefined;
  commonAbilityPokemon: PokemonDataProps[];
  abilities: AbilityProps[];
  isLoading: boolean;
}

export const AbilityContext = createContext({} as AbilityContextProps);

export function AbilityContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [abilities, setAbilities] = useState<AbilityProps[]>([]);
  const [abilityInfo, setAbilityInfo] = useState<AbilityProps>();
  const [commonAbilityPokemon, setCommonAbilityPokemon] = useState<
    PokemonDataProps[]
  >([]);
  let rawPokemonData: PokemonDataProps[] = [];

  async function getPokemonAbilities(abilities: string[] | undefined) {
    if (abilities === undefined) return;
    let data = await waitingAbilitiesPromises(abilities);

    setAbilities(data);
  }
  async function getAbilityInfo(ability: string | undefined) {
    if (ability === undefined) return;
    setIsLoading(true);
    setCommonAbilityPokemon([]);
    rawPokemonData = [];
    const { data } = await pokeapi.get(`ability/${ability}`);
    let response = data.pokemon.map((pokemon: any) => {
      return { name: pokemon.pokemon.name, url: pokemon.pokemon.url };
    });
    rawPokemonData = await waitingPromises(response);

    let description = data.effect_entries.find(
      (effect_element: {
        effect: string;
        language: { url: string; name: string };
      }) => {
        if (effect_element.language.name === "en") {
          return effect_element.effect;
        }

        return "";
      }
    );

    rawPokemonData
      .sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        return 1;
      })
      .map((pokemon) => {
        storagePokemonInformation(pokemon, setCommonAbilityPokemon);
      });

    setAbilityInfo({
      name: data.name,
      flavor: data.flavor_text_entries.find((flavor: flavorEntrie) => {
        if (flavor.language.name === "en") return flavor.flavor_text;
      }),
      effect: data.effect_entries.find((effect: effectEntrie) => {
        if (effect.language.name === "en") return effect.effect;
      }),
      pokemon: data.pokemon,
    });

    return setIsLoading(false);
  }

  return (
    <AbilityContext.Provider
      value={{
        getAbilityInfo,
        abilityInfo,
        getPokemonAbilities,
        abilities,
        commonAbilityPokemon,
        isLoading,
      }}
    >
      {children}
    </AbilityContext.Provider>
  );
}
