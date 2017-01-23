import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
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
      {isAuthenticated && <Nav>
          <NavItem eventKey={2} href="#"><i className="fa fa-car" /> Another Thing</NavItem>
          <NavItem eventKey={3} href="#"><i className="fa fa-question" /> Omgthirdthing</NavItem>
        </Nav>
      }
      {isAuthenticated && <Nav pullRight>
          <NavDropdown eventKey={4} title={title} id="basic-nav-dropdown">          
            <MenuItem eventKey={4.1}>Action</MenuItem>
            <MenuItem eventKey={4.2}>Another action</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={4.3} onClick={onLogout}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      }
    </Navbar>
  );
}

export default Header;