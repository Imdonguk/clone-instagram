import produce from 'immer'

let postId = 0
const dummyPost = {
  user: {
    name: 'woogie___boogie',
    profileImage:
      'https://scontent-gmp1-1.cdninstagram.com/vp/ea9c40f09035f1cee4f38ba78b3eb53b/5DB404A0/t51.2885-19/s150x150/66176870_271319490398976_1560280448049872896_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com',
  },
  image:
    'https://scontent-gmp1-1.cdninstagram.com/vp/ab46ee91de6072677cf778369bafb2ef/5DA7AB18/t51.2885-15/sh0.08/e35/s640x640/66225780_887219248307464_8401340624033933855_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com',
  description: '첫번째 게시물',
  likeList: [],
  comments: [],
}

const dummyLikeUser = {
  id: 1,
  user: {
    name: 'woogie___boogie',
    nickName: '덩욱',
    profileImage:
      'https://scontent-gmp1-1.cdninstagram.com/vp/ea9c40f09035f1cee4f38ba78b3eb53b/5DB404A0/t51.2885-19/s150x150/66176870_271319490398976_1560280448049872896_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com',
  },
}
const initialState = {
  isPostSetting: false,
  posts: [],
  imagePaths: [],
}

export const OPEN_POST_SETTING = 'OPEN_POST_SETTING'
export const CLOSE_POST_SETTING = 'CLOSE_POST_SETTING'


export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST'
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS'
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE'

export const REMOVE_IMAGE_REQUEST = 'REMOVE_IMAGE_REQUEST'
export const REMOVE_IMAGE_SUCCESS = 'REMOVE_IMAGE_SUCCESS'
export const REMOVE_IMAGE_FAILURE = 'REMOVE_IMAGE_FAILURE'

export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'

export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export const LIKE_POST = 'LIKE_POST'
export const UNLIKE_POST = 'UNLIKE_POST'

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POST_SETTING: {
      return {
        ...state,
        isPostSetting: true,
      }
    }
    case CLOSE_POST_SETTING: {
      return {
        ...state,
        isPostSetting: false,
      }
    }
    case ADD_POST: {
      return {
        ...state,
        posts: [{ ...dummyPost, id: postId++ }, ...state.posts],
      }
    }
    case UPLOAD_IMAGES_REQUEST: {
      return {
        ...state,
      }
    }
    case UPLOAD_IMAGES_SUCCESS: {
      return {
        ...state,
        imagePaths: produce(state.imagePaths, draftState => {
          return draftState.concat(action.data)
        }),
      }
    }
    case UPLOAD_IMAGES_FAILURE: {
      return {
        ...state,
      }
    }
    case REMOVE_IMAGE_REQUEST: {
      return {
        ...state,
      }
    }
    case REMOVE_IMAGE_SUCCESS: {
      return {
        ...state,
        imagePaths: state.imagePaths.filter(v => v !== action.data),
      }
    }
    case REMOVE_IMAGE_FAILURE: {
      return {
        ...state,
      }
    }
    case ADD_COMMENT: {
      const { id, comment, user } = action.data
      const postIndex = state.posts.findIndex(v => v.id === id)
      const newPosts = produce(state.posts, draftState => {
        draftState[postIndex].comments.push({ user, comment })
      })
      return {
        ...state,
        posts: newPosts,
      }
    }
    case LIKE_POST: {
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
