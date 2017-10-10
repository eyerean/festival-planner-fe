const apiRoutes = () => ({
  login: () => `/api/login`,
  authenticate: (token) => `/api/?token=${token}`
});

export default apiRoutes;
