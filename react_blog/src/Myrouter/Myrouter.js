import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "../Views/Register";
import Login from "../Views/Login";
import Home from "../Views/Home";
import Singlepost from "../Views/Singlepost";
import { Tags, Categories } from "../Components";

const Myrouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin/categories" component={Categories} />
        <Route path="/admin/tags" component={Tags} />
        <Route path="/user/:id" component={Singlepost} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Myrouter;
