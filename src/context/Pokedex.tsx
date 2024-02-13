import { ReactNode, createContext, useState } from "react";
import { api } from "../lib/axios";
import {
  PokemonDataProps,
  UniquePokemonData,
  resultsType,
  statsProps,
  typeDamageRelation,
} from "../interfaces/PokemonProps";
import axios from "axios";
import {
  AbilityPokemonProp,
  AbilityProps,
  effectEntrie,
  flavorEntrie,
} from "../interfaces/AbilityProps";
import { EvolutionProps } from "../interfaces/EvolutionChainProps";

export interface PokedexContextProps {
  getPokedex: (generation: string) => void;
  getTypePokedex: (type: string) => void;
  getMoves: () => void;
  getAbility: (ability: string) => void;
  getUniquePokemon: (pokemon: string | number) => void;
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
  const [damageObj, setDamageObj] = useState<typeDamageRelation[]>([]);

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

  async function getUniquePokemon(pokemon: string | number) {
    setDamageObj([]);
    setPokemon(undefined);
    async function handleWithApi(pokemon: number | string) {
      console.log("chegou aqui", pokemon);
      let ref: string | number = "";
      if (typeof pokemon === "string") {
        let newRef = pokemon.toLowerCase();
        console.log(newRef);
        ref = newRef;
      } else {
        ref = pokemon;
      }
      const initialData = await api.get(`pokemon/${ref}`);
      const { species } = initialData.data;
      const extraData = await axios.get(`${species.url}`);
      return {
        initial: initialData.data,
        extra: extraData.data,
      };
    }

    async function handleWithTypeRelation(
      type: string
    ): Promise<typeDamageRelation> {
      const typesData = await api.get(`type/${type}`);
      return {
        name: typesData.data.name,
        damage: typesData.data.damage_relations,
      };
    }

    const data = await handleWithApi(pokemon);
    const types = data.initial.types.map(
      (type: { slot: number; type: { name: string; url: string } }) => {
        return type.type.name;
      }
    );

    const typesDamageData: typeDamageRelation[] = await Promise.all(
      types.map(async (type: string) => {
        const typeDamage = await handleWithTypeRelation(type);

        const { damage, name } = typeDamage;

        return {
          name,
          damage,
        };
      })
    );

    function createDamageRelationObject() {
      const default_damage_relations = {
        double_damage_from: typesDamageData.map((type: typeDamageRelation) => {
          return type.damage.double_damage_from.map(
            (type: { name: string; url: string }) => {
              return type.name;
            }
          );
        }),
        double_damage_to: typesDamageData.map((type: typeDamageRelation) => {
          return type.damage.double_damage_to.map(
            (type: { name: string; url: string }) => {
              return type.name;
            }
          );
        }),
        half_damage_from: typesDamageData.map((type: typeDamageRelation) => {
          return type.damage.half_damage_from.map(
            (type: { name: string; url: string }) => {
              return type.name;
            }
          );
        }),
        half_damage_to: typesDamageData.map((type: typeDamageRelation) => {
          return type.damage.half_damage_to.map(
            (type: { name: string; url: string }) => {
              return type.name;
            }
          );
        }),
        no_damage_from: typesDamageData.map((type: typeDamageRelation) => {
          return type.damage.no_damage_from.map(
            (type: { name: string; url: string }) => {
              return type.name;
            }
          );
        }),
        no_damage_to: typesDamageData.map((type: typeDamageRelation) => {
          return type.damage.no_damage_to.map(
            (type: { name: string; url: string }) => {
              return type.name;
            }
          );
        }),
      };

      const damage_relations = {
        double_damage_from:
          default_damage_relations.double_damage_from[0].concat(
            default_damage_relations.double_damage_from[1]
          ),
        double_damage_to: default_damage_relations.double_damage_to[0].concat(
          default_damage_relations.double_damage_to[1]
        ),
        half_damage_from: default_damage_relations.half_damage_from[0].concat(
          default_damage_relations.half_damage_from[1]
        ),
        half_damage_to: default_damage_relations.half_damage_to[0].concat(
          default_damage_relations.half_damage_to[1]
        ),
        no_damage_from: default_damage_relations.no_damage_from[0].concat(
          default_damage_relations.no_damage_from[1]
        ),
        no_damage_to: default_damage_relations.no_damage_to[0].concat(
          default_damage_relations.no_damage_to[1]
        ),
        four_times_damage_from:
          default_damage_relations.double_damage_from[0].concat(
            default_damage_relations.double_damage_from[1]
          ),
        four_times_damage_to:
          default_damage_relations.double_damage_to[0].concat(
            default_damage_relations.double_damage_to[1]
          ),
      };

      const filtered_damage_objects = {
        double_damage_from: [
          ...new Set(
            damage_relations.double_damage_from
              .filter(
                (type) => !damage_relations.half_damage_from.includes(type)
              )
              .filter((type) => !damage_relations.no_damage_from.includes(type))
          ),
        ],

        double_damage_to: [
          ...new Set(
            damage_relations.double_damage_to
              .filter((type) => !damage_relations.half_damage_to.includes(type))
              .filter((type) => !damage_relations.no_damage_to.includes(type))
          ),
        ],
        half_damage_from: damage_relations.half_damage_from.filter(
          (type) => !damage_relations.double_damage_from.includes(type)
        ),
        half_damage_to: damage_relations.half_damage_to.filter(
          (type) => !damage_relations.double_damage_to.includes(type)
        ),
        no_damage_from: damage_relations.no_damage_from,
        no_damage_to: damage_relations.no_damage_to,
        four_times_damage_from: damage_relations.double_damage_from.filter(
          (element, index) => {
            return (
              damage_relations.double_damage_from.indexOf(element) !== index
            );
          }
        ),
        four_times_damage_to: damage_relations.double_damage_to.filter(
          (element, index) => {
            return damage_relations.double_damage_to.indexOf(element) !== index;
          }
        ),
      };
      console.log(filtered_damage_objects.double_damage_to);
      return filtered_damage_objects;
    }

    async function handleWithEvolutionData() {
      const evolution_chain = await axios.get(data.extra.evolution_chain.url);

      const first_evolution: string | undefined =
        evolution_chain.data.chain.species.name;
      const second_evolution: string | undefined =
        evolution_chain.data.chain.evolves_to[0]?.species.name;
      const third_evolution: string | undefined =
        evolution_chain.data.chain.evolves_to[0]?.evolves_to[0]?.species.name;
      console.log(first_evolution, second_evolution, third_evolution);
      if (first_evolution && second_evolution && third_evolution) {
        const firstData = await api.get(`pokemon/${first_evolution}`);
        const secondData = await api.get(`pokemon/${second_evolution}`);
        const thirdData = await api.get(`pokemon/${third_evolution}`);
        const first: EvolutionProps = {
          id: firstData.data.id,
          name: first_evolution,
          url: evolution_chain.data.chain.species.url,
          sprite: {
            default: firstData.data.sprites.front_default,
            shiny: firstData.data.sprites.front_shiny,
          },
        };

        const second: EvolutionProps = {
          name: second_evolution,
          id: secondData.data.id,
          sprite: {
            default: secondData.data.sprites.front_default,
            shiny: secondData.data.sprites.front_shiny,
          },

          url: evolution_chain.data.chain.evolves_to[0].species.url,
        };

        const third: EvolutionProps = {
          id: thirdData.data.id,
          name: third_evolution,
          sprite: {
            default: thirdData.data.sprites.front_default,
            shiny: thirdData.data.sprites.front_shiny,
          },
          url: evolution_chain.data.chain.evolves_to[0].evolves_to[0].species
            .url,
        };

        return [first, second, third];
      } else if (first_evolution && second_evolution) {
        const firstData = await api.get(`pokemon/${first_evolution}`);
        const secondData = await api.get(`pokemon/${second_evolution}`);
        const first: EvolutionProps = {
          id: firstData.data.id,
          name: first_evolution,
          url: evolution_chain.data.chain.species.url,
          sprite: {
            default: firstData.data.sprites.front_default,
            shiny: firstData.data.sprites.front_shiny,
          },
        };

        const second: EvolutionProps = {
          id: secondData.data.id,
          name: second_evolution,
          sprite: {
            default: secondData.data.sprites.front_default,
            shiny: secondData.data.sprites.front_shiny,
          },

          url: evolution_chain.data.chain.evolves_to[0].species.url,
        };
        return [first, second];
      } else if (first_evolution !== undefined) {
        const firstData = await api.get(`pokemon/${first_evolution}`);
        const first: EvolutionProps = {
          id: firstData.data.id,
          name: first_evolution,
          url: evolution_chain.data.chain.species.url,
          sprite: {
            default: firstData.data.sprites.front_default,
            shiny: firstData.data.sprites.front_shiny,
          },
        };
        return [first];
      } else {
        return [];
      }
    }

    const evolution_data = await handleWithEvolutionData();

    const damage_relations = createDamageRelationObject();

    const pokemonData: UniquePokemonData = {
      damage_relation: {
        double_damage_from: damage_relations.double_damage_from,
        double_damage_to: damage_relations.double_damage_to,
        half_damage_from: damage_relations.half_damage_from,
        half_damage_to: damage_relations.half_damage_to,
        no_damage_from: damage_relations.no_damage_from,
        no_damage_to: damage_relations.no_damage_to,
        four_times_damage_from: damage_relations.four_times_damage_from,
        four_times_damage_to: damage_relations.four_times_damage_to,
      },
      evolution_chain: evolution_data,
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
      abilities: data.initial.abilities.map((ability: AbilityPokemonProp) => {
        return {
          is_hidden: ability.is_hidden,
          slot: ability.slot,
          ability: ability.ability,
        };
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
