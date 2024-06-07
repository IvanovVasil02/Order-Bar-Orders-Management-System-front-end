export const GET_INGREDIENT_LIST = "GET_INGREDIENTS_LIST";

// ---------------------------------GET ALL INGREDIENTS----------------------------------

export const fetchAllIngredients = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3001/ingredients", {
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
      const resp = await fetch("http://localhost:3001/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ ingredientName, ingredientCategory }),
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

// ---------------------------------EDIT INGREDIENTS----------------------------------

export const editIngredient = (ingredientId, ingredientName, ingredientCategory, token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3001/ingredients?ingredientId=" + ingredientId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ ingredientName, ingredientCategory }),
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

// ---------------------------------DELETE INGREDIENTS----------------------------------

export const deleteIngredient = (ingredientId, token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3001/ingredients?ingredientId=" + ingredientId, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (resp.ok) {
        dispatch(fetchAllIngredients(token));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
