import { createStore, compose, applyMiddleware } from 'redux';
import { middleware as fetchMiddleware } from 'react-redux-fetch';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [fetchMiddleware, sagaMiddleware];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f // add support for Redux dev tools
    //TODO: place only in dev environment
  )
);

sagaMiddleware.run(rootSaga);

export default store;
