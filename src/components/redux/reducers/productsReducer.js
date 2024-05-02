import { GET_PRODUCT_LIST } from "../actions/productActions";

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

    default:
      return state;
  }
};
export default productsReducer;
