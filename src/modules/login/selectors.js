const isAuthenticated = state => state.login.isAuthenticated;
const getUser = state => state.login.user;
const getToken = state => state.login.token;

export default {
  isAuthenticated,
  getUser,
  getToken
};
