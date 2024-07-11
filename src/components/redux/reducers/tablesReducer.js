import { ADD_ORDER_TO_TABLE, ADD_TO_TABLE_LIST, DELETE_TABLE, GET_TABLE_LIST } from "../actions/tablesActions";

const tablesState = {
  tableList: [],
};
const sortByTableNumber = (tableList) => {
  return tableList.sort((a, b) => a.tableNumber - b.tableNumber);
};

const ingredientsReducer = (state = tablesState, action) => {
  switch (action.type) {
    case GET_TABLE_LIST:
      return {
        ...state,
        tableList: sortByTableNumber(action.payload),
      };
    case ADD_TO_TABLE_LIST:
      return {
        ...state,
        tableList: sortByTableNumber([...state.tableList, ...action.payload]),
      };
    case DELETE_TABLE:
      return {
        ...state,
        tableList: sortByTableNumber(state.tableList.filter((item) => item.tableNumber !== action.payload)),
      };
    case ADD_ORDER_TO_TABLE:
      return {
        ...state,
        tableList: sortByTableNumber(
          state.tableList.map((table) => (table.table_id === action.payload.table_id ? action.payload : table))
        ),
      };

    default:
      return state;
  }
};
export default ingredientsReducer;
