import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { BLACK } from '~/constants/colors'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
`

export const SuggestionItem = styled(Link)`
  text-decoration: none;
  color: ${BLACK};
`
