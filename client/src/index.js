import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate} from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import ScrollToTop from "./scrollToTop";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

let persistor = persistStore(store)

root.render(
    <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ScrollToTop/>
          <App />
          </PersistGate>
        </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
