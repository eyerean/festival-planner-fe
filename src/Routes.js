import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Store from './store';

import App from './modules/app';
import Dashboard from './modules/dashboard';
import Login from './modules/login';

import requireAuthentication from './utils/requireAuthentication';

const authenticationRequired = requireAuthentication(Store.store);

const Routes = ({history}) => {
  return(
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="/login" component={Login} onEnter={authenticationRequired}/>
      </Route>
    </Router>
  );
};

export default Routes;