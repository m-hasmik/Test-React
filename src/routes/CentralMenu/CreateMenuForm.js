import React from 'react'
import { DAY_PART, SECTOR, CYCLE_PERIOD, DISH_TYPE } from './DropdownOptions'
import { SelectElement } from './SelectDropdown'
import { CustomLabel, InputField } from './Components'
import Select from 'react-select'
import Button from '~/components/common/Button'
import styled from 'styled-components'

type Props = {
  onChange: () => void,
  handleMultiSelectChange: () => void
}

const FromContainer = styled.div`
  width: 600px;
  margin: 0 auto;
`

export default class CreateMenuForm extends React.Component<Props> {
  state = {}
  render() {
    return (
      <FromContainer>
        <CustomLabel htmlFor="menuDescription"> Menu Description: </CustomLabel>
        <InputField
          name={'menuDescription'}
          type={'text'}
          placeholder={'Menu Description'}
          onChange={this.props.onChange}
          required
        />
        <CustomLabel htmlFor="dayPart"> Daypart: </CustomLabel>
        <SelectElement
          name={'dayPart'}
          optionsArr={DAY_PART}
          onChange={this.props.onChange}
        />
        <CustomLabel htmlFor="sector"> Sector: </CustomLabel>
        <SelectElement
          name={'sector'}
          optionsArr={SECTOR}
          onChange={this.props.onChange}
        />
        <CustomLabel htmlFor="cyclePeriod"> CyclePeriod (Weeks): </CustomLabel>
        <SelectElement
          name={'cyclePeriod'}
          optionsArr={CYCLE_PERIOD}
          onChange={this.props.onChange}
        />
        <CustomLabel htmlFor="selectedOptions">
          {'Select the dish type you want to add: '}
        </CustomLabel>
        <Select
          required
          defaultValue={[]}
          isMulti
          name={'selectedOptions'}
          options={DISH_TYPE}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={this.props.handleMultiSelectChange}
        />
        <Button type="submit" role="button">
          Create Menu
        </Button>
      </FromContainer>
    )
  }
}
