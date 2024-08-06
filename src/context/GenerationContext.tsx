import { createContext, ReactNode, useState } from "react";
import { pokeapi } from "../lib/axios";
import { waitingPromises } from "../utils/awaitPromises";
import { storagePokemonInformation } from "../utils/storagePokemonInfo";
import { PokemonDataProps } from "../interfaces/PokemonProps";

export interface GenerationContextProps {
  getGenerationFromUserChoice: (generation: string) => void;
  pokemonData: PokemonDataProps[];
}

export const GenerationContext = createContext({} as GenerationContextProps);

export function GenerationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [pokemonData, setPokemonData] = useState<PokemonDataProps[]>([]);

  //Função que recebe do front-end a escolha inicial do usuário
  function getGenerationFromUserChoice(generation: string) {
    console.log("Geração selecionada pelo usuário:", generation);
    getPokedexList(generation);
  }

  //Função inicial utilizada para determinar os parâmetros da API definindo a geração de Pokemon que será buscada
  async function getPokedexList(generation: string | undefined) {
    setPokemonData([]);
    let limitURL = "0";
    let offsetURL = "0";

    switch (generation) {
      case "1":
        limitURL = "151";
        offsetURL = "0";
        break;

      case "2":
        limitURL = "100";
        offsetURL = "151";
        break;

      case "3":
        limitURL = "135";
        offsetURL = "251";
        break;

      case "4":
        limitURL = "108";
        offsetURL = "386";
        break;

      case "5":
        limitURL = "155";
        offsetURL = "494";
        break;

      case "6":
        limitURL = "72";
        offsetURL = "649";
        break;

      case "7":
        limitURL = "88";
        offsetURL = "721";
        break;

      case "8":
        limitURL = "96";
        offsetURL = "809";
        break;

      case "9":
        limitURL = "105";
        offsetURL = "905";
    }
    const { data } = await pokeapi.get(
      `pokemon?limit=${limitURL}&offset=${offsetURL}`
    );
    const result = data.results;

    waitingPromises(result).then((response) => {
      let newArray = response.sort((a, b) => {
        return a.id - b.id;
      });
      // console.log(newArray);
      newArray.map((pokemon) =>
        storagePokemonInformation(pokemon, setPokemonData)
      );
    });
  }
  return (
    <GenerationContext.Provider
      value={{ getGenerationFromUserChoice, pokemonData }}
    >
      {children}
    </GenerationContext.Provider>
  );
}
