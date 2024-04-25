export const handleInputFocus = (selectedInput, e, state, stateFunction) => {
  e.target.placeholder = "";
  const updatedIsTextVisible = { ...state };

  updatedIsTextVisible[selectedInput].value = true;

  stateFunction(updatedIsTextVisible);
};

export const handleBlur = (selectedInput, e, state, stateFunction) => {
  const updatedIsTextVisible = { ...state };
  e.target.placeholder = updatedIsTextVisible[selectedInput].name;
  updatedIsTextVisible[selectedInput].value = false;
  stateFunction(updatedIsTextVisible);
};

export const clearFields = (arrayFields, validationFunction) => {
  arrayFields.forEach((stateFunction) => {
    stateFunction("");
    validationFunction(false);
  });
};
