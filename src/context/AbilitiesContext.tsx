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
import { processPokemonData } from "../utils/processPokemonData";

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

    let response = data.pokemon.map((pokemon: any) => {
      return pokemon.pokemon;
    });

    const pokemon_list = await waitingPromises(response);

    const processedData = pokemon_list
      .sort((a, b) => a.id - b.id)
      .map((pokemon) => processPokemonData(pokemon));
    setCommonAbilityPokemon(processedData);

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
