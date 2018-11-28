import React, { Component } from 'react';
import * as api from '../api'

import NavBar from '../Components/NavBar'
import Comments from '../Components/Comments'

import '../css/article.css'


// NOTE** should the fragment be changed to a div for styling purposes ?


import {
    Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, ListGroup, ListGroupItem, Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';



class Article extends Component {
    state = {
        singleArticle: [],
        body: '',
        loading: true
    }
    render() {
        const { singleArticle, loading } = this.state
        return (
            loading ? (
                <p>loading</p>
            ) : (
                    <>
                        <NavBar />
                        <Container className='single-article' >
                            <Row  >

                                <Card style={{ width: "80%" }} className='text-left' >
                                    <CardTitle>{singleArticle.title}</CardTitle>
                                    <CardText> {singleArticle.body} </CardText>

                                </Card>

                                {/* SIDEBAR */}
                                <Col className='article-sidebar'> sidebar </Col>
                                {/* SIDEBAR FINISH */}

                                <Card style={{ width: "80%" }} className="text-left" >
                                    {/* <CardTitle>Form to post </CardTitle> */}
                                    {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}



                                    <Form >
                                        <FormGroup row>

                                            {/* USE THIS FOR CREATE COMMENT */}

                                            {/* <Col sm={10}>
                                                <Input type="select" name="select" id="exampleSelect" >
                                                    <option disabled> Select</option>
                                                    <option>Football</option>
                                                    <option>Coding</option>
                                                    <option>Cooking</option>
                                                </Input>
                                            </Col> */}
                                        </FormGroup>

                                        <FormGroup row>
                                            <Col sm={10}>
                                                <Input type="textarea" name="text" id="exampleText" placeholder='What are you thinking ?' onChange={this.onChange} />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup >
                                            <Col sm={{ size: 0.5, offset: 0 }}>
                                                <Button>Post</Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </Card>

                                <Card style={{ width: "80%" }} className="text-left">
                                    <CardTitle className='text-center'>Comments</CardTitle>
                                    {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}

                                    {/* COMMENTS COMPONENT  */}
                                    <Comments articleId={singleArticle._id} />

                                </Card>

                            </Row>
                        </Container>
                    </>
                )

        );
    }


    componentDidMount() {
        this.fetchSingleArticle()
    }


    fetchSingleArticle = () => {
        api.getArticle(this.props.id)
            .then(singleArticle => {
                this.setState({
                    singleArticle,
                    loading: false
                })
            })
    }
}

export default Article;