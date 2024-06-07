import { createContext, useState } from "react";

export const ActiveFormContext = createContext();

export const ActiveFormProvider = ({ children }) => {
  const [activeForm, setActiveForm] = useState("orderForm");

  const handleSelectForm = (form) => {
    setActiveForm(form);
  };

  return <ActiveFormContext.Provider value={{ activeForm, handleSelectForm }}>{children}</ActiveFormContext.Provider>;
};
