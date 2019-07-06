import React from 'react'
import PropTypes from 'prop-types'
import './default.css'

const App = ({ Component }) => {
  return (
    <>
      <Component />
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default App
