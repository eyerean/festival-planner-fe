import Immutable from 'seamless-immutable';

const INITIAL_STATE = {
  appName: 'Festival Planner'
};

const appReducer = (state = Immutable.from(INITIAL_STATE), action) => {
  switch (action.type) {
    // case 'STORE_TAAS_URL':
      // return state
        // .set('taasUrl', action.payload.taasUrl);
    default:
      return state;
  }
};

export default appReducer;
