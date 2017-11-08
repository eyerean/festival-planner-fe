/* eslint-disable */
import { takeEvery } from 'redux-saga/effects';
import { container, FETCH } from 'react-redux-fetch';

function watchRequest(props) {
  if(props.resource.name !== 'login' && localStorage.getItem('token')){
    container.registerRequestHeader('x-access-token', localStorage.getItem('token'));
  }
}

export function* setBearerOnLogin() {
  yield takeEvery(FETCH.for('get').REQUEST, watchRequest);
  yield takeEvery(FETCH.for('post').REQUEST, watchRequest);
}
