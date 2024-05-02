export const GET_ORDER_LIST = "GET_ORDER_LIST";
// ---------------------------------GET ALL ORDERS----------------------------------

export const fetchAllOrders = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3001/orders", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: GET_ORDER_LIST, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// ---------------------------------SAVE ORDER----------------------------------

export const saveOrder = (tableId, note, productList1, token) => {
  return async (dispatch) => {
    try {
      const productList = productList1.map((elm) => ({
        productId: elm.id,
        quantity: elm.quantity,
        note: "nope",
      }));

      const resp = await fetch("http://localhost:3001/orders/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ tableId, note, productList }),
      });

      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: GET_ORDER_LIST, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
