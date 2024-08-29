import { NamedAPIResource } from "./apiInterfaces";
// import { PokemonDataProps } from "./pokemonInterfaces";

export interface MoveProps {
  accuracy: number;
  power: number;
  effect_chance: number;
  pp: number;
  priority:
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8;
  damage_class: { name: "physical" | "special" | "status"; url: string };
  type: NamedAPIResource;
  target: NamedAPIResource;
  flavor_text_entries: string;
  effect_entries: string;
  name: string;
}
