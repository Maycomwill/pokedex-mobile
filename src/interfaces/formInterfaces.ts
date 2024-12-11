import { NamedAPIResource } from './apiInterfaces';

export interface FormDataSchema {
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
}

export interface Variety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}
