import styled from 'styled-components'
import { rgba } from 'polished'

import { PRIMARY } from '~/constants/colors'
import { TableCell } from './TableCell'

export const TableRow = styled.div`
  transition: all 0.3s, height 0s;
  display: table-row;
  width: 100%;

  &:hover {
    ${TableCell} {
      background: ${rgba(PRIMARY, 0.1)};
    }
  }
`
