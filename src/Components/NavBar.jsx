import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";

import "../css/navbar.css";

import reddit from "../utils/reddit.png";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
  Form,
  FormGroup,
  Input,
  Label,
  Alert
} from "reactstrap";

//Login needs to be set to False when deployed for authentic login functionality
class NavBar extends Component {
  state = {
    isOpen: false,
    modal: false,
    user: "",
    login: false,
    username: true
  };

  // PER THE REACT STRAP DOCS TO CONTROL COMPONENTS
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  //remeber to use arrow functions to bound 'this'
  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      // DROP DOWN MENU//
      <Navbar color="light" light expand="md" sticky={"top"}>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto p-2" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                {" "}
                Home
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Topics
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem style={{ backgroundColor: "##fff;" }} className="links">
                  <NavLink tag={Link} to="/topics/football">
                    {" "}
                    Football{" "}
                  </NavLink>
                </DropdownItem>
                <DropdownItem style={{ backgroundColor: "##fff;" }}>
                  <NavLink tag={Link} to="/topics/coding">
                    {" "}
                    Coding{" "}
                  </NavLink>
                </DropdownItem>

                <DropdownItem style={{ backgroundColor: "##fff;" }}>
                  <NavLink tag={Link} to="/topics/cooking">
                    {" "}
                    Cooking{" "}
                  </NavLink>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem style={{ backgroundColor: "##fff;" }}>
                  <NavLink tag={Link} to="/easterEgg">
                    {" "}
                    Easter Egg{" "}
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
        {/* DROP DOWN MENU ENDS  */}
        <div className="bang"> ! </div>
        <img src={reddit} className="reddit-image" alt="not reddit news" />

        {/* LOGIN MODAL BEGINS  */}
        {!this.state.login ? (
          <>
            <Button onClick={this.toggleModal}>{this.props.buttonLabel} Login</Button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggleModal}
              className={this.props.className}
            >
              <Form onSubmit={this.handleSubmit}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    {!this.state.username ? (
                      <Alert color="danger">Please enter a valid username</Alert>
                    ) : null}

                    <Label>Username</Label>
                    <Input
                      type="textarea"
                      placeholder="JessJelly"
                      onChange={this.handleChange}
                      value={this.state.user}
                    />
                    <Label>Password</Label>
                    <Input type="password" />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary"> Submit</Button>
                  <Button color="secondary" onClick={this.toggleModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            </Modal>
          </>
        ) : (
          <>
            <Link to={`users/${this.props.user.username}`}>
              <img src={this.props.user.avatar_url} className="avatar" alt="user-avatar" />{" "}
            </Link>
            <Button onClick={this.handleClick}>Logout</Button>
          </>
        )}

        {/* // LOGIN MODAL ENDS  */}
      </Navbar>
    );
  }

  handleChange = event => {
    this.setState({
      user: event.target.value
    });
  };

  handleClick = () => {
    //invloke function to clear state in app
    this.props.logout();
    this.setState({
      login: false
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    //close the login window once submitted

    api
      .getUser(this.state.user)
      .then(user => {
        this.toggleModal();

        if (user) {
          this.props.login(user);
          this.setState({
            login: true,
            username: true
          });
        }
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            username: false
          });
        } else console.log(err);
      });
  };
}

export default NavBar;

/*To change
Login has been changed to true with a permanent app state for dev purposes. 
Change for production and save logged in user to local storage. 

*/
