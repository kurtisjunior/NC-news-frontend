import React, { Component } from 'react';

import { navigate } from "@reach/router"
import * as api from '../api'


import '../css/createArticle.css'

import {
    Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert
} from 'reactstrap';


class CreateArticle extends Component {
    state = {
        title: '',
        belongs_to: '',
        body: '',
        posted: false,
        loggedin: true,
        missingField: false
    }
    render() {
        return (
            !this.state.posted ? (
                <>
                    <Container>
                        <Row className='create-article'>
                            <Col>
                                <Form onSubmit={this.handleSubmit} >
                                    <FormGroup>

                                        {!this.state.loggedin ? <Alert onClick={this.handleClick} color="danger">
                                            Please log in to post
                                            </Alert> : null}

                                        {this.state.missingField && this.state.loggedin ? <Alert color="danger">
                                            Missing field
                                            </Alert> : null}

                                        <Label for="exampleSelect">Category</Label>
                                        <Input type="select" id="belongs_to" onChange={this.handleChange}>
                                            <option selected disabled>Select</option>
                                            <option>football</option>
                                            <option>coding</option>
                                            <option>cooking</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" id="title" placeholder='Title' onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" id="body" placeholder='What are you thinking ?' onChange={this.handleChange} />
                                    </FormGroup>
                                    <Button>Submit</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </>
            ) : (
                    <p>Success</p>
                )
        );
    }




    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        //if the user is not logged in 
        if (this.props.user === null) {
            this.setState({
                loggedin: false
            })

        } else {

            //if a field is missing then prevent submit and trigger alert
            if (this.state.category === '' || this.state.title === '' || this.state.body === '') {
                this.setState({
                    missingField: true
                })
            } else {
                api.postArticle(this.state, this.props.user._id)
                    .then(res => {
                        //After navigated set the state back to false to bring back the form
                        setTimeout(() => {
                            this.setState({
                                posted: false,
                                missingField: false
                            })
                            //navigate back to the home page to see new article (WHEN SUCCESSFUL)
                            navigate(`/`)
                        }, 1500);
                    })

                //immediately change to success page
                this.setState({
                    posted: true
                })
            }

        }
    }


}


export default CreateArticle;