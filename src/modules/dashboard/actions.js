import {GET_FESTIVALS} from './actionTypes';

const getFestivals = (token, user) => ({
  type: GET_FESTIVALS,
  payload: {}
});

export default {
  getFestivals,
}
