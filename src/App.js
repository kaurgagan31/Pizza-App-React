import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Auth from './components/Auth/Auth';
import Error from './pages/error/Error';
import PrivateRoute  from './components/PrivateRoute/PrivateRoute';
import PublicRoute  from './components/PublicRoute/PublicRoute';

const App = props => {

  return (
    <Switch>
    <Route exact path="/" render={() => <Redirect to="/app/home" />} />
    <Route
      exact
      path="/app"
      render={() => <Redirect to="/app/home" />}
    />
    <PrivateRoute path="/app" component={Layout} />
    <PublicRoute path="/auth" component={Auth} />
    <Route component={Error} />
  </Switch>
  )
};

export default App;
