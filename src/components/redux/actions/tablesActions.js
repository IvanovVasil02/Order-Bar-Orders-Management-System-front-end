export const GET_TABLE_LIST = "GET_TABLE_LIST";

// ---------------------------------GET ALL TABLES----------------------------------

export const fetchAllTables = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3001/tables", {
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
    try {
      const resp = await fetch("http://localhost:3001/tables/addTables/" + num, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(num),
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
