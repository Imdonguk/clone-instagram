const initialState = {
  isPostForm: false,
  isSettingPost: false,
  isSettingProfileImage: false,
  isSettingAccount: false,
}

export const OPEN_POST_FORM = 'OPEN_POST_FORM'
export const CLOSE_POST_FORM = 'CLOSE_POST_FORM'

export const OPEN_POST_SETTING = 'OPEN_POST_SETTING'
export const CLOSE_POST_SETTING = 'CLOSE_POST_SETTING'

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POST_FORM: {
      return {
        ...state,
        isPostForm: true,
      }
    }
    case CLOSE_POST_FORM: {
      return {
        ...state,
        isPostForm: false,
      }
    }
    case OPEN_POST_SETTING: {
      return {
        ...state,
        isSettingPost: true,
      }
    }
    case CLOSE_POST_SETTING: {
      return {
        ...state,
        isSettingPost: false,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}
