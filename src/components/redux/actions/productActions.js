export const GET_PRODUCT_LIST = "GET_PRODUCT_LIST";
// ---------------------------------GET ALL PRODUCTS----------------------------------

export const fetchAllProducts = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3001/products", {
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
    try {
      const resp = await fetch("http://localhost:3001/products/addProduct", {
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

      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        dispatch({ type: GET_PRODUCT_LIST, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
