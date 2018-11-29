import React, { Component } from 'react';
import * as api from '../api.js'

import '../css/comments.css'

/*
https://www.npmjs.com/package/react-icons

from library 
https://react-icons.netlify.com/#/icons/io

*/



import { ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap'
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";

class Comments extends Component {
    state = {
        comments: [],
        loading: true
    }
    render() {
        const { comments, loading } = this.state
        return (
            loading ? (
                <p>loading</p>
            ) : (
                    <ListGroup>
                        {comments.map(comment => {
                            return <div> <ListGroupItem>
                                <Container>
                                    <Row>
                                        <Col xs='2'>
                                            <IoIosArrowRoundUp />
                                            <br />
                                            {comment.votes}
                                            <br />
                                            <IoIosArrowRoundDown />
                                        </Col>
                                        <Col> {comment.body}</Col>

                                    </Row>
                                </Container>
                            </ListGroupItem>
                            </div>
                        })}
                    </ListGroup>
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
}

export default Comments;