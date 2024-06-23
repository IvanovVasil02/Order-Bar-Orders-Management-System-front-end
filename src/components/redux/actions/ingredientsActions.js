// import { connectToWS, sendMessage } from "./config/WebSocketClient";
import { APIBASE } from "./config/apiConfig";

export const GET_INGREDIENT_LIST = "GET_INGREDIENTS_LIST";
export const ADD_TO_INGREDIENT_LIST = "ADD_TO_INGREDIENT_LIST";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

// ---------------------------------GET ALL INGREDIENTS----------------------------------

export const fetchAllIngredients = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(APIBASE + "/ingredients", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: GET_INGREDIENT_LIST, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// ---------------------------------SAVE INGREDIENTS----------------------------------

export const saveIngredient = (ingredientName, ingredientCategory, token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(APIBASE + "/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ ingredientName, ingredientCategory }),
      });

      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: ADD_TO_INGREDIENT_LIST, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// ---------------------------------EDIT INGREDIENTS----------------------------------

export const editIngredient = (ingredientId, ingredientName, ingredientCategory, token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(APIBASE + "/ingredients?ingredientId=" + ingredientId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ ingredientName, ingredientCategory }),
      });

      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: UPDATE_INGREDIENT, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// ---------------------------------DELETE INGREDIENTS----------------------------------

export const deleteIngredient = (ingredientId, token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(APIBASE + "/ingredients?ingredientId=" + ingredientId, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (resp.ok) {
        dispatch({ type: DELETE_INGREDIENT, payload: ingredientId });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
