import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { PokemonDataProps, typeProps } from "../interfaces/pokemon";
import axios from "axios";

export interface PokedexContextProps {
  getPokedex: (generation: string) => void;
  pokeList: PokemonDataProps[];
}

export const PokedexContext = createContext({} as PokedexContextProps);

export function PokedexContextProvider({ children }: { children: ReactNode }) {
  const [pokeList, setPokeList] = useState<PokemonDataProps[]>([]);
  let list: PokemonDataProps[] = [];

  async function getPokedex(generation: string) {
    setPokeList([]);
    list = [];
    function handleLimits(generation: string) {
      switch (generation) {
        case "kanto":
          return {
            limit: "151",
            offset: "0",
          };
        case "johto":
          return {
            limit: "100",
            offset: "151",
          };
        case "hoenn":
          return {
            limit: "135",
            offset: "251",
          };
        case "sinnoh":
          return {
            limit: "108",
            offset: "386",
          };
        case "unova":
          return {
            limit: "155",
            offset: "494",
          };
        case "kalos":
          return {
            limit: "72",
            offset: "649",
          };
        case "alola":
          return {
            limit: "88",
            offset: "721",
          };
        case "galar":
          return {
            limit: "96",
            offset: "809",
          };
        case "paldea":
          return {
            limit: "105",
            offset: "905",
          };
        default:
          return {
            limit: "151",
            offset: "0",
          };
      }
    }
    async function handleApiSearch(limit: string, offset: string) {
      const data = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
      return data.data;
    }
    const searchParams = handleLimits(generation);
    const { results } = await handleApiSearch(
      searchParams.limit,
      searchParams.offset
    );

    const payLoadPokemons = await Promise.all(
      results.map(async (pokemon: { name: string; url: string }) => {
        const data = await getPrimaryInfo(pokemon.url);

        const { id, name, types, sprites } = data;
        return {
          name,
          id,
          types,
          sprites,
        };
      })
    );

    async function getPrimaryInfo(url: string): Promise<PokemonDataProps> {
      const data = await axios.get(url);

      const pokemonData = {
        name: data.data.name,
        id: data.data.id,
        types: data.data.types.map((type: any) => {
          return {name: type.type.name};
        }),
        sprites: {
          default: {
            default: data.data.sprites.front_default,
            shiny: data.data.sprites.front_shiny,
          },
          artwork: {
            default: data.data.sprites.other["official-artwork"].front_default,
            shiny: data.data.sprites.other["official-artwork"].front_shiny,
          },
          home: {
            default: data.data.sprites.other.home.front_default,
            shiny: data.data.sprites.other.home.front_shiny,
          },
        },
      };
      return pokemonData;
    }

    setPokeList(payLoadPokemons);
  }
  return (
    <PokedexContext.Provider value={{ getPokedex, pokeList }}>
      {children}
    </PokedexContext.Provider>
  );
}
