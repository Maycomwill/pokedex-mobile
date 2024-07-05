import { NamedAPIResource } from "./apiInterfaces";

export type AbilityPokemonProp = {
  slot: number;
  is_hidden: boolean;
  ability: NamedAPIResource
};

export type AbilityProps = {
  flavor: flavorEntrie;
  effect: effectEntrie;
  name: string;
  pokemon: NamedAPIResource[];
};

export type effectEntrie = {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
};

export type flavorEntrie = {
  flavor_text: string;
  language: NamedAPIResource;
};
