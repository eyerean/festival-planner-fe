import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import NavBarComponent from './NavBarComponent';

const Header = ({isAuthenticated, onLogout}) => {
  return (
    <HeaderWraper>
      Festival Planner
    </HeaderWraper>
  );
}

export default Header;

const HeaderWraper = styled.div`
  font-size: 40px;
  color: whitesmoke;
  padding: 30px;
  margin-left: 20px;
`;