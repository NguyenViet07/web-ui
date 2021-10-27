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

ReactDOM.render(
  <React.StrictMode>
    <ClientContextProvider client={Client}>
      <App />
      <ToastContainer newestOnTop />
    </ClientContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
