import React from 'react';
import styled from 'styled-components';

const VerticalTab = props => (
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
    height: 100px;
    padding: 40px 0;
    text-decoration: none;
    border-bottom: 1px solid ${props => props.theme.colors.gray};
    background-color: transparent;
    color: ${props => props.theme.colors.desireRed};
    transition: background 0.2s cubic-bezier(0.16, 0.53, 0.67, 0.68),
      color 0.2s cubic-bezier(0.16, 0.53, 0.67, 0.68);

    &:hover {
      background-color: ${props => props.theme.colors.gray};
    }

    &.active {
      background-color: ${props => props.theme.colors.desireRed};
      color: ${props => props.theme.colors.ghostWhite};

      &:hover {
        background-color: ${props => props.theme.colors.tuscanRed};
      }
    }

    > span {
      display: block;
      -webkit-transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      -o-transform: rotate(-90deg);
      transform: rotate(-90deg);

      text-transform: uppercase;
    }

    &:hover {
      text-decoration: none;
      outline: none;
    }
  }

  &:nth-child(2) > a > span {
    margin-top: 5px;
  }

  &:nth-child(3) > a > span {
    margin-top: 5px;
  }
`;

export default VerticalTab;
