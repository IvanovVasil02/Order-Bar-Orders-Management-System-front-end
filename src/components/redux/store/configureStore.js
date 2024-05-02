// eslint-disable-next-line no-unused-vars
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import mainReducer from "../reducers/mainReducer";
import ingredientsReducer from "../reducers/ingredientsReducer";
import productsReducer from "../reducers/productsReducer";
import tablesReducer from "../reducers/tablesReducer";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "my-su2344per-sec234324ret-k423423ey",
    }),
  ],
};

const rootReducer = combineReducers({
  main: mainReducer,
  ingredients: ingredientsReducer,
  products: productsReducer,
  tables: tablesReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
