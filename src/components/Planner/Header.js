// @flow
import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import Card from '~/components/common/Card'
import Paragraph from '~/components/common/Paragraph'
import { getCurrentWeek, getCurrentDays } from '~/helpers/dates'
import { DAYS_FILTER, WEEK } from '~/constants/dropdown'

const DAY_FORMAT: string = 'dddd'

type Props = {
  weekDay: moment,
  hasWeekendSchedule: boolean,
  getCurrentViewValue: number
}

const Header = ({
  weekDay,
  hasWeekendSchedule,
  getCurrentViewValue
}: Props) => {
  const currentDates =
    getCurrentViewValue === DAYS_FILTER[WEEK]
      ? getCurrentWeek(weekDay, { withWeekend: hasWeekendSchedule })
      : getCurrentDays(weekDay, getCurrentViewValue)
  const headers: Array<string> = currentDates.map(
    (date: Date): string => moment(date).format(DAY_FORMAT)
  )
  return (
    <Wrapper>
      {headers.map(header => (
        <Element key={header}>
          <Paragraph>{header}</Paragraph>
        </Element>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled(Card)`
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  width: 100%;
`

const Element = styled.div`
  flex: 1;
  text-align: center;
  min-width: 150px;

  ${Paragraph} {
    margin: 0;
  }
`

export default Header
