const apiRoutes = () => ({
  login: () => `/api/login`,
  authenticate: token => `/api/?token=${token}`,
  festivals: () => `/api/festivals`,
  festival: id => `/api/festivals/${id}`,
});

export default apiRoutes;
