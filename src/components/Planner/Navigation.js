// @flow
import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { withNamespaces } from 'react-i18next'
import Button from '~/components/common/Button'
import Paragraph from '~/components/common/Paragraph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { SelectElement } from './SelectDropdown'
import { DAYS_FILTER, WEEK, ONE_DAY } from '~/constants/dropdown'

type Props = {
  t: string => string,
  setNext: moment => void,
  title: string,
  setPrevious: moment => void,
  onChange: () => void,
  count: number
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${Button} {
    flex: 1;
    max-width: 70px;
    font-size: 1rem;
  }

  ${Paragraph} {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
    text-align: center;
    font-weight: 400;
    padding-right: 5rem;
  }
`
const DATE_FORMAT: string = 'MMMM Do'
const formatDate = (date: moment): string => moment(date).format(DATE_FORMAT)

const setTitle = (date: moment, connector: string, count: number): string => {
  if (count === DAYS_FILTER[WEEK]) {
    const startOfWeek = date.clone().startOf('isoWeek')
    const endOfWeek = date.clone().endOf('isoWeek')
    return `${formatDate(startOfWeek)} ${connector} ${formatDate(endOfWeek)}`
  }
  const startDate = date
  const endDate = date.clone().add(count - 1, 'd')
  return count === DAYS_FILTER[ONE_DAY]
    ? `${formatDate(startDate)}`
    : `${formatDate(startDate)} ${connector} ${formatDate(endDate)}`
}

const Navigation = ({
  setNext,
  title,
  setPrevious,
  t,
  onChange,
  count
}: Props) => {
  return (
    <Wrapper>
      <Button onClick={setPrevious}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <Button onClick={setNext}>
        <FontAwesomeIcon
          icon={faChevronRight}
          style={{ marginLeft: '.25em' }}
        />
      </Button>
      <Paragraph>
        {setTitle(title, t('planning.navigation.title.connector'), count)}
      </Paragraph>
      <SelectElement onChange={onChange} />
    </Wrapper>
  )
}

export default withNamespaces()(Navigation)
