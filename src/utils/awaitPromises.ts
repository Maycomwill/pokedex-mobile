import axios from "axios";
import { PokedexDataProps } from "../interfaces/pokemonInterfaces";
import { PokemonDataProps } from "../interfaces/PokemonProps";
import {
  AbilityProps,
  effectEntrie,
  flavorEntrie,
} from "../interfaces/AbilityProps";
import { pokeapi } from "../lib/axios";

let rawAbilitiesData: AbilityProps[] = [];
let rawPokemonData: PokemonDataProps[] = [];

export async function waitingPromises(results: PokedexDataProps[]) {
  rawPokemonData = [];
  await axios.all(results.map((pokemon) => getPokemonInformation(pokemon.url)));
  return rawPokemonData;
}

export async function waitingAbilitiesPromises(abilities: string[]) {
  rawAbilitiesData = [];
  await axios.all(abilities.map((ability) => getAbilityInformation(ability)));
  return rawAbilitiesData;
}

export async function getAbilityInformation(ability: string) {
  return await pokeapi.get(`ability/${ability}`).then(function (response) {
    return rawAbilitiesData.push({
      name: response.data.name,
      effect: response.data.effect_entries.find((effect: effectEntrie) => {
        if (effect.language.name === "en") return effect.effect;
      }),
      flavor: response.data.flavor_text_entries.find((flavor: flavorEntrie) => {
        if (flavor.language.name === "en") return flavor.flavor_text;
      }),
      pokemon: response.data.pokemon,
    });
  });
}

export async function getPokemonInformation(pokemonUrl: string) {
  return await axios.get(pokemonUrl).then(function (response) {
    return rawPokemonData.push({
      name: response.data.name,
      id: response.data.id,
      sprites: {
        artwork: {
          default:
            response.data.sprites.other["official-artwork"].front_default,
          shiny: response.data.sprites.other["official-artwork"].front_shiny,
        },
        default: {
          default: response.data.sprites.front_default,
          shiny: response.data.sprites.front_shiny,
        },
        home: {
          default: response.data.sprites.other.home.front_default,
          shiny: response.data.sprites.other.home.front_shiny,
        },
      },
      types: response.data.types.map((type: any) => {
        return {
          name: type.type.name,
        };
      }),
    });
  });
}
