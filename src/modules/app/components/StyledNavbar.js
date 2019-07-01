import React from 'react';
import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

const NavBar = ({ className, children }) => <Navbar className={className}>{children}</Navbar>;

const StyledNavbar = styled(NavBar)`
  background-color: ${props =>
    props.isHeader ? 'transparent' : props.isNavbar && props.theme.colors.xanadu}!important;
  border-radius: 1px !important;

  .nav > li.active > a {
    background-color: ${props => props.theme.colors.russianGreen}!important;
  }

  .navbar-header > a {
    color: ${props => props.theme.colors.black}!important;
  }

  .nav > li > a {
    color: ${props => props.theme.colors.ghostWhite}!important;
  }

  .nav > li > a:hover {
    background-color: ${props => props.theme.colors.ashGreenGrey}!important;
    color: ${props => props.theme.colors.ghostWhite}!important;
  }

  .dropdown.open > a {
    background-color: ${props => props.theme.colors.russianGreen}!important;
    color: ${props => props.theme.colors.ghostWhite}!important;
  }

  .dropdown-menu {
    background-color: ${props => props.theme.colors.xanadu}!important;
  }

  .dropdown-menu > li > a {
    color: ${props => props.theme.colors.ghostWhite}!important;
  }

  .dropdown-menu > li > a:hover {
    background-color: ${props => props.theme.colors.ashGreenGrey}!important;
    color: ${props => props.theme.colors.ghostWhite}!important;
  }
`;

export default StyledNavbar;
