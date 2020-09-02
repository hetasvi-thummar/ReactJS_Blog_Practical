import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "../Views/Register";
import Login from "../Views/Login";
import Home from "../Views/Home";

const Myrouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" component={Home} /> */}
        <Route path="/register" component={Register} />
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Myrouter;
