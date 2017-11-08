import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import NavBarComponent from './NavBarComponent';
// import logo from '../../../../../public/assets/logo.jpeg';

const Header = ({isAuthenticated, onLogout}) => {
  return (
    <NavBarComponent comp='header'>
      <Navbar.Header>
        <Navbar.Brand>
          {/* <img src={logo} alt="header_logo" /> */}
        </Navbar.Brand>
        <Navbar.Brand>
          <Link to='/'>Festival Planner</Link>
        </Navbar.Brand>
      </Navbar.Header>
    </NavBarComponent>
  );
}

export default Header;