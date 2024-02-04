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
