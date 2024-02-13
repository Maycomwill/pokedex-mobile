export type AbilityPokemonProp = {
  slot: number;
  is_hidden: boolean;
  ability: {
    name: string;
    url: string;
  };
};

export type AbilityProps = {
  flavor: flavorEntrie;
  effect: effectEntrie;
  name: string;
  pokemon: {
    name: string;
    url: string;
  }[];
};

export type effectEntrie = {
  effect: string;
  short_effect: string;
  language: {
    name: string;
    url: string;
  };
};

export type flavorEntrie = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
};
