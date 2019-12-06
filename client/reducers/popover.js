const initialState = {
  isPostForm: false,
  isEditPost: false,
  isEditProfileImage: false,
  isEditAccount: false,
  isCancleFollow: false,
  isUserList: false,
}

export const OPEN_POST_FORM = 'OPEN_POST_FORM'
export const OPEN_EDIT_POST = 'OPEN_EDIT_POST'
export const OPEN_EDIT_PROFILE_IMAGE = 'OPEN_EDIT_PROFILE_IMAGE'
export const OPEN_EDIT_ACCOUNT = 'OPEN_EDIT_ACCOUNT'
export const OPEN_CANCLE_FOLLOW = 'OPEN_CANCLE_FOLLOW'
export const OPEN_USER_LIST = 'OPEN_USER_LIST'

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
        isEditPost: true,
      }
    }
    case OPEN_EDIT_PROFILE_IMAGE: {
      return {
        ...state,
        isEditProfileImage: true,
      }
    }
    case OPEN_EDIT_ACCOUNT: {
      return {
        ...state,
        isEditAccount: true,
      }
    }
    case OPEN_CANCLE_FOLLOW: {
      return {
        ...state,
        isCancleFollow: true,
        data: action.data,
      }
    }
    case OPEN_USER_LIST: {
      return {
        ...state,
        isUserList: true,
        title: action.title,
        data: action.data,
      }
    }
    case CLOSE_POP_OVER: {
      document.body.style.overflow = 'auto'
      return initialState
    }
    default: {
      return {
        ...state,
      }
    }
  }
}
