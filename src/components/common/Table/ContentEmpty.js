// @flow
import React from 'react'
import styled from 'styled-components'

import { TableCell } from './TableCell'

const FullWidthTableCell = styled(TableCell)`
  caption-side: bottom;
  display: table-caption;
  text-align: center;
  width: 100%;
`

type Props = {
  cells: number,
  text: string
}

export const ContentEmpty = ({ cells = 1, text = '' }: Props) => (
  <FullWidthTableCell cells={cells}>{text}</FullWidthTableCell>
)
