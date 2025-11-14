import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";
import "@ant-design/v5-patch-for-react-19";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { message } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRouter";

import "./index.css";
import "antd/dist/reset.css";

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
