import React from 'react';
import { Navbar } from 'react-bootstrap';
// import logo from '../../../../../public/assets/logo.jpeg';
import NavBarComponent from '../NavBarComponent';

const Header = ({isAuthenticated, onLogout}) => {
  return (
    <NavBarComponent comp='header'>
      <Navbar.Header>
        <Navbar.Brand>
          {/* <img src={logo} alt="header_logo" /> */}
        </Navbar.Brand>
        <Navbar.Brand>
          <a href="#/">Festival Planner</a>
        </Navbar.Brand>
      </Navbar.Header>
    </NavBarComponent>
  );
}

export default Header;