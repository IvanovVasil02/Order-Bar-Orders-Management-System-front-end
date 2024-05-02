import { GET_TABLE_LIST } from "../actions/tablesActions";

const tablesState = {
  tableList: [],
};

const ingredientsReducer = (state = tablesState, action) => {
  switch (action.type) {
    case GET_TABLE_LIST:
      return {
        ...state,
        tableList: action.payload,
      };

    default:
      return state;
  }
};
export default ingredientsReducer;
