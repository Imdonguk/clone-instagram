import produce from 'immer'

const initialState = {
  posts: [],
  post: {},
  userPosts: [],
  hashtagPosts: [],
  imagePaths: [],
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE'

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST'
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'

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

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST'
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS'
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE'

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST'
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS'
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE'

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST'
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE'

export const UPDATE_MY_POSTS_PROFILE_IMAGE = 'UPDATE_MY_POSTS_PROFILE_IMAGE'

export const RESET_POST_REDUCER = 'RESET_POST_REDUCER'

export const RESET_HAS_MORE_POST = 'RESET_HAS_MORE_POST'

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
        draft.posts = draft.posts.concat(action.data)
        draft.hasMorePost = action.hasMorePost
        break
      }
      case REMOVE_POST_REQUEST: {
        break
      }
      case REMOVE_POST_SUCCESS: {
        draft.posts = draft.posts.filter(v => v.id !== action.data.id)
        draft.userPosts = draft.userPosts.filter(v => v.id !== action.data.id)
        draft.hashtagPosts = draft.hashtagPosts.filter(v => v.id !== action.data.id)
        draft.post = {}
        break
      }
      case REMOVE_POST_FAILURE: {
        break
      }
      case UPDATE_POST_REQUEST: {
        break
      }
      case UPDATE_POST_SUCCESS: {
        const postIndex = draft.posts.findIndex(v => v.id === action.data.id)
        if (postIndex !== -1) draft.posts[postIndex].description = action.data.description
        if (draft.post.id) draft.post.description = action.data.description
        break
      }
      case UPDATE_POST_FAILURE: {
        break
      }
      case LOAD_POSTS_FAILURE: {
        break
      }
      case LOAD_POST_REQUEST: {
        draft.post = {}
        break
      }
      case LOAD_POST_SUCCESS: {
        draft.post = action.data
        break
      }
      case LOAD_POST_FAILURE: {
        break
      }
      case LOAD_USER_POSTS_REQUEST: {
        draft.userPosts = action.lastId ? draft.userPosts : []
        break
      }
      case LOAD_USER_POSTS_SUCCESS: {
        draft.userPosts = draft.userPosts.concat(action.data)
        draft.hasMorePost = action.hasMorePost
        break
      }
      case LOAD_USER_POSTS_FAILURE: {
        break
      }
      case LOAD_HASHTAG_POSTS_REQUEST: {
        draft.hashtagPosts = action.lastId ? draft.hashtagPosts : []
        break
      }
      case LOAD_HASHTAG_POSTS_SUCCESS: {
        draft.hashtagPosts = draft.hashtagPosts.concat(action.data)
        draft.hasMorePost = action.hasMorePost
        break
      }
      case LOAD_HASHTAG_POSTS_FAILURE: {
        break
      }
      case LOAD_COMMENTS_REQUEST: {
        draft.post.comments = action.lastId ? draft.post.comments : []
        break
      }
      case LOAD_COMMENTS_SUCCESS: {
        draft.post.comments = action.data.concat(draft.post.comments)
        draft.post.hasMoreComment = action.hasMoreComment
        break
      }
      case LOAD_COMMENTS_FAILURE: {
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
        const mainPostIndex = draft.posts.findIndex(v => v.id === postId)
        const userPostIndex = draft.userPosts.findIndex(v => v.id === postId)
        const hashtagPostIndex = draft.hashtagPosts.findIndex(v => v.id === postId)

        if (mainPostIndex !== -1) draft.posts[mainPostIndex].likers.push({ id: userId })
        if (userPostIndex !== -1) draft.userPosts[userPostIndex].likers.push({ id: userId })
        if (hashtagPostIndex !== -1) draft.hashtagPosts[hashtagPostIndex].likers.push({ id: userId })
        if (draft.post.id) draft.post.likers.push({ id: userId })

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
        const mainPostIndex = draft.posts.findIndex(v => v.id === postId)
        const userPostIndex = draft.userPosts.findIndex(v => v.id === postId)
        const hashtagPostIndex = draft.hashtagPosts.findIndex(v => v.id === postId)

        if (mainPostIndex !== -1) {
          draft.posts[mainPostIndex].likers = draft.posts[mainPostIndex].likers.filter(v => v.id !== userId)
        }
        if (userPostIndex !== -1) {
          draft.userPosts[userPostIndex].likers = draft.userPosts[userPostIndex].likers.filter(v => v.id !== userId)
        }
        if (hashtagPostIndex !== -1) {
          draft.hashtagPosts[hashtagPostIndex].likers = draft.hashtagPosts[hashtagPostIndex].likers.filter(
            v => v.id !== userId,
          )
        }
        if (draft.post.id) {
          draft.post.likers = draft.post.likers.filter(v => v.id !== userId)
        }

        break
      }
      case UNLIKE_POST_FAILURE: {
        break
      }
      case ADD_COMMENT_REQUEST: {
        break
      }
      case ADD_COMMENT_SUCCESS: {
        const mainPostIndex = draft.posts.findIndex(v => v.id === action.postId)
        const userPostIndex = draft.userPosts.findIndex(v => v.id === action.postId)
        const hashtagPostIndex = draft.hashtagPosts.findIndex(v => v.id === action.postId)

        if (mainPostIndex !== -1) draft.posts[mainPostIndex].previewComments.push(action.data)
        if (draft.post.id) draft.post.comments.push(action.data)

        if (userPostIndex !== -1) draft.userPosts[userPostIndex].commentCount++
        if (hashtagPostIndex !== -1) draft.hashtagPosts[hashtagPostIndex].commentCount++

        break
      }
      case ADD_COMMENT_FAILURE: {
        break
      }
      case UPDATE_MY_POSTS_PROFILE_IMAGE: {
        draft.posts.forEach(v => {
          if (v.user.userName === action.userName) {
            v.user.image.src = action.data
          }
        })
        draft.post.id &&
          draft.post.comments.forEach(v => {
            if (v.user.userName === action.userName) {
              v.user.image.src = action.data
            }
          })
        break
      }
      case RESET_POST_REDUCER: {
        draft.posts = []
        draft.userPosts = []
        draft.hashtagPosts = []
        break
      }
      case RESET_HAS_MORE_POST: {
        draft.hasMorePost = true
        break
      }
      default: {
        break
      }
    }
  })
}
