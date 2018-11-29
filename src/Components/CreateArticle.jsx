import React, { Component } from 'react';
import NavBar from '../Components/NavBar'
import * as api from '../api'


import '../css/createArticle.css'

import {
    Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';


class CreateArticle extends Component {
    state = {
        belongs_to: '',
        topic_slug: '',
        body: ''
    }
    render() {
        console.log(this.props.user[0]._id)
        return (
            <>
                <NavBar />
                <Container>
                    <Row className='create-article'>
                        <Col>
                            <Form onSubmit={this.handleSubmit} >
                                <FormGroup>
                                    <Label for="exampleSelect">Category</Label>
                                    <Input type="select" id="topic_slug">
                                        <option>Football</option>
                                        <option>Coding</option>
                                        <option>Cooking</option>
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

    }
}


export default CreateArticle;