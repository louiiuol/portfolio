import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Header} from './components/shared';
import { Routes } from './components/Routes';

export const App = () =>
  (<Router basename="/louiiuol">
    <main id="app">
      <Header />
      <Switch>
        {Object.values(Routes).map(({ component, url, exact, name }) =>
          <Route key={`${name}-link`} exact={exact} path={url} component={component}></Route> )}
      </Switch>
    </main>
  </Router>);
