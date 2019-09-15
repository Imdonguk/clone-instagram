const dummyUser = {
  userName: 'woogie___boogie',
  profileImage:
    'https://scontent-gmp1-1.cdninstagram.com/vp/ea9c40f09035f1cee4f38ba78b3eb53b/5DB404A0/t51.2885-19/s150x150/66176870_271319490398976_1560280448049872896_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com',
  nickName: '덩욱',
  followers: [],
  followings: [],
}

const initialState = {
  ...dummyUser,
  me: null,
  isPostForm: false,
  isLogged: false,
}

export const OPEN_POST_FORM = 'OPEN_POST_FORM'
export const CLOSE_POST_FORM = 'CLOSE_POST_FORM'

export const SIGN_IN = 'SIGN_IN'

export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
export const SIGN_OUT_FAILIRE = 'SIGN_OUT_FAILIRE'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAILIRE = 'LOAD_USER_FAILIRE'

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
    case SIGN_IN: {
      return {
        ...state,
        isLogged: true,
      }
    }
    case SIGN_OUT_REQUEST: {
      return {
        ...state,
      }
    }
    case SIGN_OUT_SUCCESS: {
      return {
        ...state,
      }
    }
    case SIGN_OUT_FAILIRE: {
      return {
        ...state,
      }
    }
    case LOAD_USER_REQUEST: {
      return {
        ...state,
      }
    }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        me: action.data,
      }
    }
    case LOAD_USER_FAILIRE: {
      return {
        ...state,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}
