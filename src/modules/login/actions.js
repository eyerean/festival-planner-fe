import {STORE_SESSION, LOGOUT} from './actionTypes';

const storeSession = (token, user) => ({
  type: STORE_SESSION,
  payload: {
    token,
    user
  }
});

const logout = () => ({
  type: LOGOUT,
  payload: {},
});

export default {
  storeSession,
  logout
}