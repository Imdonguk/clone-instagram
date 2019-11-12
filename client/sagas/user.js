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
  LOAD_OTHER_USER_REQUEST,
  LOAD_OTHER_USER_SUCCESS,
  LOAD_OTHER_USER_FAILURE,
  UPLOAD_PROFILE_IMAGE_REQUEST,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAILURE,
} from '../reducers/user'

import { CLOSE_POP_OVER } from '../reducers/popover'

function uploadProfileImageApi(data) {
  return axios.post('/user/image', data, { withCredentials: true })
}

function* uploadProfileImage(action) {
  try {
    const result = yield call(uploadProfileImageApi, action.data)
    yield put({
      type: UPLOAD_PROFILE_IMAGE_SUCCESS,
      data: result.data,
    })
    yield put({ type: CLOSE_POP_OVER })
  } catch (e) {
    yield put({
      type: UPLOAD_PROFILE_IMAGE_FAILURE,
    })
  }
}

function* watchUpdataProfileImage() {
  yield takeLatest(UPLOAD_PROFILE_IMAGE_REQUEST, uploadProfileImage)
}

function loadUserApi() {
  return axios.get('/user', { withCredentials: true })
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
    yield put({
      type: LOAD_USER_FAILURE,
    })
    yield action.data.reject(e)
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

function loadOtherUserApi(userName) {
  return axios.get(`/user/${userName}`)
}

function* loadOtherUser(action) {
  try {
    const userName = action.data
    const result = yield call(loadOtherUserApi, userName)
    yield put({
      type: LOAD_OTHER_USER_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: LOAD_OTHER_USER_FAILURE,
    })
  }
}

function* watchLoadOtherUser() {
  yield takeLatest(LOAD_OTHER_USER_REQUEST, loadOtherUser)
}

function signoutApi() {
  return axios.post('/user/signout', {}, { withCredentials: true })
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
  yield all([fork(watchLoadUser), fork(watchSignout), fork(watchLoadOtherUser), fork(watchUpdataProfileImage)])
}

export default userSaga
