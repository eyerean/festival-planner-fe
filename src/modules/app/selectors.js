const getAppName = state => state.app.appName;
const getTaasUrl = state => state.app.taasUrl;
const getLocationBeforeTransitions = state => state.routing.locationBeforeTransitions;

export default {
  getAppName,
  getTaasUrl,
  getLocationBeforeTransitions
};
