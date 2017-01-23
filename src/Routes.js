import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './modules/app';
import Dashboard from './modules/dashboard';
import Login from './modules/login';


const Routes = ({history}) => {
  return(
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  );
};

export default Routes;