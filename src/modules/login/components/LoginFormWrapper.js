import styled from 'styled-components';

const LoginFormWrapper = styled.div`
  width: 500px;
  // height: 250px;
  margin: 200px auto;
  display: block;
  padding: 40px;
  background-color: ${props => props.theme.colors.ghostWhite};
  color: ${props => props.theme.colors.charcoal};
  border: solid 2px ${props => props.theme.colors.tuscanRed};
  border-radius: 2px;

  > h2 {
    margin-bottom: 20px;
  }
`;

export default LoginFormWrapper;
