import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";

import Vote from "../Components/Vote";
import Loading from "../Components/Loading";

import moment from "moment";
import "../css/app.css";
import "../css/sidebar.css";

import pic from "../utils/picture.jpg";
import hunter from "../utils/hunter.jpg";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  CardImg,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  CardText
} from "reactstrap";

class Home extends Component {
  state = {
    articles: [],
    loading: true
  };
  render() {
    const { articles, loading } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <>
        <Container fluid>
          <Row className="second-row">
            <Col xs="6">
              <Breadcrumb className="sort">
                <BreadcrumbItem>
                  <button className="button" onClick={() => this.sortArticles("hot")}>
                    Hot
                  </button>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <button className="button" onClick={() => this.sortArticles("top")}>
                    Top
                  </button>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <button className="button" onClick={() => this.sortArticles("new")}>
                    New
                  </button>
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>{" "}
            <Col xs="9" className="main-body">
              <ListGroup className="article-list">
                {articles.map(article => {
                  return (
                    <ListGroupItem key={article._id}>
                      <Card>
                        {/* Container for the votes, title, et al */}
                        <Container>
                          <CardBody>
                            <Row>
                              <Col xs="3">
                                <Vote votes={article.votes} id={article._id} section={"articles"} />
                              </Col>

                              <Col>
                                <CardTitle
                                  className="title"
                                  tag={Link}
                                  to={`article/${article._id}`}
                                >
                                  {article.title}
                                </CardTitle>
                              </Col>
                            </Row>
                            <Row>
                              {/* beware of the offset  */}
                              <Col sm={{ size: 6, order: 2, offset: 3 }}>
                                <p>
                                  <span className="article-topic-text">
                                    {`t/${article.belongs_to} `}{" "}
                                  </span>
                                  {`posted by ${article.created_by && article.created_by.username} 
                                ${moment(article.created_at)
                                  .startOf("day")
                                  .fromNow()}`}
                                </p>
                                <p>
                                  {article.comment_count === 1 ? (
                                    <Link to={`article/${article._id}`}>
                                      {" "}
                                      {`${article.comment_count} comment`}{" "}
                                    </Link>
                                  ) : (
                                    <Link to={`article/${article._id}`}>
                                      {" "}
                                      {`${article.comment_count} comments`}{" "}
                                    </Link>
                                  )}
                                </p>
                              </Col>
                            </Row>
                          </CardBody>
                        </Container>
                      </Card>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Col>
            <Col className="sidebar-col">
              <Row>
                <Card className="sidebar-bottom-card">
                  <CardBody className="top-card-body">
                    <CardImg top width="100%" src={pic} alt="Card image cap" />
                  </CardBody>
                </Card>
              </Row>

              {/* bottom card */}
              <Row>
                <Card className="bottom-card">
                  <CardImg top width="100%" src={hunter} alt="Card image cap" />
                  <CardBody className="bottom-card-body">
                    <CardText className="bottom-card-create-post">
                      Just another day in the dunya ? Make a post about it here.{" "}
                    </CardText>
                    <Button tag={Link} to={"/createArticle"} className="create-post-button">
                      Create Post
                    </Button>
                  </CardBody>
                </Card>
              </Row>
              {/* bottom card end */}
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProp) {
    if (prevProp.topic_slug !== this.props.topic_slug) this.fetchArticles();
  }

  fetchArticles = () => {
    api.getArticles(this.props.topic_slug).then(articles => {
      this.setState({
        articles,
        loading: false
      });
    });
  };

  sortArticles = sort => {
    let articles;
    sort === "hot"
      ? (articles = this.state.articles.sort((a, b) => {
          return b.comment_count - a.comment_count;
        }))
      : sort === "top"
      ? (articles = this.state.articles.sort((a, b) => {
          return b.votes - a.votes;
        }))
      : (articles = this.state.articles.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        }));

    this.setState({
      articles
    });
  };
}

export default Home;
