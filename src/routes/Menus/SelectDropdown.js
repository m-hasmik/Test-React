//@flow
import React from 'react'
import { GRAY_DARK, GRAY_MEDIUM_DARK } from '~/constants/colors'
import styled from 'styled-components'

type SelectDropdownProps = {
  name: string,
  onChange: Object => void,
  value: string,
  optionTxt: string,
  optionsArr: Array<string>
}

const SelectWrapper = styled.div``

const commonSelectStyles = `
  flex: 1;
  display: block;
  font-family: Poppins, sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${GRAY_DARK};
  background-clip: padding-box;
  border: 1px solid ${GRAY_MEDIUM_DARK};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
  outline:none;
  border:1px solid #2684FF;
  box-shadow: 0 0 0 1px  #2684FF;
`

const Select = styled.select`
  width: 600px;
  height: 40px;
  margin: 0.4rem 0 1.5rem 0;
  padding: 0 1rem 0 1rem;
  ${commonSelectStyles}
`

const SelectWeeks = styled.select`
  ${commonSelectStyles}
`

export const SelectElement = ({
  name,
  onChange,
  optionsArr
}: SelectDropdownProps) => {
  const options = optionsArr.map((item, i) => {
    return (
      <option value={item.value} key={`${i}${item}`}>
        {' '}
        {item.value == '' ? 'Select...' : item.label}
      </option>
    )
  })
  return (
    <SelectWrapper>
      <Select name={name} onChange={onChange} optionsArr={optionsArr} required>
        {options}
      </Select>
    </SelectWrapper>
  )
}

export const SelectElementWeeks = ({
  name,
  onChange,
  optionsArr
}: SelectDropdownProps) => {
  const options = optionsArr.map((item, i) => {
    return (
      <option value={item} key={`${i}${item}`}>
        {' '}
        {item == '' ? 'Select...' : item}
      </option>
    )
  })
  return (
    <SelectWrapper>
      <SelectWeeks
        name={name}
        onChange={onChange}
        optionsArr={optionsArr}
        required
      >
        {options}
      </SelectWeeks>
    </SelectWrapper>
  )
}
