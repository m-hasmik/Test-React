// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLeaf,
  faTrashAlt,
  faStar,
  faUtensils
} from '@fortawesome/free-solid-svg-icons'

import type { Recipe as RecipeProps } from '~/types/recipe'
import type { RSAA } from '~/actions/types'
import { getDomainPath } from '~/helpers/url'
import { findInSelectedRecipes } from '~/helpers/recipes'
import Card from '~/components/common/Card'
import Title from '~/components/common/Title'
import Paragraph from '~/components/common/Paragraph'
import { removeRecipe } from '~/actions/plan'
import { GRAY_DARK } from '~/constants/colors'
import { Footer } from './Footer'
import { Header } from './Header'
import { ImageContainer, ImagePlaceholder } from './Image'
import { SummaryItem } from './SummaryItem'
import { Wrapper } from './Wrapper'
import { LinkOverlay } from '../Recipe/LinkOverlay'
import { SummaryAction, RemoveButton } from './Summary'
import styled from 'styled-components'

type Props = RecipeProps & {
  removeRecipe: string => RSAA,
  isSelected: boolean,
  t: string => string,
  count: number
}

const RecipeMenu = (props: Props) => {

    console.log('PropsPropsPropsProps', props);
    // const margin: number = Number(recipe.price) - Number(recipe.cost)
  const isFooterShown = props.isOrganic || props.hasOrphan

  //--delete the following: only for the demo-----------
  let hasProblem = false
  props.name === 'Chicken Salad with Onions'
    ? (hasProblem = true)
    : (hasProblem = false)
  const hasProblemStyle = hasProblem
    ? { borderTop: '3px solid orange' }
    : { borderTop: '3px solid transparent' }
  //-------------------------------

  const Content = styled.div`
    display: flex;
    flex-direction: ${props.count === 1 ? 'row' : 'column'};
    padding: 0.5rem;
    p {
      margin-right: ${props.count === 1 ? '2rem' : '0'};
    }
    button {
      margin-top: -0.4em;
    }
  `
  return (
    <Wrapper>
      <Card style={hasProblemStyle}>
        <LinkOverlay to={`${getDomainPath()}/recipes/${props.recipeUUID}`} />
        <Header>
          <ImageContainer>
            <LazyLoadImage
              height={40}
              src={props.photoUrl}
              alt={props.name}
              placeholder={<ImagePlaceholder />}
            />
          </ImageContainer>
          <Title>{props.name}</Title>
        </Header>
        <Content>
          <Paragraph>
            <strong>Quantities</strong>: {Number(props.quantities && props.quantities.original)}
          </Paragraph>
          <Paragraph>
            <strong>EC</strong>: {props.currency}
            {Number(props.cost)}
          </Paragraph>
          <Paragraph>
            <strong>Selling Price</strong>: {props.currency}
            {Number(props.price)}
          </Paragraph>
          <SummaryAction>
            <RemoveButton
              role="button"
              onClick={() => props.removeRecipe(props.plan.menuUUID)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </RemoveButton>
            {props.isOrganic && (
              <FontAwesomeIcon icon={faLeaf} color={GRAY_DARK} />
            )}
          </SummaryAction>
        </Content>
        {!isFooterShown && (
          <Footer>
            <SummaryItem>
              {!props.isOrganic && (
                <FontAwesomeIcon icon={faLeaf} color={GRAY_DARK} />
              )}
            </SummaryItem>
            <SummaryItem>
              {!props.hasOrphan && (
                <FontAwesomeIcon icon={faStar} color={GRAY_DARK} />
              )}
            </SummaryItem>
            <SummaryItem>
              {!props.hasOrphan && (
                <FontAwesomeIcon icon={faUtensils} color={GRAY_DARK} />
              )}
            </SummaryItem>
          </Footer>
        )}
      </Card>
    </Wrapper>
  )
}

const mapDispatchToProps = {
  removeRecipe
}

const mapStateToProps = (state, ownProps) => ({
  isSelected: findInSelectedRecipes(state.recipes.selected, ownProps.recipeUUID)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(RecipeMenu))
