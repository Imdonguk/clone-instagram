import produce from 'immer'

const initialState = {
  posts: [],
  userPosts: [],
  imagePaths: [],
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST'
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS'
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE'

export const REMOVE_IMAGE_REQUEST = 'REMOVE_IMAGE_REQUEST'
export const REMOVE_IMAGE_SUCCESS = 'REMOVE_IMAGE_SUCCESS'
export const REMOVE_IMAGE_FAILURE = 'REMOVE_IMAGE_FAILURE'

export const REMOVE_POST = 'REMOVE_POST'

export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST'
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST'
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS'
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST: {
        break
      }
      case ADD_POST_SUCCESS: {
        draft.posts.unshift(action.data)
        draft.imagePaths = []
        break
      }
      case ADD_POST_FAILURE: {
        break
      }
      case LOAD_POSTS_REQUEST: {
        break
      }
      case LOAD_POSTS_SUCCESS: {
        draft.posts = action.data
        break
      }
      case LOAD_POSTS_FAILURE: {
        break
      }
      case UPLOAD_IMAGES_REQUEST: {
        break
      }
      case UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths.push(...action.data)
        break
      }
      case UPLOAD_IMAGES_FAILURE: {
        break
      }
      case REMOVE_IMAGE_REQUEST: {
        break
      }
      case REMOVE_IMAGE_SUCCESS: {
        if (Array.isArray(action.data)) {
          draft.imagePaths = []
        } else {
          draft.imagePaths = draft.imagePaths.filter(v => v !== action.data)
        }
        break
      }
      case REMOVE_IMAGE_FAILURE: {
        break
      }
      case LIKE_POST_REQUEST: {
        break
      }
      case LIKE_POST_SUCCESS: {
        const { userId, postId } = action.data
        const postIndex = draft.posts.findIndex(v => v.id === postId)
        draft.posts[postIndex].likers.unshift({ id: userId })
        break
      }
      case LIKE_POST_FAILURE: {
        break
      }
      case UNLIKE_POST_REQUEST: {
        break
      }
      case UNLIKE_POST_SUCCESS: {
        const { userId, postId } = action.data
        const postIndex = draft.posts.findIndex(v => v.id === postId)
        draft.posts[postIndex].likers = draft.posts[postIndex].likers.filter(v => v.id !== userId)
        break
      }
      case UNLIKE_POST_FAILURE: {
        break
      }
      case ADD_COMMENT_REQUEST: {
        break
      }
      case ADD_COMMENT_SUCCESS: {
        const postIndex = draft.posts.findIndex(v => v.id === action.postId)
        draft.posts[postIndex].comments.push(action.data)
        break
      }
      case ADD_COMMENT_FAILURE: {
        break
      }
      default: {
        break
      }
    }
  })
}
