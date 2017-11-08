import React from 'react';
import { Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import NavBarComponent from './NavBarComponent';

const NavBar = ({onLogout, user}) => {
  const title = (<span><i className="fa fa-user" /> {user}</span>);
  return (
    <NavBarComponent comp='nav'>
      <Nav>
        <NavItem eventKey={1} href="#/"><i className="fa fa-key" /> Dashboard</NavItem>
        <NavItem eventKey={2} href="#/artists"><i className="fa fa-car" /> Artists</NavItem>
        <NavItem eventKey={3} href="#/sound"><i className="fa fa-gear" /> Sound</NavItem>
        <NavItem eventKey={4} href="#/visual"><i className="fa fa-gear" /> Visual</NavItem>
        <NavItem eventKey={5} href="#/planner"><i className="fa fa-pencil" /> Planner</NavItem>
      </Nav>
      <Nav pullRight>
        <NavDropdown eventKey={6} title={title} id="basic-nav-dropdown">          
          <MenuItem eventKey={6.1}>Account</MenuItem>
          <MenuItem eventKey={6.1}>Administration</MenuItem> {/* only for admins (duh) */}
          <MenuItem divider />
          <MenuItem eventKey={6.2} onClick={onLogout}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    </NavBarComponent>
  );
}

export default NavBar;
