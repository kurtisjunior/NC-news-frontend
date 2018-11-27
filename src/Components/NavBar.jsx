import React, { Component } from 'react';
import { Link } from '@reach/router'

import '../css/navbar.css'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';


class NavBar extends Component {
    state = {
        isOpen: false
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            // navigation bar begins // 
            <Navbar color="light" light expand="md">
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto p-2" navbar>
                        <NavItem className='links' >
                            <NavLink tag={RouterNavLink} to="/"> Home</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Topics
                            </DropdownToggle>
                            <DropdownMenu left>
                                <DropdownItem className='links'>
                                    <NavLink tag={RouterNavLink} className='button' to='/football'> Football </NavLink>
                                </DropdownItem>
                                <DropdownItem className='links'>
                                    <NavLink tag={RouterNavLink} className='button' to='/coding'> Coding </NavLink>
                                </DropdownItem>
                                <DropdownItem className='links'>
                                    <NavLink tag={RouterNavLink} className='button' to='/cooking'> Cooking </NavLink>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Easter egg
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                <NavbarBrand className='p-2' href="/">User</NavbarBrand>
            </Navbar>
            // navigation bar ends //
        );
    }
}

export default NavBar;

{/* <NavLink tag={Link} to="/test" activeClassName="active"> */ }
