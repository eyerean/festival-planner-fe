/* eslint-disable */

import { takeEvery } from 'redux-saga/effects';
import { container, FETCH } from 'react-redux-fetch';

function watchLogin({ key, value }) {
  console.log('SAGA watchLogin!!', key, value);
  console.log('SAGA watchLogin locastorage', localStorage.getItem('token'));
  if (value && value.user !== "") {
  console.log('SAGA IF!!');
    container.registerRequestHeader('x-access-token', localStorage.getItem('token'));
  }
}

//currently not used, keep for future references
export function* setBearerOnLogin() {
  // yield takeEvery(FETCH.for('post').FULFILL, watchLogin);
  // yield takeEvery(FETCH.for('get').REQUEST, watchLogin);
}
