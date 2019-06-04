import styled from 'styled-components'

import { PRIMARY } from '~/constants/colors'

const Indicator = styled.div`
  @keyframes statusProcessing {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }

    to {
      transform: scale(2.4);
      opacity: 0;
    }
  }
  background-color: ${PRIMARY};
  border-radius: 50%;
  display: inline-block;
  height: 6px;
  position: relative;
  top: -1px;
  vertical-align: middle;
  width: 6px;

  &::after {
    animation: statusProcessing 1.2s ease-in-out infinite;
    border-radius: 50%;
    border: 1px solid ${PRIMARY};
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

export default Indicator
