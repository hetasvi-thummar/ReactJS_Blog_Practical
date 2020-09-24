import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Router } from "./utils/router";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer position="top-center" />
    </Provider>
  );
};

export default App;
