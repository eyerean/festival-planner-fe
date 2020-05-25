import { all, fork } from 'redux-saga/effects';

import { setBearerOnLogin } from './sagas/setBearerOnLogin';

export default function* root() {
  yield all([fork(setBearerOnLogin)]);
}
