//@flow
import React from 'react'
import { Content, Wrapper } from './Components'
import Card from '~/components/common/Card'
import { FlexWrapper } from './Components'
import ConditionsV2 from './ConditionsV2'

type Props = {}
export default class ViewMenuModal extends React.Component<Props> {
  render() {
    return (
      <Content>
        <Wrapper>
          <Card>
            <FlexWrapper>
                <div style={{ width: '100%' }}>
                    <ConditionsV2 menuId={this.props.menuId}/>
                </div>
            </FlexWrapper>
          </Card>
        </Wrapper>
      </Content>
    )
  }
}
