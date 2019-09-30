import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import Router from 'next/router'
import {
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILIRE,
} from '../reducers/user'

}

  try {
    yield put({
    })
  } catch (e) {
    yield put({
    })
  }
}

}

function loadUserApi() {
  return axios.get('/user', { withCredentials: true })
function signoutApi() {
  return axios.post('/signout', {}, { withCredentials: true })
}

function* loadUser() {
function* signout() {
  try {
    const result = yield call(loadUserApi)
    yield call(signoutApi)
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      type: SIGN_OUT_SUCCESS,
    })
    yield Router.push('/signin')
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILIRE,
      type: SIGN_OUT_FAILURE,
    })
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser)
function* watchSignout() {
  yield takeEvery(SIGN_OUT_REQUEST, signout)
}

function* userSaga() {
  yield all([fork(watchSignout), fork(watchLoadUser)])
}

export default userSaga
