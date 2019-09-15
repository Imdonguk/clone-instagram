import { all, fork } from 'redux-saga/effects'
import axios from 'axios'
import post from './post'
import user from './user'

axios.defaults.baseURL = 'http://localhost:3065'

export default function* rootSage() {
  yield all([fork(user), fork(post)])
}
