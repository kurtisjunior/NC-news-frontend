import React, { Component } from 'react';
import * as api from '../api.js'


import Vote from '../Components/Vote'
import '../css/comments.css'

/*
https://www.npmjs.com/package/react-icons

from library 
https://react-icons.netlify.com/#/icons/io

*/



import { ListGroup, ListGroupItem, Container, Row, Col, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap'


class Comments extends Component {
    state = {
        comments: [],
        body: '',
        loading: true
    }
    render() {
        const { comments, loading } = this.state
        return (
            loading ? (
                <p>loading</p>
            ) : (
                    <>
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup row>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={10}>
                                    <Input type="textarea" name="text" id="exampleText" placeholder='What are you thinking ?' value={this.state.body} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup >
                                <Col sm={{ size: 0.5, offset: 0 }}>
                                    <Button>Post</Button>
                                </Col>
                            </FormGroup>
                        </Form>


                        <ListGroup>
                            {comments.map(comment => {
                                return <div> <ListGroupItem>
                                    <Container>
                                        <Row>

                                            {/* RENDER VOTE COMPONENT IN HERE */}

                                            <Col xs='2'>
                                                <Vote votes={comment.votes} id={comment._id} section={'comments'} />
                                            </Col>
                                            <Col> {comment.body}</Col>
                                        </Row>
                                    </Container>
                                </ListGroupItem>
                                </div>
                            })}
                        </ListGroup>
                    </>
                )

        );
    }

    componentDidMount() {
        this.fetchComments()
    }

    fetchComments = () => {
        api.getComments(this.props.articleId)
            .then(comments => {
                this.setState({
                    comments,
                    loading: false
                })
            })
    }

    handleChange = (event) => {
        this.setState({
            body: event.target.value
        })
    }


    handleSubmit = (event) => {
        event.preventDefault()
        api.postComment(this.state.body, this.props.userId, this.props.articleId)
            .then(newComment => {
                this.setState({
                    comments: [newComment, ...this.state.comments],
                    body: ''
                })
            })

    }












}

export default Comments;