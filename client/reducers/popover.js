const initialState = {
  isPostForm: false,
  isSettingPost: false,
  isSettingProfileImage: false,
  isSettingAccount: false,
}

export const OPEN_POST_FORM = 'OPEN_POST_FORM'
export const OPEN_EDIT_POST = 'OPEN_EDIT_POST'
export const OPEN_EDIT_PROFILE_IMAGE = 'OPEN_EDIT_PROFILE_IMAGE'

export const CLOSE_POP_OVER = 'CLOSE_POP_OVER'

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POST_FORM: {
      return {
        ...state,
        isPostForm: true,
      }
    }
    case OPEN_EDIT_POST: {
      return {
        ...state,
        isSettingPost: true,
      }
    }
    case OPEN_EDIT_PROFILE_IMAGE: {
      return {
        ...state,
        isSettingProfileImage: true,
      }
    }
    case CLOSE_POP_OVER: {
      return initialState
    }
    default: {
      return {
        ...state,
      }
    }
  }
}
