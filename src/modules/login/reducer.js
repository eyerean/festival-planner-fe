import Immutable from 'seamless-immutable';
import {LOGIN, STORE_CREDENTIALS, LOGOUT} from './actionTypes';

const credentials = {
  username: 'omg',
  password: '123'
}

const INITIAL_STATE = {
  isAuthenticated: false,
  username: ''
};

const loginReducer = (state = Immutable.from(INITIAL_STATE), action) => {
  switch (action.type) {
    case LOGIN: 
      return (action.payload.username === credentials.username 
        && action.payload.password === credentials.password) ? 
          state.set('isAuthenticated', true) : state;
          
    case STORE_CREDENTIALS:
      return state
        .set('username', action.payload.username);

    case LOGOUT:
      // window.location.assign('/');
      return Immutable.from(INITIAL_STATE);

    default:
      return state;
  }
};

export default loginReducer;
