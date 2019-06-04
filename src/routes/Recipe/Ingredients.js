// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import type { Ingredient } from '~/types/ingredient'
import type { RSAA } from '~/actions/types'

import Header from '~/components/common/Header'
import Paragraph from '~/components/common/Paragraph'
import Loader from '~/components/common/Loader'
import { loadRecipeIngredients as loadIngredients } from '~/actions/recipe'
import { Section, IngredientName } from './Components'

type Props = {
  recipeId: string,
  loadIngredients: string => RSAA,
  ingredients: Array<Ingredient>,
  isFetching: boolean,
  t: string => string,
  isMinimalistic: boolean
}

class Ingredients extends React.Component<Props> {
  componentDidMount() {
    this.props.loadIngredients(this.props.recipeId)
  }

  render() {
    const { isFetching, isMinimalistic, ingredients, t } = this.props
    if (isFetching) {
      return <Loader />
    }

    if (isMinimalistic) {
      return (
        <Paragraph>
          <IngredientName>
            {ingredients.map(ingredient => ingredient.name).join(', ')}
          </IngredientName>
        </Paragraph>
      )
    }

    return (
      <Section>
        <Header>{t('recipe.sections.ingredients.title')}</Header>
        {ingredients.map(ingredient => (
          <Paragraph key={ingredient.ingredientUUID}>
            {ingredient.quantity}
            {ingredient.unit} <IngredientName>{ingredient.name}</IngredientName>
          </Paragraph>
        ))}
      </Section>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.recipe.ingredients.isFetching,
  ingredients: state.recipe.ingredients.items
})

const mapDispatchToProps = {
  loadIngredients
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Ingredients))
