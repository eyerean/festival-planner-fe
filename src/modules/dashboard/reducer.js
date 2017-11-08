import Immutable from 'seamless-immutable';
import {STORE_FESTIVALS} from './actionTypes';

const INITIAL_STATE = {
  festivals: []
};

const festivalReducer = (state = Immutable.from(INITIAL_STATE), action) => {
  switch (action.type) {
    case STORE_FESTIVALS:
      const festivalsById = action.payload.festivals.map(fest => ({
          [fest._id]: fest,
      }));
      return state
        .set('festivals', ...festivalsById);
    default:
      return state;
  }
};

export default festivalReducer;
