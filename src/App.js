import React, { Component } from 'react';
import { Router } from '@reach/router'

import Home from './Components/Home'

import Article from './Components/Article'

import './css/homeArticles.css'




/*App to hold the logged in user and pass down to other components*/


class App extends Component {
  state = {
    user: []
  }
  render() {
    return (
      <div className='app'>
        <Router className='app-router-wrapper'>

          {/* HOME PAGE */}
          <Home path='/' login={this.login} user={this.state.user} />
          <Home path='/topics/:topic_slug' />
          {/* HOME PAGE FINISH  */}

          <Article path='article/:id' />
        </Router>

      </div>
    );
  }

  login = (user) => {
    this.setState({
      user
    })
  }
}

export default App;
