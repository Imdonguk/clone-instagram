const dummyUser = {
  name: 'woogie___boogie',
  profileImage:
    'https://scontent-gmp1-1.cdninstagram.com/vp/ea9c40f09035f1cee4f38ba78b3eb53b/5DB404A0/t51.2885-19/s150x150/66176870_271319490398976_1560280448049872896_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com',
  nickName: '덩욱',
  followers: [],
  followings: [],
}

const initialState = {
  user: dummyUser,
}

export default (state = initialState, action) => {
  return {
    ...state,
  }
}
