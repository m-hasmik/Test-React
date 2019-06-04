import React from 'react'
import { GRAY_DARK, GRAY_MEDIUM_DARK } from '~/constants/colors'
import styled from 'styled-components'
import { WEEK, THREE_DAYS, ONE_DAY } from '~/constants/dropdown'

type SelectDropdownProps = {
  onChange: Object => void
}

const SelectWrapper = styled.div`
  width: 5rem;
`

const Select = styled.select`
  flex: 1;
  display: block;
  font-family: Poppins, sans-serif;
  margin: 0.5rem 0.7rem 0.5rem 0;
  padding: 0.375rem 0.75rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${GRAY_DARK};
  background-clip: padding-box;
  border: 1px solid ${GRAY_MEDIUM_DARK};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`

export const SelectElement = ({ onChange }: SelectDropdownProps) => {
  return (
    <SelectWrapper>
      <Select id="viewFilters" onChange={onChange}>
        <option value={WEEK}> {WEEK}</option>
        <option value={THREE_DAYS}> {THREE_DAYS}</option>
        <option value={ONE_DAY}> {ONE_DAY} </option>
      </Select>
    </SelectWrapper>
  )
}
