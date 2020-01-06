const initialState = {
  isPostForm: false,
  isEditPost: false,
  isEditProfileImage: false,
  isEditAccount: false,
  isCancleFollow: false,
  isUserList: false,
  isUpdatePostForm: false,
  isPostPopover: false,
}

export const OPEN_POST_FORM = 'OPEN_POST_FORM'
export const OPEN_EDIT_POST = 'OPEN_EDIT_POST'
export const OPEN_EDIT_PROFILE_IMAGE = 'OPEN_EDIT_PROFILE_IMAGE'
export const OPEN_EDIT_ACCOUNT = 'OPEN_EDIT_ACCOUNT'
export const OPEN_CANCLE_FOLLOW = 'OPEN_CANCLE_FOLLOW'
export const OPEN_USER_LIST = 'OPEN_USER_LIST'
export const OPEN_UPDATE_POST_FORM = 'OPEN_UPDATE_POST_FORM'
export const OPEN_POST_POP_OVER = 'OPEN_POST_POP_OVER'

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
        editPostData: action.data,
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
        cancleFollowData: action.data,
      }
    }
    case OPEN_USER_LIST: {
      return {
        ...state,
        isUserList: true,
        title: action.title,
        userListData: action.data,
      }
    }
    case OPEN_UPDATE_POST_FORM: {
      return {
        ...state,
        isUpdatePostForm: true,
        updatePostData: action.data,
      }
    }
    case OPEN_POST_POP_OVER: {
      return {
        ...state,
        isPostPopover: true,
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
