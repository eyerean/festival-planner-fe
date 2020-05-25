import Immutable from 'seamless-immutable';
import { STORE_FESTIVALS } from './actionTypes';

const INITIAL_STATE = {
  festivals: [],
};

const festivalReducer = (state = Immutable.from(INITIAL_STATE), action) => {
  switch (action.type) {
    case STORE_FESTIVALS:
      return state.set('festivals', action.payload);
    default:
      return state;
  }
};

export default festivalReducer;
