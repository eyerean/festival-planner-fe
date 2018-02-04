import styled from 'styled-components';

const BackgroundImage = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;

  height: ${props => props.height}px;
  display: block;
  background: url(./images/hab_mountain.jpeg) whitesmoke;
  background-size: cover;
`;

export default BackgroundImage;
