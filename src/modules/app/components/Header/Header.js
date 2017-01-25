import React from 'react';
import { Navbar } from 'react-bootstrap';
// import logo from '../../../../../public/assets/logo.jpeg';
import './Header.css';

const Header = ({isAuthenticated, onLogout, username}) => {
  const title = (<span><i className="fa fa-user" /> {username}</span>);
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          {/* <img src={logo} alt="header_logo" /> */}
        </Navbar.Brand>
        <Navbar.Brand>
          <a href="#/">Festival Planner</a>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
}

export default Header;