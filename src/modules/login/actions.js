const login = (username, password) => ({
  type: 'LOGIN',
  payload: {
    username,
    password
  }
});

const storeCredentials = (username) => ({
  type: 'STORE_CREDENTIALS',
  payload: {
    username
  }
});

const logout = () => {
  localStorage.removeItem('token');
  return ({
    type: 'LOGOUT',
    payload: {},
  })
};

export default {
  login,
  storeCredentials,
  logout
}