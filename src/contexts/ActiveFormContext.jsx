import { createContext, useState } from "react";

export const ActiveFormContext = createContext();

export const ActiveFormProvider = ({ children }) => {
  const [activeForm, setActiveForm] = useState("orderForm");
  const [show, setShow] = useState(false);
  const handleSelectForm = (form) => {
    setActiveForm(form);
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <ActiveFormContext.Provider value={{ activeForm, handleSelectForm, show, handleShow, handleClose }}>
      {children}
    </ActiveFormContext.Provider>
  );
};
