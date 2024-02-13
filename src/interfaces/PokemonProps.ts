import { AbilityPokemonProp } from "./AbilityProps";
import { EvolutionProps } from "./EvolutionChainProps";

export interface PokemonDataProps {
  name: string;
  id: number;
  sprites: {
    default: {
      default: string;
      shiny: string;
    };
    artwork: {
      default: string;
      shiny: string;
    };
    home: {
      default: string;
      shiny: string;
    };
  };
  types: typeProps[];
}

export interface typeProps {
  name: string;
}

export type resultsType = {
  name: string;
  url: string;
};

export interface UniquePokemonData {
  name: string;
  id: number;
  sprites: {
    default: {
      default: string;
      shiny: string;
    };
    artwork: {
      default: string;
      shiny: string;
    };
    home: {
      default: string;
      shiny: string;
    };
  };
  types: typeProps[];
  weight: number;
  height: number;
  stats: {
    hp: statsProps;
    attack: statsProps;
    defense: statsProps;
    specialAttack: statsProps;
    specialDefense: statsProps;
    speed: statsProps;
  };
  abilities: AbilityPokemonProp[];
  flavor: string;
  evolution_chain: EvolutionProps[];
  damage_relation: damageRelationsProps;
  gender: {
    female: number;
    male: number;
  };
}

export interface statsProps {
  base_stat: number;
  effort: string;
  stat: {
    name: string;
  };
}

export interface damageRelationsProps {
  double_damage_to: string[];
  double_damage_from: string[];
  half_damage_from: string[];
  half_damage_to: string[];
  no_damage_from: string[];
  no_damage_to: string[];
  four_times_damage_from: string[];
  four_times_damage_to: string[];
}

export interface typeDamageRelation {
  name: string;
  damage: {
    double_damage_from: { name: string; url: string }[];
    double_damage_to: { name: string; url: string }[];
    half_damage_from: { name: string; url: string }[];
    half_damage_to: { name: string; url: string }[];
    no_damage_from: { name: string; url: string }[];
    no_damage_to: { name: string; url: string }[];
  };
}
