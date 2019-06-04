// @flow
import React from 'react'
import styled from 'styled-components'
import { withNamespaces } from 'react-i18next'

import Paragraph from '~/components/common/Paragraph'

const Wrapper = styled.div`
  display: flex;
  text-align: center;

  ${Paragraph} {
    text-transform: uppercase;
    font-size: 0.6rem;
    margin: 0 auto;
  }
`

type Props = {
  t: string => string
}

const Footer = ({ t }: Props) => (
  <Wrapper>
    <Paragraph>{t('printing.menu.footer.description')}</Paragraph>
  </Wrapper>
)

export default withNamespaces()(Footer)
