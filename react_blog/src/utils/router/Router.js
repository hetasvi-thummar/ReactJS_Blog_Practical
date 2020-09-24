import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "../../containers/auth/Register";
import Login from "../../containers/auth/Login";
import AllPosts from "../../containers/posts/AllPosts";
import Singlepost from "../../containers/posts/SinglePost";
import AllCategories from "../../containers/categories/AllCategories";
import AllTags from "../../containers/tags/AllTags";
import Categories from "../../containers/categories/Categories";
import Tags from "../../containers/tags/Tags";
import Posts from "../../containers/posts/Posts";
import { PrivateRouter } from "../../components";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/tags" component={AllTags} />
        <Route path="/categories" component={AllCategories} exact />
        <PrivateRouter path="/admin/posts" component={Posts} exact />
        <PrivateRouter path="/admin/categories" component={Categories} exact />
        <PrivateRouter path="/admin/tags" component={Tags} />
        <Route path="/:slug/:id" component={Singlepost} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={AllPosts} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
