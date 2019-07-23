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

const initialState = {
  isPostSetting: false,
  posts: [],
}

export const OPEN_POST_SETTING = 'OPEN_POST_SETTING'
export const CLOSE_POST_SETTING = 'CLOSE_POST_SETTING'

export const ADD_POST = 'ADD_POST'

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
        posts: state.posts.concat({ ...dummyPost, id: postId++ }),
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}
