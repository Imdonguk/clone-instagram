import React from 'react'
import PropTypes from 'prop-types'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import Helmet from 'react-helmet'
import { Container } from 'next/app'
import axios from 'axios'
import rootSaga from '../sagas'
import reducer from '../reducers'
import { LOAD_USER_REQUEST } from '../reducers/user'

const WoogieBoogie = ({ Component, store, pageProps }) => {
  return (
    <Container>
      <Provider store={store}>
        <Helmet
          title="clone-instagram"
          htmlAttributes={{ lang: 'ko' }}
          meta={[
            {
              charset: 'UTF-8',
            },
            {
              name: 'viewport',
              content:
                'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
            },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'description',
              content: '우기부기의 SNS만들기',
            },
            {
              name: 'og:title',
              content: 'clone-instagram',
            },
            {
              name: 'og:description',
              content: '우기부기의 SNS만들기',
            },
            {
              property: 'og:type',
              content: 'website',
            },
          ]}
          link={[
            {
              rel: 'stylesheet',
              type: 'text/css',
              href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
            },
            {
              rel: 'stylesheet',
              type: 'text/css',
              href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
            },
          ]}
        />
        <Component {...pageProps} />
      </Provider>
    </Container>
  )
}

WoogieBoogie.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

WoogieBoogie.getInitialProps = async context => {
  const { ctx, Component } = context
  const { isServer, store, req } = ctx
  let pageProps = {}
  const cookie = isServer ? req.headers.cookie : ''
  if (cookie) axios.defaults.headers.Cookie = cookie
  const { me } = store.getState().user
  try {
    me.userName ||
      (await new Promise((resolve, reject) => store.dispatch({ type: LOAD_USER_REQUEST, data: { resolve, reject } })))
  } catch (e) {
    console.log(e.response.data)
  }
  if (Component.getInitialProps) pageProps = (await Component.getInitialProps(ctx)) || {}
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
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}

export default withRedux(configureStore)(withReduxSaga(WoogieBoogie))
