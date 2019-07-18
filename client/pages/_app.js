import React from 'react'
import PropTypes from 'prop-types'
import './default.css'
import withRedux from 'next-redux-wrapper'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'

const App = ({ Component, store }) => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default withRedux((initialState, options) => {
  const store = createStore(reducer, initialState)
  return store
})(App)
