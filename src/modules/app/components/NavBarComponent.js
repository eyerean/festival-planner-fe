import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

const NavBarComponent = styled(Navbar)`
  background-color: ${props => props.comp === 'header' ? 'transparent' : (props.comp === 'nav' && '#993333')}!important;
  
  .nav > li.active > a{
    background-color: #990000!important;
  }
  
  .navbar-header > a {
    color: black!important;
  }

  .nav > li > a {
    color: whitesmoke!important;
  }

  .nav > li > a:hover {
    background-color: #900000!important;
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
