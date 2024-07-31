import { jwtDecode } from "jwt-decode";
import { APIBASE } from "./config/apiConfig";

export const SAVED_TOKEN = "SAVED_TOKEN";
export const LOGOUT = "LOGOUT";

export const fetchRegister = (name, surname, email, password, phone, address) => {
  return async () => {
    const response = await fetch(APIBASE + "/authentication/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        surname,
        email,
        password,
        phone,
        address,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const resp = await response.json();
      throw resp;
    } else {
      return "Registrazione effettuata con successo!";
    }
  };
};

export const fetchLogin = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(APIBASE + "/authentication/login", {
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
      return "Login effettuato con successo!";
    } else if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
  };
};

export const logout = () => (dispatch) =>
  dispatch({
    type: LOGOUT,
  });
