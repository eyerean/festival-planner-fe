import styled, { css } from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  padding: 0.5em 1em;
  margin: 1em 0;
  background: transparent;
  color: #9d5c63;
  border: 1px solid #9d5c63;
  border-radius: 1px;

  :hover {
    background-color: #83474e;
    color: #f4f7fc;
    border-color: #83474e;
  }

  ${props => props.primary && css`
    background: #9d5c63;
    color: #f4f7fc; 

    :hover {
      background: #83474e;
      border-color: #83474e;
    }
  `}

  ${props => props.disabled && css`
    background: #9d5c63;
    color: #f4f7fc; 
    cursor: not-allowed!important;
    :hover {
      background: #9d5c63;
      color: white; 
      border-color: #9d5c63;
    }
  `}
`;

export default Button;