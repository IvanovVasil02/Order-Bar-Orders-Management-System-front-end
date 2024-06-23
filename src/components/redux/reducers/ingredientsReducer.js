import {
  ADD_TO_INGREDIENT_LIST,
  DELETE_INGREDIENT,
  GET_INGREDIENT_LIST,
  UPDATE_INGREDIENT,
} from "../actions/ingredientsActions";

const ingredientsState = {
  ingredientList: [],
};

const ingredientsReducer = (state = ingredientsState, action) => {
  switch (action.type) {
    case GET_INGREDIENT_LIST:
      return {
        ...state,
        ingredientList: action.payload,
      };
    case ADD_TO_INGREDIENT_LIST:
      return {
        ...state,
        ingredientList: [...state.ingredientList, action.payload],
      };
    case UPDATE_INGREDIENT:
      return {
        ...state,
        ingredientList: state.ingredientList.map((ingredient) =>
          ingredient.id === action.payload.id ? action.payload : ingredient
        ),
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredientList: state.ingredientList.filter((ingredient) => ingredient.id !== action.payload),
      };
    default:
      return state;
  }
};
export default ingredientsReducer;
