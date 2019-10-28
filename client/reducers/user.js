import produce from 'immer'

const initialState = {
  me: {},
  isPostForm: false,
}

export const OPEN_POST_FORM = 'OPEN_POST_FORM'
export const CLOSE_POST_FORM = 'CLOSE_POST_FORM'

export const SIGN_IN = 'SIGN_IN'

export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case OPEN_POST_FORM: {
        draft.isPostForm = true
        break
      }
      case CLOSE_POST_FORM: {
        draft.isPostForm = false
        break
      }
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
      default: {
        break
      }
    }
  })
}
