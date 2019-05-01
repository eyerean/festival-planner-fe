import styled, { css } from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  padding: 0.5em 1em;
  margin: 1em 0;
  background: transparent;
  color: ${props => props.theme.colors.roseDust};
  border: 1px solid ${props => props.theme.colors.roseDust};
  border-radius: 1px;
  min-width: 100px;

  :hover {
    background-color: ${props => props.theme.colors.tuscanRed};
    color: ${props => props.theme.colors.ghostWhite};
    border-color: ${props => props.theme.colors.tuscanRed};
  }

  ${props =>
    props.big &&
    `
    font-size: 1.3em;
    padding: 15px;
    margin: 0 20px 20px;
    `}

  ${props =>
    props.primary &&
    css`
      background: ${props => props.theme.colors.roseDust};
      color: ${props => props.theme.colors.ghostWhite};

      :hover {
        background: ${props => props.theme.colors.tuscanRed};
        border-color: ${props => props.theme.colors.tuscanRed};
      }
    `}

  ${props =>
    props.disabled &&
    css`
      background: ${props => props.theme.colors.roseDust};
      color: ${props => props.theme.colors.ghostWhite};
      cursor: not-allowed !important;

      :hover {
        background: ${props => props.theme.colors.roseDust};
        color: ${props => props.theme.colors.ghostWhite};
        border-color: ${props => props.theme.colors.roseDust};
      }
    `}
`;

export default Button;
