import React from 'react';
// import { Link } from 'react-router-dom';
import { Nav, /* NavItem, */ NavDropdown, MenuItem } from 'react-bootstrap';
import StyledNavbar from './StyledNavbar';

const MenuBar = ({ onLogout, user, location }) => {
  return (
    <StyledNavbar isNavbar>
      {/*<Nav>
        <NavItem componentClass={Link} href="/" to="/" active={location.pathname === '/'}>
          Overview
        </NavItem>
        <NavItem
          componentClass={Link}
          href="/artists"
          to="/artists"
          active={location.pathname === '/artists'}
        >
          Artists
        </NavItem>
        <NavItem
          componentClass={Link}
          href="/sound"
          to="/sound"
          active={location.pathname === '/sound'}
        >
          Sound
        </NavItem>
        <NavItem
          componentClass={Link}
          href="/visual"
          to="/visual"
          active={location.pathname === '/visual'}
        >
          Visual
        </NavItem>
        <NavItem
          componentClass={Link}
          href="/planner"
          to="/planner"
          active={location.pathname === '/planner'}
        >
          Planner
        </NavItem>
      </Nav>*/}
      <Nav pullRight>
        <NavDropdown title={user} id="basic-nav-dropdown">
          <MenuItem>Account</MenuItem>
          <MenuItem>Administration</MenuItem>
          <MenuItem divider />
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    </StyledNavbar>
  );
};

export default MenuBar;
