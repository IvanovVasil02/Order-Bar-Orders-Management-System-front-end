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
      const resp = await fetch("http://localhost:3001/ingredients/add", {
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
