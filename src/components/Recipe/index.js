// @flow
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlusSquare,
  faLeaf,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'
import StarRatingComponent from 'react-star-rating-component'

import type { Recipe as RecipeProps } from '~/types/recipe'
import { GRAY_DARK } from '~/constants/colors'
import type { RSAA } from '~/actions/types'
import { addRecipe } from '~/actions/recipes'
import { findInSelectedRecipes } from '~/helpers/recipes'
import { getDomainPath } from '~/helpers/url'
import Item from '~/components/common/Item'
import Header from '~/components/common/Header'
import Small from '~/components/common/Small'
import { Container as ImageContainer } from '~/components/Image/Container'
import { Placeholder as ImagePlaceholder } from '~/components/Image/Placeholder'
import { AddedRecipeView } from './AddedRecipeView'
import { Button } from './Button'
import { LinkOverlay } from './LinkOverlay'
import { Summary, SummaryInfo, SummaryAction } from './Summary'
import { Tag } from './Tag'
import Details from './Details'

type Props = RecipeProps & {
  addRecipe: RecipeProps => RSAA,
  isSelected: boolean
}

const Recipe = ({
  name,
  photoUrl,
  reference,
  addRecipe,
  isSelected,
  ...recipe
}: Props) => (
  <Item>
    <LinkOverlay to={`${getDomainPath()}/recipes/${recipe.recipeUUID}`} />
    <ImageContainer>
      {recipe.dayPart && <Tag>{recipe.dayPart}</Tag>}
      <LazyLoadImage
        height={160}
        src={photoUrl}
        alt={name}
        placeholder={<ImagePlaceholder />}
      />
    </ImageContainer>
    <Summary>
      <SummaryInfo>
        <Header>{name}</Header>
        <Small>Reference Number: {reference}</Small>
      </SummaryInfo>
      <SummaryAction>
        {!isSelected && (
          <Button
            role="button"
            onClick={() => addRecipe({ ...recipe, name, photoUrl, reference })}
          >
            <FontAwesomeIcon icon={faPlusSquare} size="lg" />
          </Button>
        )}
        {isSelected && (
          <AddedRecipeView>
            <FontAwesomeIcon icon={faCheckCircle} size="lg" />
          </AddedRecipeView>
        )}
        {recipe.isOrganic && (
          <FontAwesomeIcon icon={faLeaf} color={GRAY_DARK} />
        )}
      </SummaryAction>
    </Summary>
    <StarRatingComponent
      name={`Star Rating for: ${name}`}
      editing={false}
      value={parseFloat(recipe.rating)}
    />
    <Details {...recipe} />
  </Item>
)

const mapDispatchToProps = {
  addRecipe
}

const mapStateToProps = (state, ownProps) => ({
  isSelected: findInSelectedRecipes(state.recipes.selected, ownProps.recipeUUID)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe)
