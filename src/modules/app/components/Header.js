import React from 'react';
import styled from 'styled-components';

const Header = ({ isAuthenticated, onHeaderClick }) => (
  <StyledHeader isAuthenticated={isAuthenticated} onClick={onHeaderClick}>
    <span role="img" aria-label="balloon">
      🤘
    </span>{' '}
    Festival Planner
  </StyledHeader>
);

export default Header;

const StyledHeader = styled.a`
  display: inline-block;
  font-size: 3em;
  padding: 18px;
  color: ${props => props.theme.colors.darkSpaceSparkle};

  &:hover {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
`;
