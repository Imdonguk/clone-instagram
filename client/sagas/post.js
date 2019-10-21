import { all, fork, takeEvery, put, call } from 'redux-saga/effects'
import axios from 'axios'
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  REMOVE_IMAGE_REQUEST,
  REMOVE_IMAGE_SUCCESS,
  REMOVE_IMAGE_FAILURE,
} from '../reducers/post'

async function addPostApi(data) {
  const result = await axios.post('/post', data, { withCredentials: true })
  const { id, User: user, Images: images, description } = result.data
  const newUser = Object.assign({}, { ...user }, { image: user.Image })
  delete newUser.Image
  return { id, user: newUser, images, description }
}

function* addPost(action) {
  try {
    const result = yield call(addPostApi, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data: result,
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

function* postSaga() {
  yield all([fork(watchRemoveImage), fork(watchUploadImages), fork(watchAddPost)])
}

export default postSaga
