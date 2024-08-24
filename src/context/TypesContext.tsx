import { createContext, ReactNode, useState } from "react";
import { PokedexDataProps, typeProps } from "../interfaces/pokemonInterfaces";
import { NamedAPIResource } from "../interfaces/apiInterfaces";
import { pokeapi } from "../lib/axios";
import { waitingPromises } from "../utils/awaitPromises";
import { storagePokemonInformation } from "../utils/storagePokemonInfo";
import { PokemonDataProps } from "../interfaces/PokemonProps";

export interface TypesContextProps {
  types: typeProps[] | undefined;
  commonTypesPokemon: PokemonDataProps[];
  moves: NamedAPIResource[];
  getTypeData: (type: string) => void;
}

export const TypesContext = createContext({} as TypesContextProps);

export function TypesContextProvider({ children }: { children: ReactNode }) {
  let rawPokemonData: PokemonDataProps[] = [];
  const [commonTypesPokemon, setCommonTypesPokemon] = useState<
    PokemonDataProps[]
  >([]);
  const [types, setTypes] = useState<typeProps[]>();
  const [moves, setMoves] = useState<NamedAPIResource[]>([]);

  //Esta função busca na api os dados de um tipo e armazena os dados dos pokemon que possuem o mesmo tipo
  async function getTypeData(type: string) {
    const { data } = await pokeapi.get(`/type/${type}`);
    const pokemonTypeCommon: { pokemon: PokedexDataProps; slot: number }[] =
      data.pokemon;
    let newPokemonTypeArray: PokedexDataProps[] = [];
    pokemonTypeCommon.map(
      (pokemon: { pokemon: PokedexDataProps; slot: number }) => {
        newPokemonTypeArray.push({
          name: pokemon.pokemon.name,
          url: pokemon.pokemon.url,
        });
      }
    );

    waitingPromises(newPokemonTypeArray).then((response) => {
      setCommonTypesPokemon([]);
      let newArray = response.sort((a, b) => {
        return a.id - b.id;
      });
      // console.log("TypesContext: ", newArray[0]);
      setCommonTypesPokemon(newArray);
    });

    setMoves(data.moves);
  }

  return (
    <TypesContext.Provider
      value={{ moves, commonTypesPokemon, types, getTypeData }}
    >
      {children}
    </TypesContext.Provider>
  );
}
