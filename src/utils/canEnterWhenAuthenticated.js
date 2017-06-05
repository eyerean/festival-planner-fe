import { DEFAULT_ROUTE } from '../constants';

export default function canEnterWhenAuthenticated(store) {
  return function (nextState, replace, callback) {
    const { session } = store.getState();
    const isAuthenticated = !!session.user;

    if (isAuthenticated) {
      replace({ pathname: DEFAULT_ROUTE });
    }

    callback();
  };
}
