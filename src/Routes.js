import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './modules/app';
import Login from './modules/login';
import Dashboard from './modules/dashboard';
import Artists from './modules/artists';
import Sound from './modules/sound';
import Visual from './modules/visual';

import {requireAuthentication} from './shared/AuthenticatedComponent';


const Routes = ({history}) => {
  return(
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard}/>
        <Route path="/login" component={Login}/>
        <Route path="/artists" component={requireAuthentication(Artists)}/>
        <Route path="/sound" component={requireAuthentication(Sound)}/>
        <Route path="/visual" component={requireAuthentication(Visual)}/>
      </Route>
    </Router>
  );
};

export default Routes;