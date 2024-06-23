import { ADD_TO_TABLE_LIST, DELETE_TABLE, GET_TABLE_LIST } from "../actions/tablesActions";

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
    case ADD_TO_TABLE_LIST:
      return {
        ...state,
        tableList: [...state.tableList, ...action.payload],
      };
    case DELETE_TABLE:
      return {
        ...state,
        tableList: state.tableList.filter((item) => item.tableNumber !== action.payload),
      };

    default:
      return state;
  }
};
export default ingredientsReducer;
