import { APIBASE } from "./config/apiConfig";
import { ADD_ORDER_TO_TABLE } from "./tablesActions";

export const GET_ORDER_LIST = "GET_ORDER_LIST";
export const UPDATE_ORDER_LIST = "UPDATE_ORDER_LIST";
// ---------------------------------GET ALL ORDERS BY DATE ----------------------------------

export const fetchAllOrders = (token, date) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(APIBASE + "/orders?date=" + date, {
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
        id: elm.id,
        quantity: elm.quantity,
        note: "nope",
      }));

      const resp = await fetch(APIBASE + "/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ tableId, note, productList }),
      });

      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: ADD_ORDER_TO_TABLE, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// ---------------------------------ADD TO ORDER----------------------------------

export const addToOrder = (orderId, product, token) => {
  return async (dispatch) => {
    console.log(product);
    try {
      const resp = await fetch(APIBASE + "/orders/addToOrder/" + orderId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ id: product.id, quantity: 1, note: "" }),
      });

      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: ADD_ORDER_TO_TABLE, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// ---------------------------------PAY PARTIAL ORDER----------------------------------

export const payPartialOrder = (orderId, product, token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(APIBASE + "/orders/payPartialOrder/" + orderId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ id: product.id, quantity: 1, note: "" }),
      });

      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: ADD_ORDER_TO_TABLE, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// ---------------------------------PAY/CLOSE ORDER----------------------------------

export const closeOrder = (orderId, token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(APIBASE + "/orders/payOrder/" + orderId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: ADD_ORDER_TO_TABLE, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
