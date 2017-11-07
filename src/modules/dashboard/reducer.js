import Immutable from 'seamless-immutable';
import {GET_FESTIVALS} from './actionTypes';

const INITIAL_STATE = {
  festivals: []
};

const festivalReducer = (state = Immutable.from(INITIAL_STATE), action) => {
  switch (action.type) {
    case GET_FESTIVALS:
      return state
        .set('festivals', action.payload.festivals);
    default:
      return state;
  }
};

export default festivalReducer;
