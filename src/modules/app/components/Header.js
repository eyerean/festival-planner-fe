import React from 'react';
import styled from 'styled-components';

const Header = ({isAuthenticated}) => (
  <StyledHeader isAuthenticated={isAuthenticated}>
    Festival Planner
  </StyledHeader>
);

export default Header;

const StyledHeader = styled.div`
  font-size: 3em;
  color: ${props => props.isAuthenticated ? '#373f51' : '#f4f7fc'};
  padding: 30px;
  margin-left: 20px;
`;