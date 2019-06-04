// @flow
import React from 'react'
import styled from 'styled-components'
import { withNamespaces } from 'react-i18next'

import Paragraph from '~/components/common/Paragraph'
import { GRAY_MEDIUM } from '~/constants/colors'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${GRAY_MEDIUM};
  padding: 3rem 0.5rem;
  text-align: center;
  width: 100%;
`

type Props = {
  t: string => string
}

const EmptyState = ({ t }: Props) => (
  <Wrapper>
    <Paragraph>{t('planning.empty.description')}</Paragraph>
  </Wrapper>
)

export default withNamespaces()(EmptyState)
