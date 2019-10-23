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
    case ADD_POST_REQUEST: {
      return {
        ...state,
      }
    }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        posts: [action.data].concat(...state.posts),
        imagePaths: [],
      }
    }
    case ADD_POST_FAILURE: {
      return {
        ...state,
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
      if (Array.isArray(action.data)) {
        return {
          ...state,
          imagePaths: [],
        }
      }
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
