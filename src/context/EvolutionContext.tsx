import { createContext, ReactNode, useState } from "react";
import axios from "axios";
import {
  ChainLink,
  Evolution,
  PrincipalEvolutionChain,
} from "../interfaces/evolutionInterface";
import { pokeapi } from "../lib/axios";

export interface EvolutionContextProps {
  getEvolutionChainData: (url: string) => void;
  firstEvolution: Evolution[] | undefined;
  secondEvolution: Evolution[] | undefined;
  thirdEvolution: Evolution[] | undefined;
}

export const EvolutionContext = createContext({} as EvolutionContextProps);

export function EvolutionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [firstEvolution, setFirstEvolution] = useState<Evolution[]>([]);
  const [secondEvolution, setSecondEvolution] = useState<Evolution[]>([]);
  const [thirdEvolution, setThirdEvolution] = useState<Evolution[]>([]);

  async function getEvolutionChainData(url: string) {
    setFirstEvolution([]);
    setSecondEvolution([]);
    setThirdEvolution([]);
    const { data }: { data: PrincipalEvolutionChain } = await axios.get(url);
    //First Evolution
    let firstEvolutionArray: Evolution[] = [];
    evolution(data.chain).then((response) => {
      if (response === undefined) {
        return;
      }
      firstEvolutionArray.push(response);
      setFirstEvolution(firstEvolutionArray);
    });

    //Second Evolution
    let secondEvolutionArray: Evolution[] = [];
    data.chain.evolves_to.map((_evolution) => {
      evolution(_evolution)
        .then((response) => {
          if (response === undefined) {
            return;
          }
          secondEvolutionArray.push(response);
        })
        .then(() => {
          setSecondEvolution(secondEvolutionArray);
        });
    });

    let thirdEvolutionArray: Evolution[] = [];
    data.chain.evolves_to.map((_evolution) => {
      _evolution.evolves_to.map((_thirdEvolution) => {
        evolution(_thirdEvolution)
          .then((response) => {
            if (response === undefined) {
              return;
            }
            thirdEvolutionArray.push(response);
          })
          .then(() => {
            setThirdEvolution(thirdEvolutionArray);
          });
      });
    });
  }

  async function evolution(chain: ChainLink) {
    let sprites = await getSprites(chain.species.name);
    if (chain.evolution_details.length === 0) {
      return {
        name: chain.species.name,
        sprites,
        details: chain.evolution_details,
        trigger: null,
      };
    }

    if (chain.species.name === "leafeon" || chain.species.name === "glaceon") {
      let item_name = chain.evolution_details;
      // console.log(
      //   "evolution context: ",
      //   chain.evolution_details[3].trigger.name
      // );
      let item_sprite = await getItemSprite(
        chain.evolution_details[3].item.name
      );
      return {
        name: chain.species.name,
        sprites,
        details: chain.evolution_details,
        trigger: {
          name:
            chain.evolution_details[3].trigger &&
            chain.evolution_details[3].trigger.name,
          sprite: item_sprite,
        },
      };
    }

    if (chain.evolution_details[0].trigger.name === "use-item") {
      let item_name = chain.evolution_details;
      // console.log(item_name);
      let item_sprite = await getItemSprite(
        chain.evolution_details.map((item) => {
          if (item.item !== null) return item.item.name;
        })[0]
      );

      return {
        name: chain.species.name,
        sprites,
        details: chain.evolution_details,
        trigger: {
          name:
            chain.evolution_details[0].trigger &&
            chain.evolution_details[0].trigger.name,
          sprite: item_sprite,
        },
      };
    }

    return {
      name: chain.species.name,
      sprites,
      details: chain.evolution_details,
      trigger: {
        name:
          chain.evolution_details[0].trigger &&
          chain.evolution_details[0].trigger.name,
      },
    };
  }

  async function getItemSprite(item: string | undefined) {
    if (item === undefined) {
      return;
    }

    const { data } = await pokeapi.get(`/item/${item}`);

    return data.sprites.default;
  }

  async function getSprites(pokemon: string) {
    const { data } = await pokeapi.get(`/pokemon/${pokemon}`);

    return {
      default: data.sprites.front_default,
      shiny: data.sprites.front_shiny,
    };
  }

  return (
    <EvolutionContext.Provider
      value={{
        getEvolutionChainData,
        firstEvolution,
        secondEvolution,
        thirdEvolution,
      }}
    >
      {children}
    </EvolutionContext.Provider>
  );
}
