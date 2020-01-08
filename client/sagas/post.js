import { all, fork, takeEvery, takeLatest, put, call, throttle } from 'redux-saga/effects'
import axios from 'axios'
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
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
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
} from '../reducers/post'

import { LOAD_LIKERS_REQUEST, LOAD_LIKERS_SUCCESS, LOAD_LIKERS_FAILURE } from '../reducers/user'

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

function removePostApi({ postId, images }) {
  return axios.delete(`/post/${postId}`, { withCredentials: true, data: { images } })
}

function* removePost(action) {
  try {
    const result = yield call(removePostApi, { postId: action.postId, images: action.data })
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: REMOVE_POST_FAILURE,
    })
  }
}

function* watchRemovePost() {
  yield takeEvery(REMOVE_POST_REQUEST, removePost)
}

function updatePostApi({ data, postId }) {
  return axios.patch(`/post/${postId}`, data, { withCredentials: true })
}

function* updatePost(action) {
  try {
    const result = yield call(updatePostApi, { postId: action.postId, data: action.data })
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    yield put({
      type: UPDATE_POST_FAILURE,
    })
  }
}

function* watchUpdatePost() {
  yield takeEvery(UPDATE_POST_REQUEST, updatePost)
}

function loadPostsApi(lastId = 0) {
  return axios.get(`/posts?lastId=${lastId}`, { withCredentials: true })
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsApi, action.lastId)
    const { posts, hasMorePost } = result.data
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: posts,
      hasMorePost,
    })
  } catch (e) {
    yield put({
      type: LOAD_POSTS_FAILURE,
    })
  }
}

function* watchLoadPosts() {
  yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts)
}

function loadPostApi(postId) {
  return axios.get(`/post/${postId}`)
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostApi, action.postId)
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    })
    yield action.promise && action.promise.resolve()
  } catch (e) {
    yield action.promise && action.promise.reject(e)
    yield put({
      type: LOAD_POST_FAILURE,
    })
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost)
}

function loadUserPostsApi({ userName, lastId }) {
  return axios.get(`/user/${encodeURI(userName)}/posts?lastId=${lastId}`)
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsApi, { ...action.data, lastId: action.lastId })
    const { posts, hasMorePost } = result.data
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: posts,
      hasMorePost,
    })
  } catch (e) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
    })
  }
}

function* watchLoadUserPosts() {
  yield throttle(2000, LOAD_USER_POSTS_REQUEST, loadUserPosts)
}

function loadHashtagPostsApi({ tag, lastId = 0 }) {
  return axios.get(`/hashtag/${encodeURI(tag)}?lastId=${lastId}`)
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsApi, { ...action.data, lastId: action.lastId })
    const { posts, hasMorePost } = result.data
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: posts,
      hasMorePost,
    })
  } catch (e) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
    })
  }
}

function* watchLoadHashtagPosts() {
  yield throttle(2000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts)
}

function loadCommentsApi({ postId, lastId = 0 }) {
  return axios.get(`/post/${postId}/comments?lastId=${lastId}`)
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsApi, { postId: action.postId, lastId: action.lastId })
    const { comments, hasMoreComment } = result.data
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: comments,
      hasMoreComment,
    })
    if (action.promise) yield action.promise.resolve()
  } catch (e) {
    yield put({
      type: LOAD_COMMENTS_FAILURE,
    })
  }
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments)
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
  return axios.delete(`post/images`, { withCredentials: true, data: { images: [].concat(data) } })
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

function loadFollowingsApi({ postId, lastId = 0 }) {
  return axios.get(`/post/${postId}/likers?lastId=${lastId}`, { withCredentials: true })
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsApi, { postId: action.data, lastId: action.lastId })
    const { userList, hasMoreUser } = result.data
    yield put({
      type: LOAD_LIKERS_SUCCESS,
      data: userList,
      hasMoreUser,
    })
  } catch (e) {
    yield put({
      type: LOAD_LIKERS_FAILURE,
      data: e,
    })
  }
}

function* watchloadFollowings() {
  yield takeLatest(LOAD_LIKERS_REQUEST, loadFollowings)
}

function* postSaga() {
  yield all([
    fork(watchRemoveImage),
    fork(watchUploadImages),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchUpdatePost),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddComment),
    fork(watchLoadPosts),
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadPost),
    fork(watchLoadComments),
    fork(watchloadFollowings),
  ])
}

export default postSaga
