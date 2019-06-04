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
import { SelectElementWeeks } from './SelectDropdown'
import { WEEKS_MOCK } from './DropdownOptions'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;

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
type Props = {
  setNext: moment => void,
  setPrevious: moment => void,
  onChange: () => void,
  optionsArr: Array<string>,
  name: string
}

const Navigation = ({ setNext, setPrevious }: Props) => {
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
      <Paragraph>{`Week 1`}</Paragraph>
      <SelectElementWeeks
        name={'cyclePeriod'}
        optionsArr={WEEKS_MOCK}
        onChange={() => {}}
        optionTxt={''}
        value={''}
      />
    </Wrapper>
  )
}

export default withNamespaces()(Navigation)
