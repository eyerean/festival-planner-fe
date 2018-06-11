import React from 'react';
import styled from 'styled-components';

const Header = ({ isAuthenticated }) => (
  <StyledHeader isAuthenticated={isAuthenticated}>
    <span role="img" aria-label="balloon">
      🎈
    </span>{' '}
    Festival Planner
  </StyledHeader>
);

export default Header;

const StyledHeader = styled.div`
  font-size: 3em;
  padding: 18px;
  color: ${props =>
    props.isAuthenticated ? props.theme.colors.charcoal : props.theme.colors.ghostWhite};
`;
