// @flow
import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'

import Card from '~/components/common/Card'
import Header from '~/components/common/Header'
import Paragraph from '~/components/common/Paragraph'
import Small from '~/components/common/Small'
import { GRAY_DARK } from '~/constants/colors'
import type { Recipe as RecipeProps } from '~/types/recipe'
import Ingredients from '~/routes/Recipe/Ingredients'
import Instructions from '~/routes/Recipe/Instructions'
import { INSTRUCTIONS_TEMPLATE, WEEKLY_MENU_TEMPLATE } from '../constants'

const Element = styled.div`
  display: block;
  width: 100%;
`

const Content = styled(Card)`
  padding: 0;
  margin: 0 0 0.5rem;
  width: 100%;
  background: transparent;
  text-align: center;

  ${Paragraph} {
    font-size: 0.8rem;
  }
`

type Props = RecipeProps & { template: string }

export const Recipe = (props: Props) => {
  return (
    <Element>
      <Content>
        <Header>
          {props.name}
          {props.isOrganic && (
            <FontAwesomeIcon icon={faLeaf} color={GRAY_DARK} />
          )}
        </Header>
        {props.template !== INSTRUCTIONS_TEMPLATE && (
          <Small>
            {props.currency}
            {props.price}
          </Small>
        )}
        <Small>{props.reference}</Small>
        {props.template === WEEKLY_MENU_TEMPLATE && (
          <Ingredients
            recipeId={'02655837-3da8-1ee8-a2eb-de213cb8249f'}
            isMinimalistic
          />
        )}
        {props.template === INSTRUCTIONS_TEMPLATE && (
          <Instructions
            recipeId={'02655837-3da8-1ee8-a2eb-de213cb8249f'}
            isMinimalistic
          />
        )}
      </Content>
    </Element>
  )
}
