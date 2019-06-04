//@flow
import React from 'react'
import { Content, Wrapper } from './Components'
import Card from '~/components/common/Card'
import Form from './Form.js'

type Props = {}
export default class ModalContent extends React.Component<Props> {
  render() {
    return (
      <Content>
        <Wrapper>
          <Card>
            <Form />
          </Card>
        </Wrapper>
      </Content>
    )
  }
}
