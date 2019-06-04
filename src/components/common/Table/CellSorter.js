// @flow
import React from 'react'
import styled from 'styled-components'

import type { directions } from '~/types/list'
import { PRIMARY, GRAY_DARK } from '~/constants/colors'

const Button = styled.button`
  background: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 2;
  outline: none;
  text-align: left;
  width: 100%;

  &:active {
    color: ${GRAY_DARK};
  }
`

const Indicator = styled.div`
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 5px 8px 5px;
  border-color: transparent transparent
    ${props => (props.direction ? PRIMARY : 'transparent')} transparent;
  transform: ${props =>
    props.direction === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)'};
`

type Props = {
  children: any,
  direction?: directions,
  sort: string => void
}

export const CellSorter = ({ children, direction, sort }: Props) => {
  return (
    <Button onClick={sort}>
      <span>{children}</span> <Indicator direction={direction} />
    </Button>
  )
}
