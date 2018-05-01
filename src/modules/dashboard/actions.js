import {STORE_FESTIVALS} from './actionTypes';

const storeFestivals = (festivals) => ({
  type: STORE_FESTIVALS,
  payload: festivals
});

export default {
  storeFestivals,
}
