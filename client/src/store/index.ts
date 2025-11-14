// store/index.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducer/userSlice";
import storage from "redux-persist/lib/storage"; // 使用 localStorage
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
      },
    }),
});

export const persistor = persistStore(store);
