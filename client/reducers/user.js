import produce from 'immer'

const initialState = {
  me: {},
  userInfo: {},
  isLoddingOwner: false,
  isUploadingProfileImage: false,
}

export const SIGN_IN = 'SIGN_IN'

export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'

export const LOAD_OTHER_USER_REQUEST = 'LOAD_OTHER_USER_REQUEST'
export const LOAD_OTHER_USER_SUCCESS = 'LOAD_OTHER_USER_SUCCESS'
export const LOAD_OTHER_USER_FAILURE = 'LOAD_OTHER_USER_FAILURE'

export const UPLOAD_PROFILE_IMAGE_REQUEST = 'UPLOAD_PROFILE_IMAGE_REQUEST'
export const UPLOAD_PROFILE_IMAGE_SUCCESS = 'UPLOAD_PROFILE_IMAGE_SUCCESS'
export const UPLOAD_PROFILE_IMAGE_FAILURE = 'UPLOAD_PROFILE_IMAGE_FAILURE'

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_IN: {
        break
      }
      case SIGN_OUT_REQUEST: {
        break
      }
      case SIGN_OUT_SUCCESS: {
        draft.me = {}
        break
      }
      case SIGN_OUT_FAILURE: {
        break
      }
      case LOAD_USER_REQUEST: {
        break
      }
      case LOAD_USER_SUCCESS: {
        draft.me = action.data
        break
      }
      case LOAD_USER_FAILURE: {
        break
      }
      case LOAD_OTHER_USER_REQUEST: {
        draft.isLoddingOwner = true
        break
      }
      case LOAD_OTHER_USER_SUCCESS: {
        draft.userInfo = action.data
        draft.isLoddingOwner = false
        break
      }
      case LOAD_OTHER_USER_FAILURE: {
        break
      }
      case UPLOAD_PROFILE_IMAGE_REQUEST: {
        draft.isUploadingProfileImage = true
        break
      }
      case UPLOAD_PROFILE_IMAGE_SUCCESS: {
        draft.isUploadingProfileImage = false
        draft.me.image.src = action.data
        draft.userInfo.image.src = action.data
        break
      }
      case UPLOAD_PROFILE_IMAGE_FAILURE: {
        break
      }
      default: {
        break
      }
    }
  })
}
