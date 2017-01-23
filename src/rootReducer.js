import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as fetchReducer} from 'react-redux-fetch';
import {reducer as formReducer} from 'redux-form';


import loginReducer from './modules/login/reducer';
import appReducer from './modules/app/reducer';

export default combineReducers({
  routing: routerReducer,
  app: appReducer,
  login: loginReducer,
  repository: fetchReducer,
  form: formReducer
});
