import Immutable from 'seamless-immutable';
import { STORE_LAST_LOCATION } from './actionTypes';

const INITIAL_STATE = {
  appName: 'Festival Planner',
  locationBeforeTransitions: '',
};

const appReducer = (state = Immutable.from(INITIAL_STATE), action) => {
  switch (action.type) {
    case STORE_LAST_LOCATION:
      return state.set('locationBeforeTransitions', action.payload);
    default:
      return state;
  }
};

export default appReducer;
