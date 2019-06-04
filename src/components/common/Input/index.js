import styled from 'styled-components'
import { rgba } from 'polished'

import { BLACK, GRAY_MEDIUM, PRIMARY, WHITE } from '~/constants/colors'

const Input = styled.input`
  box-sizing: border-box;
  margin: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  width: 100%;
  height: 2rem;
  padding: 0.2rem 0.75rem;
  color: ${rgba(BLACK, 0.65)};
  font-size: 0.9rem;
  line-height: 1.5;
  background-color: ${WHITE};
  background-image: none;
  border: 1px solid ${GRAY_MEDIUM};
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    border-color: ${PRIMARY};
  }

  &:active {
    border-color: ${PRIMARY};
    outline: 0;
    box-shadow: 0 0 0 2px ${rgba(PRIMARY, 0.2)};
  }

  &:placeholder-shown {
    color: ${GRAY_MEDIUM};
    text-overflow: ellipsis;
  }
`

export default Input
