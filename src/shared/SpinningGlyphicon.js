import React from 'react';
import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap';
import _omit from 'lodash/omit';

const SpinningGlyphicon = styled(({ ...props }) => <Glyphicon {..._omit(props, ['spin'])} />)`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation-play-state: ${({ spin }) => (spin ? 'running' : 'paused')};
  animation-name: spin;
  animation-delay: 0s;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

export default SpinningGlyphicon;
