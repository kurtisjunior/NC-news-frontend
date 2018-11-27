import React, { Component } from 'react';
import { Router } from '@reach/router'

import Home from './Components/Home'
import NavBar from './Components/NavBar'
import { Container, Row, Col } from 'reactstrap';



/*App to hold the logged in user and pass down to other components*/


class App extends Component {
  state = {
    user: []
  }
  render() {
    return (
      <>
        <NavBar />
        <Router>
          <Home path='/' />
          <Home path='/topic/:topic_slug' />
        </Router>
      </>
    );
  }
}

export default App;
