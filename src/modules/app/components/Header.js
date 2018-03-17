import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import NavBarComponent from './NavBarComponent';

const Header = ({isAuthenticated}) => (
  <HeaderWraper isAuthenticated={isAuthenticated}>
    Festival Planner
  </HeaderWraper>
);

export default Header;

const HeaderWraper = styled.div`
  font-size: 3em;
  color: ${props => props.isAuthenticated ? '#373f51' : '#f4f7fc'};
  padding: 30px;
  margin-left: 20px;
`;