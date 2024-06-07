import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { persistor, store } from "./components/redux/store/configureStore.js";

import { PersistGate } from "redux-persist/integration/react";
import { ActiveFormProvider } from "./contexts/ActiveFormContext.jsx";
import { CategoriesProvider } from "./contexts/CategoriesContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ActiveFormProvider>
        <CategoriesProvider>
          <App />
        </CategoriesProvider>
      </ActiveFormProvider>
    </PersistGate>
  </Provider>
);
