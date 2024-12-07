import { useContext } from "react";
import { FormContext, FormContextProps } from "../context/FormsContext";

export function useForms(): FormContextProps {
  const context = useContext(FormContext);
  return context;
}
