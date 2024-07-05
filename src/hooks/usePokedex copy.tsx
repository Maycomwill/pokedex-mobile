import { useContext } from "react";

import {PokedexContext, PokedexContextDataProps} from '../context/PokedexContext'

export function usePokedex(): PokedexContextDataProps {

  const context = useContext(PokedexContext);

  return context;
}
