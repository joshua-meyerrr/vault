import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Destruction from './pages/Destruction/Destruction';
import Password from './pages/Passwords/Passwords';
import Add from './pages/Add/Add';
import Search from './pages/Search/Search';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/selfdestruction">
          <Destruction />
        </Route>
        <Route path="/credential/add">
          <Add />
        </Route>
        <Route path="/passwords/:service">
          <Password />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
