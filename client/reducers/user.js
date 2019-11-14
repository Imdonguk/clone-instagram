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

export const REMOVE_PROFILE_IMAGE_REQUEST = 'REMOVE_PROFILE_IMAGE_REQUEST'
export const REMOVE_PROFILE_IMAGE_SUCCESS = 'REMOVE_PROFILE_IMAGE_SUCCESS'
export const REMOVE_PROFILE_IMAGE_FAILURE = 'REMOVE_PROFILE_IMAGE_FAILURE'

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST'
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS'
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE'

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST'
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS'
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE'

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
      case UPLOAD_PROFILE_IMAGE_REQUEST:
      case REMOVE_PROFILE_IMAGE_REQUEST: {
        draft.isUploadingProfileImage = true
        break
      }
      case UPLOAD_PROFILE_IMAGE_SUCCESS:
      case REMOVE_PROFILE_IMAGE_SUCCESS: {
        draft.isUploadingProfileImage = false
        draft.me.image.src = action.data
        draft.userInfo.image.src = action.data
        break
      }
      case UPLOAD_PROFILE_IMAGE_FAILURE:
      case REMOVE_PROFILE_IMAGE_FAILURE: {
        break
      }
      case FOLLOW_USER_REQUEST: {
        break
      }
      case FOLLOW_USER_SUCCESS: {
        draft.me.followings.push(action.data)
        break
      }
      case FOLLOW_USER_FAILURE: {
        break
      }
      case UNFOLLOW_USER_REQUEST: {
        break
      }
      case UNFOLLOW_USER_SUCCESS: {
        draft.me.followings = draft.me.followings.filter(v => v.id !== action.data)
        break
      }
      case UNFOLLOW_USER_FAILURE: {
        break
      }

      default: {
        break
      }
    }
  })
}
