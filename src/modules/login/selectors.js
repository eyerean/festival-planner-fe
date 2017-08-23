const isAuthenticated = state => state.login.isAuthenticated;
const getUser = state => state.login.user;

export default {
  isAuthenticated,
  getUser
};
