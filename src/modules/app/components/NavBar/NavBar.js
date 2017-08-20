import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import './NavBar.css';

const NavBar = ({onLogout, username}) => {
  const title = (<span><i className="fa fa-user" /> {username}</span>);
  return (
    <Navbar className="navbarStyle">
      <Nav>
        <NavItem eventKey={1} href="#/"><i className="fa fa-key" /> Home</NavItem>
        <NavItem eventKey={2} href="#/artists"><i className="fa fa-car" /> Artists</NavItem>
        <NavItem eventKey={3} href="#/sound"><i className="fa fa-gear" /> Sound</NavItem>
        <NavItem eventKey={4} href="#/visual"><i className="fa fa-gear" /> Visual</NavItem>
        <NavItem eventKey={5} href="#"><i className="fa fa-pencil" /> Admin Panel</NavItem>
      </Nav>
      <Nav pullRight>
        <NavDropdown eventKey={6} title={title} id="basic-nav-dropdown">          
          <MenuItem eventKey={6.1}>Account</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={6.2} onClick={onLogout}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default NavBar;