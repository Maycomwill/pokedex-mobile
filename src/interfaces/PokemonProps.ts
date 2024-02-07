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
  abilities: string[];
  flavor: string;
  // evolution_chain: evolutionProps[];
  // damage_relation: damageRelationsProps;
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
