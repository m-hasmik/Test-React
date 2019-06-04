import styled from 'styled-components'

import { BLACK, GRAY_LIGHT, GRAY_DARK } from '~/constants/colors'
import { TableCell } from './TableCell'
import { TableRow } from './TableRow'

export const TableHeader = styled.div`
  display: table-row-group;
  width: 100%;

  ${TableRow}:hover {
    ${TableCell} {
      background: ${GRAY_LIGHT};
    }
  }

  ${TableCell} {
    font-weight: 600;
    background: ${GRAY_LIGHT};
    color: ${BLACK};
    padding: 0 1rem;
    border-bottom: 1px solid ${GRAY_LIGHT};

    &:hover {
      border-bottom-color: ${GRAY_DARK};
    }
  }
`
