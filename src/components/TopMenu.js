/* eslint-disable no-unused-vars */
import React, { Component } from "react";
// import {FaAlignRight} from 'react-icons/fa'
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Logo from "../images/logo.svg";

export default class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  handleToggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <img src={Logo} alt="Beach Resort" />
          </NavbarBrand>
          <NavbarToggler onClick={() => this.handleToggle()} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="mx-2">
                  <Link to="/"> Home</Link>
              </NavItem>
              <NavItem className="mx-2">
                  <Link to="/rooms">Rooms</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
