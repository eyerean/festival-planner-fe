import styled from 'styled-components';

const AppWrapper = styled.div`
  height: ${props => props.height}px;
  background-color: ${props => props.theme.colors.antiFlashWhite};
`;

export default AppWrapper;
