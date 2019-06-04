// @flow
import React from 'react'
import styled from 'styled-components'

import Loader from '~/components/common/Loader'
import { TableCell } from './TableCell'

const FullWidthTableCell = styled(TableCell)`
  caption-side: bottom;
  display: table-caption;
  text-align: center;
  width: 100%;
`

type Props = {
  cells: number
}

export const ContentLoading = ({ cells = 1 }: Props) => (
  <FullWidthTableCell cells={cells}>
    <Loader />
  </FullWidthTableCell>
)
