import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

const NavBarComponent = styled(Navbar)`
  background-color: ${props => props.comp === 'header' ? 'transparent' : (props.comp === 'nav' && '#9d5c63')}!important;
  border-radius: 1px!important;
  
  .nav > li.active > a{
    background-color: #584b53!important;
  }
  
  .navbar-header > a {
    color: black!important;
  }

  .nav > li > a {
    color: whitesmoke!important;
  }

  .nav > li > a:hover {
    background-color: #493e44!important;
    color: whitesmoke!important;
  }

  .dropdown.open > a {
    color: #584b53!important;
  }

  .dropdown-menu {
    background-color: #9d5c63!important;
  }

  .dropdown-menu > li > a {
    color: whitesmoke!important;
  }

  .dropdown-menu > li > a:hover {
    background-color: whitesmoke!important;
    color: #584b53!important;
  }
`;

export default NavBarComponent;
