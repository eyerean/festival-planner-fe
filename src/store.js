import {createStore, compose, applyMiddleware} from 'redux';
import {middleware as fetchMiddleware} from 'react-redux-fetch';
import rootReducer from './rootReducer';

const middleware = applyMiddleware(fetchMiddleware);

const store = createStore(rootReducer, 
  compose(
    middleware,
    window.devToolsExtension ?
      window.devToolsExtension() : f => f, // add support for Redux dev tools
      //TODO: place only in dev environment
  ),
);

export default store;
