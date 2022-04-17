import React, { FC } from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import styles from "./App.module.css";

import Header from "./features/core/Header";
import Core from "./features/core/Core";
import Favorite from "./features/core/Favorite";
import UserAccount from "./features/auth/UserAccount";
import PostDetail from "./features/core/PostDetail";

const App: FC = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Core />
          </Route>
          <Route exact path="/favorite">
            <Favorite />
          </Route>
          <Route exact path="/user/:id">
            <UserAccount />
          </Route>
          <Route exact path="/post/:id">
            <PostDetail />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;