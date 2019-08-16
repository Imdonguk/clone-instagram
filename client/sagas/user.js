import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILIRE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILIRE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILIRE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILIRE,
} from '../reducers/user'

function signupApi(data) {
  // api요청
  return axios.post('/user/signup', data, {
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
  return axios.post('/user/signin', data, {
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

function signoutApi() {
  return axios.get('/user/signout')
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
  return axios.get('/user')
}

function* loadUser() {
  try {
    yield call(loadUserApi)
    yield put({
      type: LOAD_USER_SUCCESS,
    })
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILIRE,
    })
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

function* userSaga() {
  yield all([fork(watchSignup), fork(watchSignin), fork(watchSignout), fork(watchLoadUser)])
}

export default userSaga
