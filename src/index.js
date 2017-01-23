import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { hashHistory } from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import store from './store';
import Routes from './Routes';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('root')
);
