import React from 'react'
import { SelectElement } from './SelectDropdown'
import { CustomLabel, InputField } from './Components'
import Select from 'react-select'
import moment from 'moment'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import Button from '~/components/common/Button'
import DateRangePicker from '~/components/common/DateRangePicker'
import styled from 'styled-components'
import { isInclusivelyAfterDay } from '~/helpers/dates'

type Props = {
  onChange: () => void,
  handleMultiSelectChange: () => void
}

const FromContainer = styled.div`
  width: 600px;
  margin: 0 auto;
`

export default class CreateMenuForm extends React.Component<Props> {
  state = {
    startDate: null,
    endDate: null,
    centralMenus: []
  }

  handleSubmit = () => {
    let { description, concept, startDate, endDate } = this.state
    let data = {
      status: 'O',
      siteId: 'F000',
      description,
      concept,
      reference: '0000000000',
      dates: { from: startDate, to: endDate }
    }
    console.log(data)
    this.props.handleSubmitModal(data)
  }

  onChange = e => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { isFetching, menus, t } = this.props
    const { endDate, focusedInput, startDate } = this.state
    const sortedMenus = sortBy(menus, o => o.dates.from)
    const [minStartDate, maxStartDate] = [
      moment(get(sortedMenus[0], 'dates.from')),
      moment(get(sortedMenus[sortedMenus.length - 1], 'dates.from'))
    ]
    const concepts = [
      {
        label: '',
        value: ''
      },
      {
        label: 'C0017 - Sample Concept 1',
        value: 'C0017'
      },
      {
        label: 'C0018 - Sample Concept 2',
        value: 'C0018'
      },
      {
        label: 'C0019 - Sample Concept 3',
        value: 'C0019'
      }
    ]
    return (
      <FromContainer>
        <CustomLabel htmlFor="menuDescription"> Description: </CustomLabel>
        <InputField
          name={'description'}
          type={'text'}
          placeholder={'Menu Description'}
          onChange={this.onChange}
          required
        />
        <CustomLabel htmlFor="dayPart"> Concept: </CustomLabel>
        <SelectElement
          name={'concept'}
          optionsArr={concepts}
          onChange={this.onChange}
        />
        <DateRangePicker
          startDate={startDate}
          startDateId="menus_start_date_range"
          endDate={endDate}
          endDateId="menus_end_date_range"
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          }
          focusedInput={focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          showClearDates
          isOutsideRange={day =>
            !isInclusivelyAfterDay(
              day,
              minStartDate || isInclusivelyAfterDay(day, maxStartDate)
            )
          }
        />
        <br /> <br />
        <Button type="submit" role="button" onClick={this.handleSubmit}>
          Create Menu
        </Button>
      </FromContainer>
    )
  }
}
