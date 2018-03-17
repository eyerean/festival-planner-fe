import styled from 'styled-components';

const LoginWrapper = styled.div`
  position: relative;

  //Full page responsive background image
  img.bg {
    // Set rules to fill background
    min-height: 100%;
    min-width: 1280px;

    // Set up proportionate scaling
    width: 100%;
    height: auto;

    // Set up positioning
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

export default LoginWrapper;