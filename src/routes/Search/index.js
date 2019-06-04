import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import type { RSAA } from '~/actions/types'
import type { Recipes } from '~/api/recipes'

import List from '~/components/common/List'
import SearchBar from '~/components/common/Search'
import Loader from '~/components/common/Loader'
import Recipe from '~/components/Recipe'
import RecipeFilters from '~/components/RecipeFilters'
import { loadRecipes, filterRecipes } from '~/actions/recipes'
import SelectedRecipes from './SelectedRecipes'
import {
  Container,
  Content,
  Elements,
  FiltersHeader,
  RecipesWrapper
} from './Components'

type Props = {
  loadRecipes: () => RSAA,
  filterRecipes: string => RSAA,
  finishSearch?: () => any,
  onSearchFinish?: () => RSAA,
  onModal?: boolean,
  isFetching: boolean,
  recipes: Recipes,
  t: string => string
}

class Search extends React.Component<Props> {
  componentDidMount() {
    this.props.loadRecipes()
  }

  render() {
    const {
      isFetching,
      finishSearch,
      onModal,
      onSearchFinish,
      recipes,
      t
    } = this.props
    return (
      <Container onModal={onModal}>
        <Content onModal={onModal}>
          {onModal && (
            <SelectedRecipes
              onModal
              finishSearch={finishSearch}
              onSearchFinish={onSearchFinish}
            />
          )}
          <Elements>
            <FiltersHeader>
              <SearchBar
                suggestions={[]}
                placeholder={t('search.searchBar.placeholder')}
                onChange={this.props.filterRecipes}
              />
              <RecipeFilters />
            </FiltersHeader>
            {isFetching && <Loader />}
            {!isFetching && (
              <RecipesWrapper>
                <List>
                  {recipes.map((recipe, i) => (
                    <Recipe
                      key={`recipe-card-${recipe.recipeUUID}-${i}`}
                      {...recipe}
                    />
                  ))}
                </List>
              </RecipesWrapper>
            )}
          </Elements>
        </Content>
        {!onModal && (
          <SelectedRecipes
            finishSearch={finishSearch}
            onSearchFinish={onSearchFinish}
          />
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.filtered.filter(recipe => recipe.photoUrl),
  isFetching: state.recipes.isFetching
})

const mapDispatchToProps = {
  filterRecipes,
  loadRecipes
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Search))
