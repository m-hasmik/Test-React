import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  min-height: 200px;
  height: 100%;
  justify-content: center;
  width: 100%;

  > svg {
    animation: ${rotate} 2s linear infinite;
  }
`

const Loader = () => (
  <Wrapper>
    <FontAwesomeIcon icon={faSpinner} size="2x" />
  </Wrapper>
)

export default Loader
