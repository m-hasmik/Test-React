import React from 'react'
import styled from 'styled-components'
import { withNamespaces } from 'react-i18next'

import Paragraph from '~/components/common/Paragraph'

const Wrapper = styled.ul`
  padding: 0 0.5rem;
`
const Item = styled.li`
  ${Paragraph} {
    font-size: 0.8rem;
  }
`

type Props = {
  t: string => string
}

class Summary extends React.Component<Props> {
  render() {
    const { t } = this.props
    return (
      <Wrapper>
        <Item>
          <Paragraph>{t('planning.section.summary.quantity')}: 2</Paragraph>
        </Item>
        <Item>
          <Paragraph>{t('planning.section.summary.total')}: 2</Paragraph>
        </Item>
      </Wrapper>
    )
  }
}

export default withNamespaces()(Summary)
