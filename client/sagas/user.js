import { all, fork, put, call, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILIRE } from '../reducers/user'

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
  yield takeEvery(SIGN_UP_REQUEST, signup)
}

function* userSaga() {
  yield all([fork(watchSignup)])
}

export default userSaga
