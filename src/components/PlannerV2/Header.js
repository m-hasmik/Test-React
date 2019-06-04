// @flow
import React from 'react'
import styled from 'styled-components'
import Card from '~/components/common/Card'
import Paragraph from '~/components/common/Paragraph'

const Header = () => {
  const headers = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ]
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
