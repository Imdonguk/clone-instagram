import React, { Component, Fragment } from 'react';
import Header from './header/Header.js';
import Container from './container/Container.js';

class App extends Component {

  state = {
    bePostForm: false
  }

  isPostForm = (data) => {
    this.setState({ "bePostForm": data });
  }

  render() {
    return (
      <Fragment>
        <Header isPostForm={this.isPostForm}></Header>
        <Container isPostForm={this.isPostForm} bePostForm={this.state.bePostForm}></Container>
      </Fragment>
    );
  }
}

export default App;
