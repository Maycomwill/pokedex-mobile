import { useContext } from "react";
import { MovesContext, MovesContextProps } from "../context/MovesContext";

export default function useMoves(): MovesContextProps {
  const context = useContext(MovesContext);
  return context;
}
