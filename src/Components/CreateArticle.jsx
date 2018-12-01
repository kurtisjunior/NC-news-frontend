import React, { Component } from "react";

import { navigate } from "@reach/router";
import * as api from "../api";

import "../css/createArticle.css";

import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

class CreateArticle extends Component {
  state = {
    title: "",
    belongs_to: "",
    body: "",
    loggedin: true,
    missingField: false
  };
  render() {
    return (
      <Container>
        <Row className="create-article">
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                {!this.state.loggedin ? (
                  <Alert onClick={this.handleClick} color="danger">
                    Please log in to post
                  </Alert>
                ) : null}

                {this.state.missingField ? <Alert color="danger">Missing field</Alert> : null}

                <Label for="exampleSelect">Category</Label>
                <Input type="select" id="belongs_to" onChange={this.handleChange}>
                  <option selected disabled>
                    Select
                  </option>
                  <option>football</option>
                  <option>coding</option>
                  <option>cooking</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  id="title"
                  placeholder="Title"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  id="body"
                  placeholder="What are you thinking ?"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

  // componentDidUpdate(PrevProps){
  //   if(this.props)
  // }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    //if the user is not logged in
    if (this.props.user === null) {
      this.setState({
        loggedin: false
      });
    } else {
      //if a field is missing then prevent submit and trigger alert
      if (this.state.category === "" || this.state.title === "" || this.state.body === "") {
        this.setState({
          missingField: true
        });
      } else {
        api.postArticle(this.state, this.props.user._id).then(res => {
          console.log(res);
          //After navigated set the state back to false to bring back the form
          this.setState({
            missingField: false
          });
          //navigate to the recently posted article
          navigate(`article/${res._id}`);
        });
      }
    }
  };
}

export default CreateArticle;
