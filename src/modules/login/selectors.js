const isAuthenticated = state => state.login.isAuthenticated;
const getUsername = state => state.login.username;

export default {
  isAuthenticated,
  getUsername
};
