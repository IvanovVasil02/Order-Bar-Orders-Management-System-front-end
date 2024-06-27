import { APIBASE } from "./config/apiConfig";

export const GET_TABLE_LIST = "GET_TABLE_LIST";
export const ADD_TO_TABLE_LIST = "ADD_TO_TABLE_LIST";
export const DELETE_TABLE = "DELETE_TABLE";

// ---------------------------------GET ALL TABLES----------------------------------

export const fetchAllTables = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(APIBASE + "/tables", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: GET_TABLE_LIST, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// ---------------------------------CREATE TABLES----------------------------------

export const createTables = (num, token) => {
  return async (dispatch) => {
    const resp = await fetch(APIBASE + "/tables/addTables/" + num, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(num),
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw errorData;
    } else {
      const data = await resp.json();
      dispatch({ type: ADD_TO_TABLE_LIST, payload: data });
    }
  };
};

// ---------------------------------DELETE TABLE----------------------------------

export const deleteTable = (num, token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(APIBASE + "/tables/" + num, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (resp.ok) {
        dispatch({ type: DELETE_TABLE, payload: num });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
