import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
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
  REMOVE_PROFILE_IMAGE_REQUEST,
  REMOVE_PROFILE_IMAGE_SUCCESS,
  REMOVE_PROFILE_IMAGE_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  SAVE_OTHER_POST_REQUEST,
  SAVE_OTHER_POST_SUCCESS,
  SAVE_OTHER_POST_FAILURE,
  REMOVE_SAVED_POST_REQUEST,
  REMOVE_SAVED_POST_SUCCESS,
  REMOVE_SAVED_POST_FAILURE,
} from '../reducers/user'

import { UPDATE_MY_POSTS_PROFILE_IMAGE } from '../reducers/post'

import { CLOSE_POP_OVER } from '../reducers/popover'

function uploadProfileImageApi(data) {
  return axios.post('/user/image', data, { withCredentials: true })
}

function* uploadProfileImage(action) {
  try {
    const { userName, data } = action
    const result = yield call(uploadProfileImageApi, data)
    yield put({
      type: UPLOAD_PROFILE_IMAGE_SUCCESS,
      data: result.data,
    })
    yield put({ type: CLOSE_POP_OVER })
    yield put({
      type: UPDATE_MY_POSTS_PROFILE_IMAGE,
      data: result.data,
      userName,
    })
  } catch (e) {
    yield put({
      type: UPLOAD_PROFILE_IMAGE_FAILURE,
    })
  }
}

function* watchUploadProfileImage() {
  yield takeLatest(UPLOAD_PROFILE_IMAGE_REQUEST, uploadProfileImage)
}

function removeProfileImageApi(data) {
  return axios.delete(`/user/image/${data}`, { withCredentials: true })
}

function* removeProfileImage(action) {
  try {
    const { userName, data } = action
    const result = yield call(removeProfileImageApi, data)
    yield put({
      type: REMOVE_PROFILE_IMAGE_SUCCESS,
      data: result.data,
    })
    yield put({ type: CLOSE_POP_OVER })
    yield put({
      type: UPDATE_MY_POSTS_PROFILE_IMAGE,
      data: result.data,
      userName,
    })
  } catch (e) {
    yield put({
      type: REMOVE_PROFILE_IMAGE_FAILURE,
    })
  }
}

function* watchRemoveProfileImage() {
  yield takeLatest(REMOVE_PROFILE_IMAGE_REQUEST, removeProfileImage)
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
    yield action.promise.resolve('success')
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILURE,
    })
    yield action.promise.reject(e)
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
    yield put({
      type: CLOSE_POP_OVER,
    })
  } catch (e) {
    yield put({
      type: SIGN_OUT_FAILURE,
    })
  }
}

function* watchSignout() {
  yield takeEvery(SIGN_OUT_REQUEST, signout)
}

function followUserApi(userId) {
  return axios.post(`/user/${userId}/follow`, {}, { withCredentials: true })
}

function* followUser(action) {
  try {
    const result = yield call(followUserApi, action.data)
    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: FOLLOW_USER_FAILURE,
      data: e,
    })
  }
}

function* watchFollowUser() {
  yield takeEvery(FOLLOW_USER_REQUEST, followUser)
}

function unFollowUserApi(userId) {
  return axios.delete(`/user/${userId}/follow`, { withCredentials: true })
}

function* unFollowUser(action) {
  try {
    const result = yield call(unFollowUserApi, action.data)
    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    })
    yield put({
      type: CLOSE_POP_OVER,
    })
  } catch (e) {
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      data: e,
    })
  }
}

function* watchUnFollowUser() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unFollowUser)
}

function saveOtherPostApi(postId) {
  return axios.post(`/user/save/${postId}`, {}, { withCredentials: true })
}

function* saveOtherPost(action) {
  try {
    const result = yield call(saveOtherPostApi, action.data)
    yield put({
      type: SAVE_OTHER_POST_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: SAVE_OTHER_POST_FAILURE,
      data: e,
    })
  }
}

function* watchSaveOtherPost() {
  yield takeEvery(SAVE_OTHER_POST_REQUEST, saveOtherPost)
}

function removeSavedPostApi(postId) {
  return axios.delete(`/user/save/${postId}`, { withCredentials: true })
}

function* removeSavedPost(action) {
  try {
    const result = yield call(removeSavedPostApi, action.data)
    yield put({
      type: REMOVE_SAVED_POST_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: REMOVE_SAVED_POST_FAILURE,
      data: e,
    })
  }
}

function* watchRemoveSavedPost() {
  yield takeEvery(REMOVE_SAVED_POST_REQUEST, removeSavedPost)
}

function* userSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchSignout),
    fork(watchLoadOtherUser),
    fork(watchUploadProfileImage),
    fork(watchRemoveProfileImage),
    fork(watchFollowUser),
    fork(watchUnFollowUser),
    fork(watchSaveOtherPost),
    fork(watchRemoveSavedPost),
  ])
}

export default userSaga
