import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";

import Vote from "../Components/Vote";
import { SocialIcon } from "react-social-icons";

import moment from "moment";
import "../css/app.css";

import {
  Card,
  Button,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  CardImg
} from "reactstrap";

// const imgStyle = {
//     minWidth: "50x",
// };

/*  
Home page to hold articles in state
Display: Nav bar, Side bar, Annie
*/

class Home extends Component {
  state = {
    articles: [],
    loading: true
  };
  render() {
    const { articles, loading } = this.state;
    return loading ? (
      <p>Loading</p>
    ) : (
      <>
        <Container fluid>
          <Row className="second-row">
            <Col xs="9">
              <ListGroup>
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

                        {/* if the user posted the article then they can delete it otherwise no permission */}
                        {/* {article.created_by !== null && article.created_by._id === user[0]._id ?
                                                        <CardFooter>
                                                            <Delete />
                                                        </CardFooter>
                                                        :
                                                        console.log('err')} */}
                      </Card>
                      {/* </Container> */}
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Col>
            <Col>
              <Row className="x-bottom">
                <Card>
                  <CardBody>
                    <CardImg
                      top
                      width="100%"
                      src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                      alt="Card image cap"
                    />
                  </CardBody>
                </Card>
              </Row>
              <Row className="x-bottom">
                <Card>
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
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="footer">
              <SocialIcon className="socialicon" network="instagram" />
              <SocialIcon className="socialicon" network="linkedin" />
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
}

export default Home;
