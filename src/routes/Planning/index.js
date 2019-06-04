// @flow
import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import type { Planning as PlanningType } from '~/types/plan'
import type { RSAA } from '~/actions/types'
import { loadPlan } from '~/actions/plan'
import Loader from '~/components/common/Loader'
import Planner from '~/components/Planner'
import { Content } from './Content'
import { Wrapper } from './Wrapper'
import Header from './Header'

type Props = {
  menuId: string,
  isFetching: boolean,
  planning: PlanningType,
  loadPlan: string => RSAA,
  count: number
}

class Planning extends React.Component<Props> {
  componentDidMount() {
    this.props.loadPlan(this.props.menuId)
  }

  render() {
    const { isFetching, menuId, planning, count } = this.props
    return (
      <React.Fragment>
        <Header id={menuId} />
        <Content>
          <Wrapper>
            {isFetching && <Loader />}
            {!isFetching && (
              <Planner planning={planning} menuId={menuId} count={count} />
            )}
          </Wrapper>
        </Content>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.plan.isFetching,
  planning: state.plan.planning,
  menuId: ownProps.match.params.id
})

const mapDispatchToProps = {
  loadPlan
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Planning)
)
