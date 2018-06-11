import styled from 'styled-components';

const AppWrapper = styled.div`
  height: ${props => props.height}px;
  background-color: ${props => (props.isAuthenticated ? props.theme.colors.ghostWhite : '')};
`;

export default AppWrapper;
