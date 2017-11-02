import styled, { css } from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  padding: 0.5em 1em;
  margin: 1em 0;
  background: transparent;
  color: #993333;
  border: 2px solid #993333;

  :hover {
    background-color: #990000;
    color: whitesmoke;
    border-color: #990000;
  }

  ${props => props.primary && css`
    background: #993333;
    color: whitesmoke; 

    :hover {
      background: #990000;
      border-color: #990000;
    }
  `}

  ${props => props.disabled && css`
    background: #993333;
    color: white; 
    cursor: not-allowed!important;
    :hover {
      background: #993333;
      color: white; 
      border-color: #993333;
    }
  `}
`;

export default Button;