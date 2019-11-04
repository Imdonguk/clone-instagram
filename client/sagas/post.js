import { all, fork, takeEvery, put, call } from 'redux-saga/effects'
import axios from 'axios'
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  REMOVE_IMAGE_REQUEST,
  REMOVE_IMAGE_SUCCESS,
  REMOVE_IMAGE_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post'

function addPostApi(data) {
  return axios.post('/post', data, { withCredentials: true })
}

function* addPost(action) {
  try {
    const result = yield call(addPostApi, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data: Object.assign({}, result.data),
    })
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
    })
  }
}

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost)
}

function loadPostsApi() {
  return axios.get('/posts', { withCredentials: true })
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsApi, '')
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: LOAD_POSTS_FAILURE,
    })
  }
}

function* watchLoadPosts() {
  yield takeEvery(LOAD_POSTS_REQUEST, loadPosts)
}

function uploadImagesApi(data) {
  return axios.post('/post/images', data, {
    withCredentials: true,
  })
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesApi, action.data)
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
    })
  }
}

function* watchUploadImages() {
  yield takeEvery(UPLOAD_IMAGES_REQUEST, uploadImages)
}

function removeImageApi(data) {
  if (Array.isArray(data))
    return axios.delete('post/images', {
      withCredentials: true,
      data: { images: data },
    })
  return axios.delete(`post/image/${data}`, { withCredentials: true })
}

function* removeImage(action) {
  try {
    const result = yield call(removeImageApi, action.data)
    yield put({
      type: REMOVE_IMAGE_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: REMOVE_IMAGE_FAILURE,
    })
  }
}

function* watchRemoveImage() {
  yield takeEvery(REMOVE_IMAGE_REQUEST, removeImage)
}

function likePostApi(postId) {
  return axios.post(`/post/${postId}/like`, {}, { withCredentials: true })
}

function* likePost(action) {
  try {
    const result = yield call(likePostApi, action.data)
    yield put({
      type: LIKE_POST_SUCCESS,
      data: { postId: action.data, userId: result.data.userId },
    })
  } catch (e) {
    yield put({
      type: LIKE_POST_FAILURE,
    })
  }
}

function* watchLikePost() {
  yield takeEvery(LIKE_POST_REQUEST, likePost)
}

function unlikePostApi(postId) {
  return axios.delete(`/post/${postId}/like`, { withCredentials: true })
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostApi, action.data)
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: { postId: action.data, userId: result.data.userId },
    })
  } catch (e) {
    yield put({
      type: UNLIKE_POST_FAILURE,
    })
  }
}

function* watchUnlikePost() {
  yield takeEvery(UNLIKE_POST_REQUEST, unlikePost)
}

function addCommentApi({ postId, content }) {
  return axios.post(`/post/${postId}/comment`, { content }, { withCredentials: true })
}

function* addComment(action) {
  try {
    const result = yield call(addCommentApi, action.data)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      postId: action.data.postId,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
    })
  }
}

function* watchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment)
}

function* postSaga() {
  yield all([
    fork(watchRemoveImage),
    fork(watchUploadImages),
    fork(watchAddPost),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddComment),
    fork(watchLoadPosts),
  ])
}

export default postSaga
