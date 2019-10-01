import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import Router from 'next/router'
import {
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../reducers/user'

function loadUserApi() {
  return axios.post('/user', {}, { withCredentials: true })
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserApi)
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    })
    yield action.data.resolve('success')
  } catch (e) {
    yield action.data.reject(e)
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

function signoutApi() {
  return axios.post('/signout', {}, { withCredentials: true })
}

function* signout() {
  try {
    yield call(signoutApi)
    yield put({
      type: SIGN_OUT_SUCCESS,
    })
    yield Router.push('/signin')
  } catch (e) {
    yield put({
      type: SIGN_OUT_FAILURE,
    })
  }
}

function* watchSignout() {
  yield takeEvery(SIGN_OUT_REQUEST, signout)
}

function* userSaga() {
  yield all([fork(watchLoadUser), fork(watchSignout)])
}

export default userSaga
