import { combineReducers } from 'redux';
import { reducer as fetchReducer } from 'react-redux-fetch';

import appReducer from './modules/app/reducer';
import loginReducer from './modules/login/reducer';
import festivalReducer from './modules/dashboard/reducer';

export default combineReducers({
  app: appReducer,
  festival: festivalReducer,
  login: loginReducer,
  repository: fetchReducer,
});
