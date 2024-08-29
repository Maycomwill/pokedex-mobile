import { createContext, ReactNode, useState } from "react";
import { pokeapi } from "../lib/axios";
import { waitingPromises } from "../utils/awaitPromises";
import { storagePokemonInformation } from "../utils/storagePokemonInfo";
import { PokemonDataProps } from "../interfaces/PokemonProps";
import { processPokemonData } from "../utils/processPokemonData";
import { AxiosError } from "axios";

export interface GenerationContextProps {
  getGenerationFromUserChoice: (generation: string) => void;
  pokemonData: PokemonDataProps[];
  isLoading: boolean;
}

export const GenerationContext = createContext({} as GenerationContextProps);

export function GenerationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [pokemonData, setPokemonData] = useState<PokemonDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  //Função que recebe do front-end a escolha inicial do usuário
  function getGenerationFromUserChoice(generation: string) {
    // console.log("Geração selecionada pelo usuário:", generation);
    getPokedexList(generation);
  }

  //Função inicial utilizada para determinar os parâmetros da API definindo a geração de Pokemon que será buscada
  async function getPokedexList(generation: string | undefined) {
    setIsLoading(true);
    setPokemonData([]);
    let limitURL = "0";
    let offsetURL = "0";

    switch (generation) {
      case "kanto":
        limitURL = "151";
        offsetURL = "0";
        break;

      case "johto":
        limitURL = "100";
        offsetURL = "151";
        break;

      case "hoenn":
        limitURL = "135";
        offsetURL = "251";
        break;

      case "sinnoh":
        limitURL = "108";
        offsetURL = "386";
        break;

      case "unova":
        limitURL = "155";
        offsetURL = "494";
        break;

      case "kalos":
        limitURL = "72";
        offsetURL = "649";
        break;

      case "alola":
        limitURL = "88";
        offsetURL = "721";
        break;

      case "galar":
        limitURL = "96";
        offsetURL = "809";
        break;

      case "paldea":
        limitURL = "105";
        offsetURL = "905";
    }
    try {
      const { data } = await pokeapi.get(
        `pokemon?limit=${limitURL}&offset=${offsetURL}`
      );

      const response = await waitingPromises(data.results);
      console.log("GenerationContext: ", response[0]);
      const processedData = response
        .sort((a, b) => a.id - b.id)
        .map((pokemon) => processPokemonData(pokemon));
      // console.log("GenerationCOntext: ", processedData[0]);
      setPokemonData(processedData);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setIsLoading(false);
        setPokemonData([]);
        console.error(error.message);
      }
    }
  }
  return (
    <GenerationContext.Provider
      value={{ getGenerationFromUserChoice, pokemonData, isLoading }}
    >
      {children}
    </GenerationContext.Provider>
  );
}
