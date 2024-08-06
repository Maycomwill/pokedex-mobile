import { Name, NamedAPIResource } from "./apiInterfaces";

export interface PrincipalEvolutionChain {
  id: number;
  baby_trigger_item: NamedAPIResource | null;
  chain: ChainLink;
}

export interface EvolutionDetail {
  /** The item required to cause evolution this into Pokémon species. */
  item: NamedAPIResource | null;
  /** The type of event that triggers evolution into this Pokémon species. */
  trigger: NamedAPIResource;
  /** The id of the gender of the evolving Pokémon species must be in order to evolve into this Pokémon species. */
  gender: number | null;
  /** The item the evolving Pokémon species must be holding during the evolution trigger event to evolve into this Pokémon species. */
  held_item: NamedAPIResource | null;
  /** The move that must be known by the evolving Pokémon species during the evolution trigger event in order to evolve into this Pokémon species. */
  known_move: NamedAPIResource | null;
  /** The evolving Pokémon species must know a move with this type during the evolution trigger event in order to evolve into this Pokémon species. */
  known_move_type: NamedAPIResource | null;
  /** The location the evolution must be triggered at. */
  location: NamedAPIResource | null;
  /** The minimum required level of the evolving Pokémon species to evolve into this Pokémon species. */
  min_level: number | null;
  /** The minimum required level of happiness the evolving Pokémon species to evolve into this Pokémon species. */
  min_happiness: number | null;
  /** The minimum required level of beauty the evolving Pokémon species to evolve into this Pokémon species. */
  min_beauty: number | null;
  /** The minimum required level of affection the evolving Pokémon species to evolve into this Pokémon species. */
  min_affection: number | null;
  /** Whether or not it must be raining in the overworld to cause evolution this Pokémon species. */
  needs_overworld_rain: boolean;
  /** The Pokémon species that must be in the players party in order for the evolving Pokémon species to evolve into this Pokémon species. */
  party_species: NamedAPIResource | null;
  /**
   * The player must have a Pokémon of this type in their party during the evolution trigger event
   * in order for the evolving Pokémon species to evolve into this Pokémon species.
   */
  party_type: NamedAPIResource | null;
  /** The required relation between the Pokémon's Attack and Defense stats. 1 means Attack > Defense. 0 means Attack = Defense. -1 means Attack < Defense. */
  relative_physical_stats: 1 | 0 | -1 | null;
  /** The required time of day. Day or night. */
  time_of_day: "day" | "night" | "";
  /** Pokémon species for which this one must be traded. */
  trade_species: NamedAPIResource | null;
  /** Whether or not the 3DS needs to be turned upside-down as this Pokémon levels up. */
  turn_upside_down: boolean;
}

export interface ChainLink {
  /** Whether or not this link is for a baby Pokémon. This would only ever be true on the base link */
  is_baby: boolean;
  /** The Pokémon species at this point in the evolution chain */
  species: NamedAPIResource;
  /** All details regarding the specific details of the referenced Pokémon species evolution */
  evolution_details: EvolutionDetail[];
  /** A List of chain objects */
  evolves_to: ChainLink[];
}

export interface EvolutionTrigger {
  /** The identifier for this resource. */
  id: number;
  /** The name for this resource. */
  name: "level-up" | "trade" | "use-item" | "shed" | "other";
  /** The name of this resource listed in different languages. */
  names: Name[];
  /** A list of pokemon species that result from this evolution trigger. */
  pokemon_species: NamedAPIResource[];
}

export interface Evolution {
  details?: EvolutionDetail[];
  name: string;
  sprites: { default: string; shiny: string };
  trigger: {
    name: string;
    sprite?: string;
  } | null;
}
