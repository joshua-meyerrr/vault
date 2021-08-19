import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Destruction from './pages/Destruction/Destruction';
import Password from './pages/Passwords/Passwords';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/selfdestruction">
          <Destruction />
        </Route>
        <Route path="/passwords/:service">
          <Password />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
