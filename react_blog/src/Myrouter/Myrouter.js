import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "../Views/Register";
import Login from "../Views/Login";
import Home from "../Views/Home";
import Singlepost from "../Views/Singlepost";
import { Tags, Categories, Posts, Allcategories, Alltags } from "../Components";
import Privaterouter from "../Components/Privaterouter";

const Myrouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/tags" component={Alltags} />
        <Route path="/categories" component={Allcategories} />
        <Privaterouter path="/admin/posts" component={Posts} />
        <Privaterouter path="/admin/categories" component={Categories} />
        <Privaterouter path="/admin/tags" component={Tags} />
        <Route path="/:slug/:id" component={Singlepost} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Myrouter;
