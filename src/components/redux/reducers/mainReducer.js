import { LOGOUT, SAVED_TOKEN } from "../actions/authenticationActions";

const mainState = {
  savedToken: null,
};

const mainReducer = (state = mainState, action) => {
  switch (action.type) {
    case SAVED_TOKEN:
      return {
        ...state,
        savedToken: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        savedToken: null,
      };

    default:
      return state;
  }
};
export default mainReducer;
