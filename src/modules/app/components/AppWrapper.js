import styled from 'styled-components';

const AppWrapper = styled.div`
  height: ${props => props.height}px;
  background-color: ${props => props.isAuthenticated ? '#f4f7fc' : ''};
`;

export default AppWrapper;
