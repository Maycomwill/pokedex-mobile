import { createContext, ReactNode, useState } from "react";
import { MoveProps } from "../interfaces/movesInterface";
import { PokedexDataProps } from "../interfaces/pokemonInterfaces";
import { AxiosError } from "axios";
import { pokeapi } from "../lib/axios";
import { waitingPromises } from "../utils/awaitPromises";
import { storagePokemonInformation } from "../utils/storagePokemonInfo";
import { PokemonDataProps } from "../interfaces/PokemonProps";

export interface MovesContextProps {
  getMovesData: (move: string) => void;
  getAllMoves: () => void;
  move: MoveProps | undefined;
  moveCommonPokemon: PokemonDataProps[];
  isLoading: boolean;
}

export const MovesContext = createContext({} as MovesContextProps);

export function MovesContextProvider({ children }: { children: ReactNode }) {
  const [move, setMove] = useState<MoveProps>();
  const [movesList, setMovesList] = useState<MoveProps[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [moveCommonPokemon, setCommonPokemon] = useState<PokemonDataProps[]>(
    []
  );
  async function getMovesData(move: string) {
    try {
      setIsLoading(true);
      const { data } = await pokeapi.get(`/move/${move}`);

      let newPokemonArray: PokedexDataProps[] = [];
      data.learned_by_pokemon.map((pokemon: PokedexDataProps) => {
        newPokemonArray.push({
          name: pokemon.name,
          url: pokemon.url,
        });
      });

      waitingPromises(newPokemonArray).then((response) => {
        let newArray = response.sort((a, b) => {
          return a.id - b.id;
        });
        setCommonPokemon([]);
        newArray.map((pokemon: PokemonDataProps) =>
          storagePokemonInformation(pokemon, setCommonPokemon)
        );
      });

      let { flavor_text } = data.flavor_text_entries.find(
        (flavor: {
          flavor_text: string;
          language: { url: string; name: string };
        }) => {
          if (flavor.language.name === "en") {
            return flavor.flavor_text;
          }
          return "";
        }
      );
      // console.log(flavor_text);

      setMove({
        accuracy: data.accuracy,
        damage_class: data.damage_class,
        effect_chance: data.effect_chance,
        effect_entries: data.effect_entries[0].effect,
        flavor_text_entries: flavor_text,
        power: data.power,
        pp: data.pp,
        priority: data.priority,
        target: data.target,
        type: data.type,
        name: data.name,
      });

      return setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        location.replace("/");
        return setIsLoading(false);
      }
    }
  }

  async function getAllMoves() {
    setMovesList([]);
    setIsLoading(true);
    try {
    } catch (error) {
      if (error instanceof AxiosError) {
        setIsLoading(false);
        setMovesList([]);
        console.error(error.message);
      }
    }
  }

  return (
    <MovesContext.Provider
      value={{ getMovesData, getAllMoves, move, moveCommonPokemon, isLoading }}
    >
      {children}
    </MovesContext.Provider>
  );
}
