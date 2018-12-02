import { STORE_LAST_LOCATION } from './actionTypes';

const storeLastLocation = location => ({
  type: STORE_LAST_LOCATION,
  payload: location,
});

export default {
  storeLastLocation,
};
