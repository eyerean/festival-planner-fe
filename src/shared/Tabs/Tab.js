import React from 'react';
import styled from 'styled-components';

const Tab = props => (
  <StyledTab>
    <a
      className={`${props.isActive ? 'active' : ''}`}
      onClick={event => {
        event.preventDefault();
        props.onClick(props.tabIndex);
      }}
    >
      <span>{props.title || `Tab #${props.tabIndex + 1}`}</span>
    </a>
  </StyledTab>
);

const StyledTab = styled.li`
  width: 100%;
  > a {
    cursor: pointer;
    outline: none;
    display: block;
    float: left;
    text-align: center;
    min-height: 25px;
    width: 33.3%;
    padding: 3px 10px;
    text-decoration: none;
    border-bottom: 1px solid ${props => props.theme.colors.grey};
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    transition: background 0.2s cubic-bezier(0.16, 0.53, 0.67, 0.68),
      color 0.2s cubic-bezier(0.16, 0.53, 0.67, 0.68);

    &:hover {
      background-color: ${props => props.theme.colors.grey};
    }

    &.active {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.darkerWhite};

      &:hover {
        background-color: ${props => props.theme.colors.primaryDark};
      }
    }

    > span {
      display: block;
      text-transform: uppercase;
    }

    &:hover {
      text-decoration: none;
      outline: none;
    }
  }
`;

export default Tab;
