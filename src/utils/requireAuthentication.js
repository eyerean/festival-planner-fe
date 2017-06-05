import mapFunctions from './mapFunctions';

export default function requireAuthentication(store) {
  return function (nextState, replace, callback) {
    const state = store.getState();

    // console.log('requireAuthentication state', state);
    // console.log('requireAuthentication nextstate', nextState);
    const { session } = state;
    const isAuthenticated = !!session.user;

    if (!isAuthenticated) {
      const redirectTo = nextState.location.pathname;

      replace({
        pathname: '/login',
        query: redirectTo ? { redirectTo } : {},
      });
    } 
    
    callback();
  };
}
