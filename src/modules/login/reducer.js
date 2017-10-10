import Immutable from 'seamless-immutable';
import {STORE_SESSION, LOGOUT, AUTHENTICATE} from './actionTypes';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: '',
  token: ''
};

const loginReducer = (state = Immutable.from(INITIAL_STATE), action) => {
  switch (action.type) {
    case STORE_SESSION:
      return state
        .set('token', action.payload.token)
        .set('user', action.payload.user);

    case AUTHENTICATE:
      return state.set('isAuthenticated', true);

    case LOGOUT:
      return Immutable.from(INITIAL_STATE);

    default:
      return state;
  }
};

export default loginReducer;
