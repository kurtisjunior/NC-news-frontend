import React, { Component } from "react";
import { Router } from "@reach/router";

import Home from "./components/Home";
import NavBar from "./components/NavBar";

import Article from "./components/Article";
import CreateArticle from "./components/CreateArticle";
import Error from "./components/Error";

import "./css/homeArticles.css";

/*App to hold the logged in user and pass down to other components*/

class App extends Component {
  state = {
    user: {
      _id: "5bd324bda2eb70f78abd4d9d",
      username: "jessjelly",
      name: "Jess Jelly",
      avatar_url:
        "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
      __v: 0
    }
  };

  render() {
    return (
      <div className="app">
        <NavBar user={this.state.user} login={this.login} logout={this.logout} />
        <Router className="app-router-wrapper">
          {/* HOME PAGE */}
          <Home path="/" login={this.login} user={this.state.user} logout={this.logout} />
          <Home path="/topics/:topic_slug" />
          {/* HOME PAGE FINISH  */}
          <Article path="article/:id" user={this.state.user} />
          <Article path="topics/:topic_slug/article/:id" />

          <CreateArticle path="createArticle" user={this.state.user} />
          <Error path="/*" />
        </Router>
      </div>
    );
  }

  login = user => {
    this.setState({
      user
    });
  };

  logout = () => {
    this.setState({
      user: null
    });
  };
}

export default App;
