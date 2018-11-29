import React, { Component } from 'react';
import { Link } from '@reach/router'
import * as api from '../api'

import NavBar from '../Components/NavBar'
import Vote from '../Components/Vote'

import '../css/app.css'

import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, ListGroup, ListGroupItem, Container, Row, Col, CardImg, CardSubtitle
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

                                            article.created_by !== null ?
                                                console.log(article.created_by)
                                                :
                                                console.log('err')



                                            return <ListGroupItem style={{ width: "100%" }} key={article._id}>

                                                <Card >
                                                    {/* Container for the votes, title, et al */}
                                                    <Container>
                                                        <CardBody>
                                                            <Row>
                                                                <Col xs='3'>
                                                                    <Vote votes={article.votes} id={article._id} section={'articles'} />
                                                                </Col>
                                                                <Col>
                                                                    <CardTitle tag={Link} to={`article/${article._id}`} >{article.title}</CardTitle>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                {/* beware of the offset  */}
                                                                <Col sm={{ size: 6, order: 2, offset: 3 }}>
                                                                    <CardText>some of the article body only</CardText>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Container>

                                                    <CardFooter>Footer</CardFooter>
                                                </Card>
                                                {/* </Container> */}
                                            </ListGroupItem>
                                        })}
                                    </ListGroup>
                                </Col>

                                <Col>


                                    <Row className='x'>YOUTUBE VIDEO</Row>
                                    <Row className='x-bottom'>
                                        <Card>
                                            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                            <CardBody>
                                                <CardText>Just another day in the dunya right ? But why not post about it ?</CardText>
                                                <Button tag={Link} to={'/createArticle'}>Create Post</Button>
                                            </CardBody>
                                        </Card>

                                    </Row>

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







/*

Header and footer cards available 


*/