import React, { Component } from 'react';
import { Link } from '@reach/router'
import * as api from '../api'

import NavBar from '../Components/NavBar'

import '../css/app.css'

import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';


/*  
Home page to hold articles in state
Display: Nav bar, Side bar, Annie
*/

class Home extends Component {
    state = {
        articles: [],
        loading: true
    }
    render() {
        const { articles, loading } = this.state
        const { user, logout } = this.props
        return (
            loading ? (
                <p>Loading</p>
            ) : (
                    <>
                        <NavBar login={this.props.login} user={user} logout={logout} />
                        <Container fluid >
                            <Row>
                                <Col className='annie-g'>ANNIE G </Col>
                            </Row>
                            <Row className='second-row'>
                                <Col xs='9'>
                                    <ListGroup className='list'>
                                        {articles.map(article => {
                                            return <ListGroupItem style={{ width: "100%" }} key={article._id}>
                                                <Card >
                                                    <CardHeader tag={Link} to={`/article/${article._id}`}> {article.title}</CardHeader>
                                                    <CardBody>
                                                        <CardTitle>Special Title Treatment</CardTitle>
                                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                                    </CardBody>
                                                    <CardFooter>Footer</CardFooter>
                                                </Card>
                                                {/* </Container> */}
                                            </ListGroupItem>
                                        })}
                                    </ListGroup>
                                </Col>

                                <Col>
                                    <Row className='x'>YOUTUBE VIDEO</Row>
                                    <Row className='x-bottom'> CREATE ARTICLE CARD</Row>
                                </Col>

                            </Row>
                            <Row>
                                <Col className='footer'>FOOTER</Col>
                            </Row>
                        </Container>
                    </>
                )

        );
    }

    componentDidMount() {
        this.fetchArticles()
    }

    componentDidUpdate(prevProp) {
        if (prevProp.topic_slug !== this.props.topic_slug)
            this.fetchArticles()
    }


    fetchArticles = () => {
        api.getArticles(this.props.topic_slug)
            .then(articles => {
                this.setState({
                    articles,
                    loading: false
                })
            })


    }
}

export default Home;





