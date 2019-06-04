import styled from 'styled-components'

import { WHITE } from '~/constants/colors'

const Card = styled.div`
  background: ${WHITE};
  border-radius: 2px;
  display: inline-block;
  font-size: 14px;
  line-height: 1.5;
  list-style: none;
  margin: 0.5rem;
  padding: 0.5rem;
  position: relative;
  transition: all 0.3s;
`

export default Card
