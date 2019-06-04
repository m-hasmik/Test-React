import styled from 'styled-components'

import { GRAY_LIGHT } from '~/constants/colors'

export const TableCell = styled.div`
  border-bottom: 1px solid ${GRAY_LIGHT};
  display: table-cell;
  padding: 1rem;
  text-align: left;
  transition: background 0.3s ease, border-color 0.3s ease;
`
