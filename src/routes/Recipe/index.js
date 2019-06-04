// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import StarRatingComponent from 'react-star-rating-component'
import { withNamespaces } from 'react-i18next'

import type { Recipe } from '~/types/recipe'
import type { RSAA } from '~/actions/types'
import { getDomainPath } from '~/helpers/url'
import Title from '~/components/common/Title'
import Header from '~/components/common/Header'
import Button from '~/components/common/Button'
import Link from '~/components/common/Link'
import Loader from '~/components/common/Loader'
import { addRecipe } from '~/actions/recipes'
import { loadRecipe } from '~/actions/recipe'
import {
  Content,
  ImageContainer,
  Summary,
  SummaryDetails,
  SummaryItems,
  SummaryItem,
  SummaryPhoto,
  Wrapper
} from './Components'
import Ingredients from './Ingredients'
import Instructions from './Instructions'
import Composition from './Composition'

type Props = {
  recipe: Recipe,
  isFetching: boolean,
  recipeId: string,
  addRecipe: Recipe => RSAA,
  loadRecipe: string => RSAA,
  t: string => string
}

class RecipeDetail extends React.Component<Props> {
  componentDidMount() {
    this.props.loadRecipe(this.props.recipeId)
  }

  addToSelectedRecipes = () => {
    this.props.addRecipe(this.props.recipe)
  }

  render() {
    const { recipe, isFetching, recipeId, t } = this.props
    if (isFetching) {
      return <Loader />
    }

    return (
      <Content>
        <Wrapper>
          <Link to={`${getDomainPath()}/`}>{t('recipe.buttons.goBack')}</Link>
          <Summary>
            <SummaryDetails>
              <Title>{recipe.name}</Title>
              <Header>{recipe.type}</Header>
              <StarRatingComponent
                name={`Star Rating for: ${recipe.name}`}
                editing={false}
                value={parseFloat(recipe.rating)}
              />
              <SummaryItems>
                <SummaryItem>
                  <span>{recipe.dayPart}</span> <br />
                  {t('recipe.summary.time')}
                </SummaryItem>
                <SummaryItem middle>
                  <span>
                    {recipe.currency} {recipe.cost}
                  </span>
                  <br />
                  {t('recipe.summary.cost')}
                </SummaryItem>
                <SummaryItem>
                  <span>
                    {recipe.currency} {recipe.price}
                  </span>
                  <br />
                  {t('recipe.summary.price')}
                </SummaryItem>
              </SummaryItems>
              <Button role="button" onClick={this.addToSelectedRecipes}>
                {t('recipe.buttons.select')}
              </Button>
            </SummaryDetails>
            <SummaryPhoto>
              <ImageContainer>
                <LazyLoadImage
                  height={250}
                  src={recipe.photoUrl}
                  alt={recipe.name}
                />
              </ImageContainer>
            </SummaryPhoto>
          </Summary>

          <Ingredients recipeId={recipeId} />

          <Composition recipeId={recipeId} />

          <Instructions recipeId={recipeId} />
        </Wrapper>
      </Content>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  recipeId: ownProps.match.params.id,
  isFetching: state.recipe.isFetching,
  recipe: state.recipe.recipe
})

const mapDispatchToProps = {
  addRecipe,
  loadRecipe
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withNamespaces()(RecipeDetail))
)
