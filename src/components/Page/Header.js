// @flow
import React from 'react'
import styled from 'styled-components'

import Title from '~/components/common/Title'
import { GRAY_MEDIUM, WHITE } from '~/constants/colors'

type Props = {
  title: string,
  actions: Array<any>
}

export const Header = ({ title, actions }: Props) => (
  <Wrapper>
    <Content data-testid="header-section">
      <Title>{title}</Title>
    </Content>
    <Actions data-testid="header-section">{actions}</Actions>
  </Wrapper>
)

const Wrapper = styled.div`
  align-items: flex-end;
  background: ${WHITE};
  border-bottom: 1px solid ${GRAY_MEDIUM};
  display: flex;
  padding: 1rem 2rem 1rem;
  width: 100%;
`

const Content = styled.div`
  flex: 1;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`
