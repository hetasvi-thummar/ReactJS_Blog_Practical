import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Myrouter from "./Myrouter/Myrouter";

const App = () => {
  return (
    <Provider store={store}>
      <Myrouter />
      <ToastContainer hideProgressBar={false} />
    </Provider>
  );
};

export default App;
