import styled, { css } from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  padding: 0.5em 1em;
  margin: 1em 0;
  background: transparent;
  color: ${props => props.theme.colors.xanadu};
  border: 1px solid ${props => props.theme.colors.xanadu};
  border-radius: 1px;
  min-width: 100px;

  :hover {
    background-color: ${props => props.theme.colors.russianGreen};
    color: ${props => props.theme.colors.ghostWhite};
    border-color: ${props => props.theme.colors.russianGreen};
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
      background: ${props => props.theme.colors.xanadu};
      color: ${props => props.theme.colors.ghostWhite};

      :hover {
        background: ${props => props.theme.colors.russianGreen};
        border-color: ${props => props.theme.colors.russianGreen};
      }
    `}

  ${props =>
    props.disabled &&
    css`
      background: ${props => props.theme.colors.xanadu};
      color: ${props => props.theme.colors.ghostWhite};
      cursor: not-allowed !important;

      :hover {
        background: ${props => props.theme.colors.xanadu};
        color: ${props => props.theme.colors.ghostWhite};
        border-color: ${props => props.theme.colors.xanadu};
      }
    `}
`;

export default Button;
