import { useEffect } from "react";
import "./App.css";
import Main from "./components/Main";
import useWebSocket from "./components/redux/actions/config/UseWebSocket";
import { fetchAllIngredients } from "./components/redux/actions/ingredientsActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "./components/redux/actions/ordersActions";
import { fetchAllProducts } from "./components/redux/actions/productActions";
import { fetchAllTables } from "./components/redux/actions/tablesActions";

function App() {
  const token = useSelector((state) => state.main.savedToken);
  const dispatch = useDispatch();
  const { message } = useWebSocket();

  useEffect(() => {
    switch (message.elementToUp) {
      case "INGREDIENT":
        dispatch(fetchAllIngredients(token));
        break;
      case "PRODUCT":
        dispatch(fetchAllProducts(token));
        break;
      case "TABLE":
        dispatch(fetchAllTables(token));
        break;
      case "ORDER":
        dispatch(fetchAllOrders(token));
        break;

      default:
        break;
    }
  }, [message, dispatch, token]);
  return (
    <>
      <Main />
    </>
  );
}

export default App;
