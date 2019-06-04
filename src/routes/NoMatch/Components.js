import styled from 'styled-components'

import CommonSubheader from '~/components/common/SubHeader'

export const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`

export const Wrapper = styled.div`
  left: 50%;
  max-width: 920px;
  padding: 0 1rem;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`

export const StatusCode = styled.div`
  height: 100px;
  left: 50%;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  z-index: -1;

  h1 {
    color: #ececec;
    font-size: 276px;
    font-weight: 900;
    left: 50%;
    margin: 0px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);

    @media only screen and (max-width: 480px) {
      font-size: 162px;
    }
  }
`

export const SubHeader = styled(CommonSubheader)`
  font-size: 46px;

  @media only screen and (max-width: 480px) {
    font-size: 26px;
  }
`
