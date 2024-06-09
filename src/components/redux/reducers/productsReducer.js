import { ADD_TO_PRODUCT_LIST, GET_PRODUCT_LIST, UPDATE_PRODUCT_LIST } from "../actions/productActions";

const productsState = {
  productList: [],
};

const productsReducer = (state = productsState, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };

    case UPDATE_PRODUCT_LIST:
      return {
        ...state,
        productList: [
          action.payload,
          state.productList.filter((product) => {
            product.id != action.payload.id;
          }),
        ],
      };
    case ADD_TO_PRODUCT_LIST:
      return {
        ...state,
        productList: [...state.productList, action.payload],
      };

    default:
      return state;
  }
};
export default productsReducer;
