import React from 'react';
import {Nav,Navbar,NavDropdown,NavItem, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class Header extends  React.Component{
    render() {
        return(
        <Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <Link to="/">Home</Link>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} >
      <Link to="/notes">Notes</Link>
    </NavItem>
    <NavItem eventKey={2} href ="/upvotetrend" >
        Search
    </NavItem>
    <NavItem eventKey={3} href="/weeklyheatmap">
            Cheat Sheet
    </NavItem>
    <NavItem eventKey={5}  href="/login">
        Logout
    </NavItem>
  </Nav>
</Navbar>
        );
    }
};
export {Header};