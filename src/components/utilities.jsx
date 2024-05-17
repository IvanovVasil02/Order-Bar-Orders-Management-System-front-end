import { ToggleButton } from "react-bootstrap";
import ProductCard from "./cards/ProductCard";

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

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const btnSpawner = (array, nameCategory, condition, btnFunction, arrayToCheck) => {
  return array
    .filter((element) => element[nameCategory] === condition)
    .map((element, index) => (
      <ToggleButton
        className={`choise-btn ${arrayToCheck?.includes(element) && "choise-btn-selected"}`}
        onClick={() => btnFunction(element)}
        key={index}
      >
        {element.name}
      </ToggleButton>
    ));
};

export const productCardSpawner = (array, condition, addFunction, removeFunction, getOrderedQuantityProduct) => {
  return array
    .filter((element) => element.subCategory === condition)
    .map((element, index) => (
      <ProductCard
        key={index}
        title={element.name}
        ingredients={element.ingredients}
        addFunction={() => addFunction(element)}
        removeFunction={() => removeFunction(element.id)}
        quantity={getOrderedQuantityProduct(element.id)}
      />
    ));
};
