const apiRoutes = () => ({
  login: () => `/api/login`,
  authenticate: (token) => `/api/?token=${token}`,
  festivals: () => `/api/festivals`,
});

export default apiRoutes;
