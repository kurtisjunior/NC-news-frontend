import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { SocialIcon } from "react-social-icons";

import "../css/EasterEgg.css";

class EasterEgg extends Component {
  render() {
    const linkedIn = "https://www.linkedin.com/in/kurtis-angell-58612171/";
    const instagram = "https://www.instagram.com/kurtisangell/?hl=en";
    const github = "https://github.com/kurtisjunior";
    return (
      <Container fluid>
        <Row>
          <Col className="layout" sm="12" md={{ size: 6, offset: 3 }}>
            <a href={linkedIn} className="linkedin">
              {" "}
              <SocialIcon network="linkedin" />{" "}
            </a>
            <a href={instagram} className="instagram">
              {" "}
              <SocialIcon network="instagram" />{" "}
            </a>
            <a href={github} className="github">
              {" "}
              <SocialIcon network="github" />{" "}
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EasterEgg;
