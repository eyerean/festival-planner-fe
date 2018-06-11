import styled from 'styled-components';

const LoginFormWrapper = styled.div`
  width: 500px;
  height: 340px;
  padding: 20px 40px;
  border: solid ${props => props.theme.colors.ghostWhite} 1px;

  position: absolute;
  top: 50%;
  left: 50%;
  margin: 120px 0 0 -250px;

  > h2 {
    margin-bottom: 20px;
  }
`;

export default LoginFormWrapper;
