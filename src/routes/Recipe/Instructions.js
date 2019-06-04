// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import type { Instruction } from '~/types/instruction'
import type { RSAA } from '~/actions/types'

import Header from '~/components/common/Header'
import Paragraph from '~/components/common/Paragraph'
import Loader from '~/components/common/Loader'
import { loadRecipeInstructions as loadInstructions } from '~/actions/recipe'
import { Section } from './Components'

type Props = {
  recipeId: string,
  loadInstructions: string => RSAA,
  instructions: Array<Instruction>,
  isFetching: boolean,
  isMinimalistic: boolean,
  t: string => string
}

function createMarkup(text) {
  return { __html: text }
}

class Instructions extends React.Component<Props> {
  componentDidMount() {
    this.props.loadInstructions(this.props.recipeId)
  }

  render() {
    const { isFetching, instructions, isMinimalistic, t } = this.props
    if (isFetching) {
      return <Loader />
    }

    if (isMinimalistic) {
      return (
        <>
          {instructions.map(instruction => (
            <Paragraph
              key={instruction.instructionUUID}
              dangerouslySetInnerHTML={createMarkup(instruction.content)}
            />
          ))}
        </>
      )
    }

    return (
      <Section>
        <Header>{t('recipe.sections.instructions.title')}</Header>
        {instructions.map(instruction => (
          <Paragraph
            key={instruction.instructionUUID}
            dangerouslySetInnerHTML={createMarkup(instruction.content)}
          />
        ))}
      </Section>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.recipe.instructions.isFetching,
  instructions: state.recipe.instructions.items
})

const mapDispatchToProps = {
  loadInstructions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Instructions))
