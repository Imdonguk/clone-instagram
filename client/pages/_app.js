import React from 'react'
import PropTypes from 'prop-types'
import './default.css'
import withRedux from 'next-redux-wrapper'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
import reducer from '../reducers'

const App = ({ Component, store, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

App.getInitialProps = async context => {
  const { ctx, Component } = context
  let pageProps = {}
  if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx)
  return { pageProps }
}

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f,
        )
  const store = createStore(reducer, initialState, enhancer)
  sagaMiddleware.run(rootSaga)
  return store
}

export default withRedux(configureStore)(App)
