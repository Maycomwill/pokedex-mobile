import { createContext, ReactNode, useState } from "react";
import { FormDataSchema, Variety } from "../interfaces/formInterfaces";
import { waitingFormsPromises } from "../utils/awaitPromises";

export interface FormContextProps {
  getForms: (varieties: Variety[]) => void;
  forms: FormDataSchema[];
}

export const FormContext = createContext({} as FormContextProps);

export function FormContextProvider({ children }: { children: ReactNode }) {
  const [forms, setForms] = useState<FormDataSchema[]>([]);

  async function getForms(varieties: Variety[]) {
    const newArray = varieties.map((varieties) => {
      return varieties.pokemon;
    });

    waitingFormsPromises(newArray).then((response) =>
      setForms(
        response.sort((a, b) => {
          return a.id - b.id;
        })
      )
    );
  }

  return (
    <FormContext.Provider value={{ getForms, forms }}>
      {children}
    </FormContext.Provider>
  );
}
