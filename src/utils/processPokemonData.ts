import { PokemonDataProps } from "../interfaces/PokemonProps";

export function processPokemonData(pokemon: any): PokemonDataProps {
  return {
    name: pokemon.name,
    id: pokemon.id,
    sprites: {
      default: {
        default: pokemon.sprites.default.default,
        shiny: pokemon.sprites.default.shiny,
      },
      artwork: {
        default: pokemon.sprites.artwork.default,
        shiny: pokemon.sprites.artwork.shiny,
      },
      home: {
        default: pokemon.sprites.home.default,
        shiny: pokemon.sprites.home.shiny,
      },
    },
    types: pokemon.types.map((type: any) => {
      return {
        name: type.name,
      };
    }),
  };
}
