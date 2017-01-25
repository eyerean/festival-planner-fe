import Immutable from 'seamless-immutable';

const INITIAL_STATE = {
  appName: 'Festival Planner'
};

const appReducer = (state = Immutable.from(INITIAL_STATE), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default appReducer;
