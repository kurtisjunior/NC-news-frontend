import React, { Component } from 'react';
import * as api from '../api.js'


import { ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap'

class Comments extends Component {
    state = {
        comments: []
    }
    render() {
        const { comments } = this.state
        return (
            <ListGroup>
                {comments.map(comment => {
                    return <div> <ListGroupItem>
                        <Container>
                            <Row>


                                <Col xs='2'>vote</Col>
                                <Col> {comment.body}</Col>





                            </Row>
                        </Container>
                    </ListGroupItem>
                    </div>
                })}
            </ListGroup>
        );
    }

    componentDidMount() {
        this.fetchComments()
    }

    fetchComments = () => {
        api.getComments(this.props.articleId)
            .then(comments => {
                this.setState({
                    comments
                })
            })
    }
}

export default Comments;