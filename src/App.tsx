import React, { FC } from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import styles from "./App.module.css";

import Header from "./features/core/Header";
import Core from "./features/core/Core";
import Favorite from "./features/core/Favorite";

const App: FC = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Core />
          </Route>
          <Route exact path="/Favorite">
            <Favorite />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;