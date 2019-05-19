const apiRoutes = () => ({
  login: () => `/api/login`,
  authenticate: token => `/api/?token=${token}`,
  festivals: () => `/api/festivals`,
  festivalDetails: id => `/api/festivals/${id}`,
});

export default apiRoutes;
