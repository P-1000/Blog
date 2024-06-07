import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { AuthContextProvider } from "./context/userContext.jsx";
import { ModalProvider } from "./context/modalContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthContextProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </Provider>
);
