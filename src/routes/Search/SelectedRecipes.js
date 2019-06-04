// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import type { RSAA } from '~/actions/types'
import type { Recipe } from '~/types/recipe'
import { cleanSelectedRecipes } from '~/actions/recipes'
import SelectedRecipe from './SelectedRecipe'
import { SelectedRecipes as Container, AddRecipes } from './Components'

type Props = {
  recipes: Array<Recipe>,
  hasRecipes: boolean,
  finishSearch?: () => any,
  onSearchFinish?: any => RSAA,
  cleanSelectedRecipes?: any => RSAA,
  t: string => string
}

type State = {
  showRecipes: boolean
}

class SelectedRecipes extends React.Component<Props, State> {
  state = {
    showRecipes: false
  }

  addRecipesToPlanning = async () => {
    const {
      finishSearch,
      onSearchFinish,
      recipes,
      cleanSelectedRecipes
    } = this.props

    await (finishSearch && finishSearch())
    await (onSearchFinish && onSearchFinish(recipes))
    await (cleanSelectedRecipes && cleanSelectedRecipes())
  }

  render() {
    const { hasRecipes, recipes, finishSearch, t } = this.props
    const { showRecipes } = this.state

    return (
      <Container
        display={showRecipes || recipes.length > 0 ? true : undefined}
        onModal={!!finishSearch}
      >
        {recipes.map(recipe => (
          <SelectedRecipe
            key={`selected-recipe-${recipe.recipeUUID}`}
            {...recipe}
          />
        ))}
        {finishSearch && (
          <AddRecipes onClick={this.addRecipesToPlanning}>
            {hasRecipes
              ? t('search.recipes.modal.actions.select')
              : t('search.recipes.modal.actions.close')}
          </AddRecipes>
        )}
      </Container>
    )
  }
}

const mapDispatchToProps = {
  cleanSelectedRecipes
}

const mapStateToProps = ({ recipes }) => ({
  recipes: recipes.selected,
  hasRecipes: recipes.selected.length > 0
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(SelectedRecipes))
