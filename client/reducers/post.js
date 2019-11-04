import produce from 'immer'

const initialState = {
  isPostSetting: false,
  posts: [],
  imagePaths: [],
}

export const OPEN_POST_SETTING = 'OPEN_POST_SETTING'
export const CLOSE_POST_SETTING = 'CLOSE_POST_SETTING'

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST'
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS'
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE'

export const REMOVE_IMAGE_REQUEST = 'REMOVE_IMAGE_REQUEST'
export const REMOVE_IMAGE_SUCCESS = 'REMOVE_IMAGE_SUCCESS'
export const REMOVE_IMAGE_FAILURE = 'REMOVE_IMAGE_FAILURE'

export const REMOVE_POST = 'REMOVE_POST'

export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST'
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST'
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS'
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE'

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case OPEN_POST_SETTING: {
        draft.isPostSetting = true
        break
      }
      case CLOSE_POST_SETTING: {
        draft.isPostSetting = false
        break
      }
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
        return {
          ...state,
          posts: newPosts,
        }
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
      default: {
        break
      }
    }
  })
}
