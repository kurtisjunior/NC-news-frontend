import React, { Component } from "react";
import * as api from "../api";
import { navigate } from "@reach/router";
import moment from "moment";

import Comments from "../Components/Comments";
import Vote from "../Components/Vote";

import "../css/article.css";

// NOTE** should the fragment be changed to a div for styling purposes ?

import { Card, CardTitle, CardText, Container, Row, Col } from "reactstrap";

class Article extends Component {
  state = {
    singleArticle: [],
    loading: true
  };
  render() {
    const { singleArticle, loading } = this.state;
    return loading ? (
      <p>loading</p>
    ) : (
      <>
        <Container className="single-article">
          <Row>
            <Card style={{ width: "80%" }} className="text-left">
              <CardTitle>
                <Vote votes={singleArticle.votes} id={singleArticle._id} section={"articles"} />
                <span className="article-title">{singleArticle.title}</span>
              </CardTitle>
              <p>
                {" "}
                <span className="singleArticle-topic">
                  {`t/${singleArticle.belongs_to} `}{" "}
                </span>{" "}
                <span className="article-info">
                  {`posted by ${singleArticle.created_by && singleArticle.created_by.username} 
                                ${moment(singleArticle.created_at)
                                  .startOf("day")
                                  .fromNow()}`}{" "}
                </span>{" "}
              </p>
              <CardText className="text-body"> {singleArticle.body} </CardText>
            </Card>

            {/* SIDEBAR */}
            <Col className="article-sidebar" />
            {/* SIDEBAR FINISH */}

            <Card style={{ width: "80%" }} className="text-left">
              {/* <CardTitle>Form to post </CardTitle> */}
              {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}
            </Card>
            <Card style={{ width: "80%" }} className="text-left">
              <CardTitle className="text-center">Comments</CardTitle>
              {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}

              {/* COMMENTS COMPONENT  */}
              <Comments
                userId={this.props.user ? this.props.user._id : null}
                articleId={this.state.singleArticle._id}
                user={this.props.user}
              />
            </Card>
          </Row>
        </Container>
      </>
    );
  }

  componentDidMount() {
    this.fetchSingleArticle();
  }

  fetchSingleArticle = () => {
    api
      .getArticle(this.props.id)
      .then(singleArticle => {
        this.setState({
          singleArticle,
          loading: false
        });
      })
      .catch(err => {
        navigate("/error", { replace: true });
      });
  };
}

export default Article;
