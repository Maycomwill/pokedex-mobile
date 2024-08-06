import { useContext } from "react";
import { TypesContext, TypesContextProps } from "../context/TypesContext";

export default function useTypes(): TypesContextProps {
  const context = useContext(TypesContext);
  return context;
}
