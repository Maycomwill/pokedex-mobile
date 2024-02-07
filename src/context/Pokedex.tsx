import { ReactNode, createContext, useState } from "react";
import { api } from "../lib/axios";
import {
  PokemonDataProps,
  UniquePokemonData,
  resultsType,
  statsProps,
} from "../interfaces/PokemonProps";
import axios from "axios";
import {
  AbilityProps,
  effectEntrie,
  flavorEntrie,
} from "../interfaces/AbilityProps";

export interface PokedexContextProps {
  getPokedex: (generation: string) => void;
  getTypePokedex: (type: string) => void;
  getMoves: () => void;
  getAbility: (ability: string) => void;
  getUniquePokemon: (pokemon: string) => void;
  pokeList: PokemonDataProps[];
  typeList: PokemonDataProps[];
  movesList: resultsType[];
  ability: AbilityProps | undefined;
  pokemon: UniquePokemonData | undefined;
}

export const PokedexContext = createContext({} as PokedexContextProps);

export function PokedexContextProvider({ children }: { children: ReactNode }) {
  const [pokeList, setPokeList] = useState<PokemonDataProps[]>([]);
  const [typeList, setTypeList] = useState<PokemonDataProps[]>([]);
  const [movesList, setMovesList] = useState<resultsType[]>([]);
  const [ability, setAbility] = useState<AbilityProps>();
  const [pokemon, setPokemon] = useState<UniquePokemonData | undefined>();

  async function getPokedex(generation: string) {
    setPokeList([]);

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
        name: data.data.name.split("-").join(" "),
        id: data.data.id,
        types: data.data.types.map((type: any) => {
          return { name: type.type.name };
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

  async function getTypePokedex(type: string) {
    setTypeList([]);

    async function handleApiSearch(type: string) {
      const data = await api.get(`type/${type}`);

      return data.data;
    }
    const { pokemon } = await handleApiSearch(type);

    type pokemonType = {
      pokemon: {
        name: string;
        url: string;
      };
      slot: number;
    };

    const payLoadPokemons = await Promise.all(
      pokemon.map(async (pokemon: pokemonType) => {
        const data = await getPrimaryInfo(pokemon.pokemon.url);

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
        name: data.data.name.split("-").join(" "),
        id: data.data.id,
        types: data.data.types.map((type: any) => {
          return { name: type.type.name };
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

    setTypeList(payLoadPokemons);
  }

  async function getMoves() {
    setMovesList([]);
    async function handleSerach() {
      const data = await api.get("ability?limit=1000&offset=0");
      return data.data;
    }

    const { results } = await handleSerach();

    setMovesList(results);
  }

  async function getAbility(ability: string) {
    //Reset states
    setPokeList([]);
    setAbility({
      effect: {
        effect: "",
        language: {
          name: "",
          url: "",
        },
        short_effect: "",
      },
      flavor: {
        flavor_text: "",
        language: {
          name: "",
          url: "",
        },
      },
      name: "",
      pokemon: [
        {
          name: "",
          url: "",
        },
      ],
    });

    async function handleApiResponse(ability: string) {
      const data = await api.get(`ability/${ability}`);
      return data.data;
    }

    const { effect_entries, flavor_text_entries, name, pokemon } =
      await handleApiResponse(ability);

    function handleWithData(
      effect_entries: effectEntrie[],
      flavor_text_entries: flavorEntrie[]
    ) {
      const effect: effectEntrie[] = effect_entries
        .filter((effect: effectEntrie) => {
          if (effect.language.name === "en") {
            return effect;
          }
        })
        .slice(0, 1);
      // console.log(effect[0]);

      const flavor: flavorEntrie[] | void = flavor_text_entries
        .filter((flavor) => {
          if (flavor.language.name === "en") {
            return flavor;
          }
        })
        .slice(0, 1);
      // console.log(flavor[0]);

      return {
        flavor: flavor[0],
        effect: effect[0],
      };
    }
    const data = handleWithData(effect_entries, flavor_text_entries);
    // console.log(data)

    setAbility({
      effect: data.effect,
      flavor: data.flavor,
      name,
      pokemon,
    });

    const arrayPokemon = pokemon.map(
      (pokemon: {
        is_hidden: boolean;
        pokemon: { name: string; url: string };
        slot: number;
      }) => {
        return pokemon;
      }
    );

    const payLoadPokemons = await Promise.all(
      arrayPokemon.map(
        async (pokemon: {
          is_hidden: boolean;
          pokemon: { name: string; url: string };
          slot: number;
        }) => {
          const data = await getPrimaryInfo(pokemon.pokemon.url);

          const { id, name, types, sprites } = data;
          return {
            name,
            id,
            types,
            sprites,
          };
        }
      )
    );

    async function getPrimaryInfo(url: string): Promise<PokemonDataProps> {
      const data = await axios.get(url);

      const pokemonData = {
        name: data.data.name.split("-").join(" "),
        id: data.data.id,
        types: data.data.types.map((type: any) => {
          return { name: type.type.name };
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

  async function getUniquePokemon(pokemon: string) {
    setPokemon(undefined);
    async function handleWithApi(pokemon: string) {
      const name = pokemon.split(" ");
      const initialData = await api.get(`pokemon/${name.join("-")}`);
      const extraData = await api.get(`pokemon-species/${name[0]}`);
      return {
        initial: initialData.data,
        extra: extraData.data,
      };
    }

    const data = await handleWithApi(pokemon);

    const pokemonData: UniquePokemonData = {
      height: data.initial.height * 0.1,
      weight: data.initial.weight * 0.1,
      id: data.initial.id,
      name: data.initial.name,
      sprites: {
        default: {
          default: data.initial.sprites.front_default,
          shiny: data.initial.sprites.front_shiny,
        },
        artwork: {
          default: data.initial.sprites.other["official-artwork"].front_default,
          shiny: data.initial.sprites.other["official-artwork"].front_shiny,
        },
        home: {
          default: data.initial.sprites.other.home.front_default,
          shiny: data.initial.sprites.other.home.front_shiny,
        },
      },
      gender: {
        female: (data.extra.gender_rate * 100) / 8,
        male: 100 - (data.extra.gender_rate * 100) / 8,
      },
      types: data.initial.types.map((type: any) => {
        return {
          name: type.type.name,
        };
      }),
      abilities: data.initial.abilities.map((ability: any) => {
        return ability.ability.name;
      }),
      stats: {
        hp: data.initial.stats.find((stat: statsProps) => {
          if (stat.stat.name === "hp") {
            return {
              base_stat: stat.base_stat,
              effort: stat.effort,
              stat: {
                name: stat.stat.name,
              },
            };
          }
        }),
        attack: data.initial.stats.find((stat: statsProps) => {
          if (stat.stat.name === "attack") {
            return {
              base_stat: stat.base_stat,
              effort: stat.effort,
              stat: {
                name: stat.stat.name,
              },
            };
          }
        }),
        defense: data.initial.stats.find((stat: statsProps) => {
          if (stat.stat.name === "defense") {
            return {
              base_stat: stat.base_stat,
              effort: stat.effort,
              stat: {
                name: stat.stat.name,
              },
            };
          }
        }),
        specialAttack: data.initial.stats.find((stat: statsProps) => {
          if (stat.stat.name === "special-attack") {
            return {
              base_stat: stat.base_stat,
              effort: stat.effort,
              stat: {
                name: stat.stat.name,
              },
            };
          }
        }),
        specialDefense: data.initial.stats.find((stat: statsProps) => {
          if (stat.stat.name === "special-defense") {
            return {
              base_stat: stat.base_stat,
              effort: stat.effort,
              stat: {
                name: stat.stat.name,
              },
            };
          }
        }),
        speed: data.initial.stats.find((stat: statsProps) => {
          if (stat.stat.name === "speed") {
            return {
              base_stat: stat.base_stat,
              effort: stat.effort,
              stat: {
                name: stat.stat.name,
              },
            };
          }
        }),
      },
      flavor: data.extra.flavor_text_entries
        .filter((flavor: any) => {
          if (flavor.language.name === "en") {
            return flavor.flavor_text;
          }
        })
        .slice(0, 1),
    };

    setPokemon(pokemonData);
  }
  return (
    <PokedexContext.Provider
      value={{
        getPokedex,
        getTypePokedex,
        getMoves,
        getAbility,
        getUniquePokemon,
        pokeList,
        typeList,
        movesList,
        ability,
        pokemon,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
}
