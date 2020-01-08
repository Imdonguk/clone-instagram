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

export const CLOSE_POST_FORM = 'CLOSE_POST_FORM'
export const CLOSE_EDIT_POST = 'CLOSE_EDIT_POST'
export const CLOSE_EDIT_PROFILE_IMAGE = 'CLOSE_EDIT_PROFILE_IMAGE'
export const CLOSE_EDIT_ACCOUNT = 'CLOSE_EDIT_ACCOUNT'
export const CLOSE_CANCLE_FOLLOW = 'CLOSE_CANCLE_FOLLOW'
export const CLOSE_USER_LIST = 'CLOSE_USER_LIST'
export const CLOSE_UPDATE_POST_FORM = 'CLOSE_UPDATE_POST_FORM'
export const CLOSE_POST_POP_OVER = 'CLOSE_POST_POP_OVER'

export const CLOSE_POP_OVER = 'CLOSE_POP_OVER'

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
    case OPEN_EDIT_POST: {
      return {
        ...state,
        isEditPost: true,
        editPostData: action.data,
      }
    }
    case CLOSE_EDIT_POST: {
      return {
        ...state,
        isEditPost: false,
        editPostData: undefined,
      }
    }
    case OPEN_EDIT_PROFILE_IMAGE: {
      return {
        ...state,
        isEditProfileImage: true,
      }
    }
    case CLOSE_EDIT_PROFILE_IMAGE: {
      return {
        ...state,
        isEditProfileImage: false,
      }
    }
    case OPEN_EDIT_ACCOUNT: {
      return {
        ...state,
        isEditAccount: true,
      }
    }
    case CLOSE_EDIT_ACCOUNT: {
      return {
        ...state,
        isEditAccount: false,
      }
    }
    case OPEN_CANCLE_FOLLOW: {
      return {
        ...state,
        isCancleFollow: true,
        cancleFollowData: action.data,
      }
    }
    case CLOSE_CANCLE_FOLLOW: {
      return {
        ...state,
        isCancleFollow: false,
        cancleFollowData: undefined,
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
    case CLOSE_USER_LIST: {
      return {
        ...state,
        isUserList: false,
        title: undefined,
        userListData: undefined,
      }
    }
    case OPEN_UPDATE_POST_FORM: {
      return {
        ...state,
        isUpdatePostForm: true,
        updatePostData: action.data,
      }
    }
    case CLOSE_UPDATE_POST_FORM: {
      return {
        ...state,
        isUpdatePostForm: false,
        updatePostData: undefined,
      }
    }
    case OPEN_POST_POP_OVER: {
      return {
        ...state,
        isPostPopover: true,
      }
    }
    case CLOSE_POST_POP_OVER: {
      return {
        ...state,
        isPostPopover: false,
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
