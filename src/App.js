import React, { Component, Fragment } from 'react';
import Header from './Header/Header.js';
import Container from './Container/Container.js';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header></Header>
        <Container></Container>
      </Fragment>
    );
  }
}

export default App;
