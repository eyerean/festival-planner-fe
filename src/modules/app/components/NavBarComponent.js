import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

const NavBarComponent = styled(Navbar)`
  background-color: ${props => props.comp === 'header' ? '#f2f2f2' : (props.comp === 'nav' && '#993333')}!important;
  .nav > li > a {
    color: whitesmoke!important;
  }

  .navbar-header > a {
    color: black!important;
  }

  .nav > li > a:hover {
    background-color: #990000!important;
    color: whitesmoke!important;
  }
  .dropdown.open > a {
    color: #990000!important;
  }

  .dropdown-menu {
    background-color: #993333!important;
  }

  .dropdown-menu > li > a {
    color: whitesmoke!important;
  }

  .dropdown-menu > li > a:hover {
    background-color: whitesmoke!important;
    color: #990000!important;
  }

`;

export default NavBarComponent;
