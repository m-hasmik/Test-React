import styled from 'styled-components'

import Item from '~/components/common/Item'
import { GRAY_MEDIUM } from '~/constants/colors'

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 150px;
  background: ${GRAY_MEDIUM};

  ${Item} {
    width: inherit;
    margin: 0 0 0.5rem;
  }
`

export default Column
