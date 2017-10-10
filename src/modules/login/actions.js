import {STORE_SESSION, LOGOUT, AUTHENTICATE} from './actionTypes';

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

const authenticate = () => ({
  type: AUTHENTICATE,
  payload: {}
})

export default {
  storeSession,
  logout,
  authenticate
}