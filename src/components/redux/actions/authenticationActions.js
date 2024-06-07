import { jwtDecode } from "jwt-decode";

export const SAVED_TOKEN = "SAVED_TOKEN";
export const LOGOUT = "LOGOUT";

export const fetchLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http:///localhost:3001/authentication/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const resp = await response.json();
        await dispatch({ type: SAVED_TOKEN, payload: resp.token });

        const decodedToken = jwtDecode(resp.token);

        if (!decodedToken) {
          throw new Error("Decodifica del token fallita");
        }
      } else if (!response.ok) {
        const resp = await response.json();
        console.log(resp.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const logout = () => (dispatch) =>
  dispatch({
    type: LOGOUT,
  });
