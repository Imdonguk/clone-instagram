import { all, fork } from 'redux-saga/effects'
import axios from 'axios'
import post from './post'
import user from './user'
import { apiUrl } from '../config/config'

axios.defaults.baseURL = `${apiUrl}/api`

export default function* rootSage() {
  yield all([fork(user), fork(post)])
}
