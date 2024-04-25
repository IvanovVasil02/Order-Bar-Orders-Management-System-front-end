import { SAVED_TOKEN } from "../actions/AuthenticationActions";

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

    default:
      return state;
  }
};
export default mainReducer;
