import React, { Component } from 'react';


import '../css/error.css'


import {
    Container, Row, Col
} from 'reactstrap';


class Error extends Component {
    render() {
        return (
            <>
                <Container>
                    <Row className='error-col'>
                        <Col className='error-handling' >
                            <p>Dammit, theres been an error </p>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Error;


