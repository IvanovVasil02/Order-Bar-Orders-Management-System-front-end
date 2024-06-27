import { APIBASE } from "./config/apiConfig";

export const GET_PRODUCT_LIST = "GET_PRODUCT_LIST";
export const UPDATE_PRODUCT_LIST = "UPDATE_PRODUCT_LIST";
export const ADD_TO_PRODUCT_LIST = "ADD_TO_PRODUCT_LIST";
// ---------------------------------GET ALL PRODUCTS----------------------------------

export const fetchAllProducts = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(APIBASE + "/products", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: GET_PRODUCT_LIST, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// ---------------------------------SAVE PRODUCT----------------------------------

export const saveProduct = (
  productCategory,
  productSubCategory,
  productName,
  price,
  quantity,
  ingredientList,
  token
) => {
  return async (dispatch) => {
    const resp = await fetch(APIBASE + "/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productCategory: productCategory,
        productSubCategory: productSubCategory,
        productName: productName,
        price: price,
        quantity: quantity,
        ingredientList: ingredientList,
      }),
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw errorData;
    } else {
      const data = await resp.json();
      dispatch({ type: ADD_TO_PRODUCT_LIST, payload: data });
    }
  };
};

// ---------------------------------EDIT PRODUCT----------------------------------

export const editProduct = (
  productId,
  productCategory,
  productSubCategory,
  productName,
  price,
  quantity,
  ingredientList,
  token
) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(APIBASE + "/products?productId=" + productId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          productCategory: productCategory,
          productSubCategory: productSubCategory,
          productName: productName,
          price: price,
          quantity: quantity,
          ingredientList: ingredientList,
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        throw errorData;
      } else {
        const data = await resp.json();
        console.log(data);
        dispatch({ type: UPDATE_PRODUCT_LIST, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
