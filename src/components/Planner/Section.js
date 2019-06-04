import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import Paragraph from '~/components/common/Paragraph'
import Button from '~/components/common/Button'
import Modal from '~/components/common/Modal'
import type { RSAA } from '~/actions/types'
import { startRecipeSearch, closeRecipeSearch } from '~/actions/plan'
import Search from '~/routes/Search'
import { GRAY_MEDIUM } from '~/constants/colors'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;

  > ${Paragraph} {
    margin: 0 1rem 0.5rem;
  }

  > ${Button} {
    margin: 0.25rem 0.5rem;
  }
`

type Props = {
  addRecipesToMenu: () => RSAA,
  children: any,
  onToggle: boolean => void,
  schedule: number,
  group: number,
  menuId: string,
  t: string => string,
  toggleRecipeSearch: Object => RSAA
}

type State = {
  on: boolean
}

class Section extends React.Component<Props, State> {
  state = { on: true }
  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )

  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      toggleProps: {
        'aria-pressed': this.state.on,
        onClick: this.toggle
      }
    }
  }

  toggleRecipeSearch = () => {
    const { schedule, menuId, group, toggleRecipeSearch } = this.props
    toggleRecipeSearch(schedule, menuId, group)
  }

  render() {
    const { addRecipesToMenu, children, t } = this.props
    return (
      <Wrapper>
        {children(this.getStateAndHelpers())}
        <Modal
          triggerText={t('planning.recipes.add')}
          onToggle={this.toggleRecipeSearch}
        >
          {({ toggleProps }) => {
            return (
              <Search
                onModal
                finishSearch={toggleProps.onClick}
                onSearchFinish={addRecipesToMenu}
              />
            )
          }}
        </Modal>
      </Wrapper>
    )
  }
}

export const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  text-transform: capitalize;
  margin: 0 0.3rem 0.5rem 0.3rem;
  background: white;
  border: 1px solid ${GRAY_MEDIUM};
  border-radius: 5px;
  padding-top: 0.5rem;
`

export const SectionToggle = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  outline: none;
  margin-top: -0.3rem;
  font-size: 1rem;
`

const mapDispatchToProps = {
  toggleRecipeSearch: startRecipeSearch,
  addRecipesToMenu: closeRecipeSearch
}

export default connect(
  null,
  mapDispatchToProps
)(withNamespaces()(Section))
