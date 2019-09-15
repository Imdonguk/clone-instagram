import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import {
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILIRE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILIRE,
} from '../reducers/user'

function signoutApi() {
  return axios.post(
    '/signout',
    {},
    {
      withCredentials: true,
    },
  )
}

function* signout() {
  try {
    yield call(signoutApi)
    yield put({
      type: SIGN_OUT_SUCCESS,
    })
  } catch (e) {
    yield put({
      type: SIGN_OUT_FAILIRE,
    })
  }
}

function* watchSignout() {
  yield takeLatest(SIGN_OUT_REQUEST, signout)
}

function loadUserApi() {
  return axios.get('/user', { withCredentials: true })
}

function* loadUser() {
  try {
    const result = yield call(loadUserApi)
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILIRE,
    })
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser)
}

function* userSaga() {
  yield all([fork(watchSignout), fork(watchLoadUser)])
}

export default userSaga
