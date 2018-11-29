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



                                    <Form onSubmit={this.handleSubmit} >
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
                                                <Input type="textarea" name="text" id="exampleText" placeholder='What are you thinking ?' value={this.state.body} onChange={this.handleChange} />
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

    handleChange = (event) => {
        this.setState({
            body: event.target.value
        })
    }



    // WAITING FOR LOG-IN
    handleSubmit = (event) => {
        event.preventDefault()
        api.postComment(this.state.body, this.state.singleArticle._id)
    }
}

export default Article;





{/* <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
    <Form onSubmit={handleSubmit(this.toggle)}>
        <ModalHeader toggle={this.toggle}>Share</ModalHeader>
        <ModalBody>
            <FormGroup row>
                <CheckBoxInputField data={this.state.measurements} handleFieldChange={this.handleFieldChange} />
            </FormGroup>
            <FormGroup row>
                <Label for="email" xs={2}>Email</Label>
                <Col xs={10}>
                    <FormEmail {...email} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="message" xs={2}>Message</Label>
                <Col xs={10}>
                    <Input type="textarea" name="message" id="message" />
                </Col>
            </FormGroup>

        </ModalBody>
        <ModalFooter>
            <Button action="submit" color="primary" value={true}>OK</Button>
            <Button color="secondary" onClick={this.toggle} value={false}>Cancel</Button>
        </ModalFooter>
    </Form>
</Modal> */}