// @flow
import React from 'react'
import { withNamespaces } from 'react-i18next'

import Paragraph from '~/components/common/Paragraph'
import Link from '~/components/common/Link'
import { getDomainPath } from '~/helpers/url'
import { Container, StatusCode, SubHeader, Wrapper } from './Components'

type Props = {
  t: string => string
}

const NoMatch = ({ t }: Props) => (
  <Container>
    <Wrapper>
      <StatusCode>
        <h1>{t('app.noMatch.code')}</h1>
      </StatusCode>
      <SubHeader>{t('app.noMatch.title')}</SubHeader>
      <Paragraph>{t('app.noMatch.explanation')}</Paragraph>
      <Link to={`${getDomainPath()}/`}>{t('app.noMatch.link')}</Link>
    </Wrapper>
  </Container>
)

export default withNamespaces()(NoMatch)
