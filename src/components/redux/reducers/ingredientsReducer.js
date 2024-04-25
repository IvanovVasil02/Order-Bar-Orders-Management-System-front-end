import { GET_INGREDIENT_LIST } from "../actions/ingredientsActions";

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

    default:
      return state;
  }
};
export default ingredientsReducer;
