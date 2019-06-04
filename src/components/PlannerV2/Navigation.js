// @flow
import React from 'react'
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


const Navigation = () => {
  return (
    <Wrapper>
      <Button>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <Button>
        <FontAwesomeIcon
          icon={faChevronRight}
          style={{ marginLeft: '.25em' }}
        />
      </Button>
      <Paragraph>
        Test
      </Paragraph>
      <SelectElement />
    </Wrapper>
  )
}

export default withNamespaces()(Navigation)
