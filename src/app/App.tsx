import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Destruction from './pages/Destruction/Destruction';
import Password from './pages/Passwords/Passwords';
import Add from './pages/Add/Add';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/selfdestruction">
          <Destruction />
        </Route>
        <Route path="/add">
          <Add />
        </Route>
        <Route path="/passwords/:service">
          <Password />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
