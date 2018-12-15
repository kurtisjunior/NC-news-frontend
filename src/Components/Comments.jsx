import React, { Component } from "react";
import * as api from "../api.js";

import Vote from "../components/Vote";
import Delete from "../components/Delete";
import "../css/comments.css";

/*
https://www.npmjs.com/package/react-icons

from library 
https://react-icons.netlify.com/#/icons/io

*/

import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  UncontrolledAlert
} from "reactstrap";

class Comments extends Component {
  state = {
    comments: [],
    body: "",
    loading: true,
    loggedin: true
  };
  render() {
    const { comments, loading } = this.state;
    return loading ? (
      <p>loading</p>
    ) : (
      <>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row />
          <FormGroup row>
            {!this.state.loggedin ? (
              <UncontrolledAlert onClick={this.handleClick} color="danger">
                Please log in to post
              </UncontrolledAlert>
            ) : null}

            <Col sm={10}>
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                placeholder="What are you thinking ?"
                value={this.state.body}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={{ size: 0.5, offset: 0 }}>
              <Button>Comment</Button>
            </Col>
          </FormGroup>
        </Form>

        <ListGroup>
          {comments.map(comment => {
            return (
              <div>
                {" "}
                <ListGroupItem>
                  <Container>
                    <Row>
                      <Col xs="2">
                        <Vote votes={comment.votes} id={comment._id} section={"comments"} />
                      </Col>
                      <Col className="comment-body"> {comment.body}</Col>
                    </Row>
                    {/* if the user posted the article then they can delete it otherwise no permission */}
                    {comment.created_by._id === this.props.userId ? (
                      <Col>
                        <Delete id={comment._id} optimisticDelete={this.optimisticDelete} />
                      </Col>
                    ) : (
                      console.log("err")
                    )}
                  </Container>
                </ListGroupItem>
              </div>
            );
          })}
        </ListGroup>
      </>
    );
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = () => {
    api.getComments(this.props.articleId).then(comments => {
      this.setState({
        comments,
        loading: false
      });
    });
  };

  handleChange = event => {
    this.setState({
      body: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    api
      .postComment(this.state.body, this.props.userId, this.props.articleId)
      .then(newComment => {
        this.setState({
          comments: [newComment, ...this.state.comments],
          body: ""
        });
      })
      .catch(err => {
        if (err.response.status === 400) {
          this.setState({
            loggedin: false
          });
        }
      });
  };

  optimisticDelete = id => {
    setTimeout(() => {
      this.setState({
        comments: this.state.comments.filter(comment => comment._id !== id)
      });
    }, 500);
  };

  handleClick = () => {
    this.setState({
      loggedin: true
    });
  };
}

export default Comments;
