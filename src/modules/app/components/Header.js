import React from 'react';
import styled from 'styled-components';

const Header = ({ isAuthenticated }) => (
  <StyledHeader isAuthenticated={isAuthenticated}>Festival Planner</StyledHeader>
);

export default Header;

const StyledHeader = styled.div`
  font-size: 3em;
  color: ${props =>
    props.isAuthenticated ? props.theme.colors.charcoal : props.theme.colors.ghostWhite};
  padding: 30px;
  margin-left: 20px;
`;
