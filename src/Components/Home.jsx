import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";

import Vote from "../components/Vote";
import { SocialIcon } from "react-social-icons";

import moment from "moment";
import "../css/app.css";
import "../css/sidebar.css";

import pic from "../utils/picture.jpg";
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
  BreadcrumbItem
} from "reactstrap";

class Home extends Component {
  state = {
    articles: [],
    loading: true
  };
  render() {
    const linkedIn = "https://www.linkedin.com/in/kurtis-angell-58612171/";
    const instagram = "https://www.google.co.uk";
    const { articles, loading } = this.state;
    return loading ? (
      <p>Loading</p>
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
                  <CardBody>
                    <CardImg top width="100%" src={pic} alt="Card image cap" />
                  </CardBody>
                </Card>
              </Row>

              <Row>
                {/* <Sticky topOffset={240}>
                    {({ style }) => <h1 style={style}>Sticky element</h1>}
                  </Sticky> */}

                {/* <Sticky topOffset={150}>
                    {({ style }) => (
                      <Card style={{ style }}>
                        <CardImg
                          top
                          width="100%"
                          src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                          alt="Card image cap"
                        />
                        <CardBody>
                          <CardText>
                            Just another day in the dunya right ? Make a post about it here.{" "}
                          </CardText>
                          <Button tag={Link} to={"/createArticle"}>
                            Create Post
                          </Button>
                        </CardBody>
                      </Card>
                    )}
                  </Sticky> */}
              </Row>
            </Col>
          </Row>

          <Row>
            <Col className="footer">
              <a href={linkedIn}>
                {" "}
                <SocialIcon network="linkedin" />{" "}
              </a>

              <a href={instagram}>
                {" "}
                <SocialIcon network="instagram" />{" "}
              </a>
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
