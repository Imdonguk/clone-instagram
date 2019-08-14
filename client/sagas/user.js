import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILIRE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILIRE,
} from '../reducers/user'

function signupApi(data) {
  // api요청
  return axios.post('http://localhost:3065/api/user/signup', data, {
    withCredentials: true,
  })
}

function* signup(action) {
  try {
    yield call(signupApi, action.data)
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    })
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILIRE,
    })
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup)
}

function signinApi(data) {
  return axios.post('http://localhost:3065/api/user/signin', data, {
    withCredentials: true,
  })
}

function* signin(action) {
  try {
    const result = yield call(signinApi, action.data)
    yield put({
      type: SIGN_IN_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: SIGN_IN_FAILIRE,
    })
  }
}

function* watchSignin() {
  yield takeLatest(SIGN_IN_REQUEST, signin)
}

function* userSaga() {
  yield all([fork(watchSignup), fork(watchSignin)])
}

export default userSaga
