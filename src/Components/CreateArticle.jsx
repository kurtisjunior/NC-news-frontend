import React, { Component } from 'react';

import { navigate } from "@reach/router"

import NavBar from '../Components/NavBar'
import * as api from '../api'


import '../css/createArticle.css'

import {
    Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';


class CreateArticle extends Component {
    state = {
        title: '',
        belongs_to: '',
        body: '',
        posted: false
    }
    render() {
        return (
            !this.state.posted ? (
                <>
                    <NavBar />
                    <Container>
                        <Row className='create-article'>
                            <Col>
                                <Form onSubmit={this.handleSubmit} >
                                    <FormGroup>
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

        api.postArticle(this.state, this.props.user[0]._id)
            .then(res => {

                //After navigated set the state back to false to bring back the form
                setTimeout(() => {
                    this.setState({
                        posted: false
                    })
                    //navigate back to the home page to see new article
                    navigate(`/`)
                }, 1500);
            })

        //immediately change to success page
        this.setState({
            posted: true
        })
    }
}


export default CreateArticle;