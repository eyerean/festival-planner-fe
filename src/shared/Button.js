import styled, { css } from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: #993333;
  border: 2px solid #993333;

  ${props => props.primary && css`
    background: #993333;
    color: white;
  `}
`;

export default Button;