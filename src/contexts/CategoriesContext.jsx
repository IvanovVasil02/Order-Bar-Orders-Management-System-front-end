import { createContext } from "react";

export const CategoriesContext = createContext();

const hotDishesCategories = [
  { title: "Panini", categoryKey: "subCategory", categoryValue: "BEER" },
  { title: "Hamburger", categoryKey: "subCategory", categoryValue: "HAMBURGER" },
  { title: "Piadine", categoryKey: "subCategory", categoryValue: "DONER" },
  { title: "Fritti", categoryKey: "subCategory", categoryValue: "FRIED" },
];

const drinkCategories = [
  { title: "Succhi", categoryKey: "subCategory", categoryValue: "JUICES" },
  { title: "Gassose", categoryKey: "subCategory", categoryValue: "SODAS" },
  { title: "Té", categoryKey: "subCategory", categoryValue: "TEA" },
  { title: "Birra", categoryKey: "subCategory", categoryValue: "BEER" },
  { title: "Cocktails", categoryKey: "subCategory", categoryValue: "COCKTAILS" },
  { title: "Mocktails", categoryKey: "subCategory", categoryValue: "MOCKTAILS" },
  { title: "Water", categoryKey: "subCategory", categoryValue: "WATER" },
  { title: "Caffé", categoryKey: "subCategory", categoryValue: "COFEE" },
];

const ingredientCategories = [
  {
    title: "Farinosi",
    categoryKey: "ingredientCategory",
    categoryValue: "FLOURIES",
  },
  {
    title: "Verdure",
    categoryKey: "ingredientCategory",
    categoryValue: "VEGETABLES",
  },
  {
    title: "Carne",
    categoryKey: "ingredientCategory",
    categoryValue: "MEAT",
  },
  {
    title: "Formaggi",
    categoryKey: "ingredientCategory",
    categoryValue: "CHEESES",
  },
  {
    title: "Salse",
    categoryKey: "ingredientCategory",
    categoryValue: "SAUCES",
  },
];

const allCategories = {
  hotDishesCategories,
  drinkCategories,
  ingredientCategories,
};

export const CategoriesProvider = ({ children }) => {
  return <CategoriesContext.Provider value={allCategories}>{children}</CategoriesContext.Provider>;
};
