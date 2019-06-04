// @flow
import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import get from 'lodash/get'
import qs from 'qs'

import type { Entities } from '~/types/prints'
import type { RSAA } from '~/actions/types'
import { cleanPrinterQueue } from '~/actions/printer'
import Menu from './Menu'
import { Wrapper } from './Wrapper'

type Props = {
  entity: Entities,
  id: string,
  cleanPrinterQueue: () => RSAA,
  params: ?{
    template: string
  }
}

class Print extends React.Component<Props> {
  componentWillUnmount() {
    this.props.cleanPrinterQueue()
  }

  render() {
    const { entity, id, params } = this.props
    switch (entity) {
      case 'menu':
        return (
          <Wrapper>
            <Menu data={id} template={get(params, 'template', '')} />
          </Wrapper>
        )
      default:
        return null
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  entity: ownProps.match.params.type,
  id: ownProps.match.params.id,
  params: qs.parse(ownProps.location.search.slice(1))
})

const mapDispatchToProps = {
  cleanPrinterQueue
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Print)
)
