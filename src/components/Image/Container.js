import styled from 'styled-components'

import { WHITE } from '~/constants/colors'

export const Container = styled.div`
  background: ${WHITE};
  border: 1px solid #dbe4e2;
  border-radius: 7px;
  display: inline-block;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 160px;

  img {
    display: block;
    min-height: 160px;
    width: auto;
  }
`
