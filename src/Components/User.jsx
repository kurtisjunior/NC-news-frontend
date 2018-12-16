import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import * as api from "../api";
import { Link } from "@reach/router";

import "../css/user.css";

class User extends Component {
  state = {
    articles: [],
    comments: []
  };
  render() {
    console.log(this.props.user);
    return (
      <Container fluid>
        <Row>
          <Col className="user-col">
            {" "}
            <div className="article-title">
              {this.props.username}'s articles
              <li className="all-articles">
                {this.state.articles.map(article => {
                  return (
                    <ul>
                      {" "}
                      <Link to={`article/${article._id}`}> {article.title} </Link>{" "}
                    </ul>
                  );
                })}
              </li>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    api.getArticles().then(articles => {
      articles = articles.filter(article => {
        return article.created_by && article.created_by.username === this.props.username;
      });
      this.setState({
        articles
      });
    });
  };
}

export default User;

/* Send get request to every article and then filter all comments with logged in user.
Performance heavy. Better with backend get request. 

make articles from user screen full circle
*/
