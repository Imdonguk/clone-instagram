import { combineReducers } from 'redux'
import user from './user'
import post from './post'
import popover from './popover'

const rootReducer = combineReducers({
  user,
  post,
  popover,
})

export default rootReducer
