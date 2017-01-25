import {LOGIN, STORE_CREDENTIALS, LOGOUT} from './actionTypes';

const login = (username, password) => {
  console.log('login action!', username, password);
  return ({
    type: LOGIN,
    payload: {
      username,
      password
    }
  })
};

const storeCredentials = (username) => ({
  type: STORE_CREDENTIALS,
  payload: {
    username
  }
});

const logout = () => ({
  type: LOGOUT,
  payload: {},
});

export default {
  login,
  storeCredentials,
  logout
}