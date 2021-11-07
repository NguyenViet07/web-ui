import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../src/styles/extra.css";
import "../src/styles/font.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ClientContextProvider } from "react-fetching-library";
import { ToastContainer } from "react-toastify";
import { Client } from "./api/Client";
// ** React Toastify
import "react-toastify/dist/ReactToastify.css";

import { store } from './redux/store'
import {Provider} from "react-redux";


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ClientContextProvider client={Client}>
              <div className="ongtt-cs">
                  <App />
              </div>
              <ToastContainer newestOnTop />
          </ClientContextProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
