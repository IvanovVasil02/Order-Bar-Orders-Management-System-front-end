import { GET_ORDER_LIST } from "../actions/ordersActions";

const ordersState = {
  orderList: [],
};

const ordersReducer = (state = ordersState, action) => {
  switch (action.type) {
    case GET_ORDER_LIST:
      return {
        ...state,
        orderList: action.payload,
      };

    default:
      return state;
  }
};
export default ordersReducer;
