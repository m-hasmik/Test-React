// @flow
import React from 'react'
import { connect } from 'react-redux'

import type { Attribute } from '~/types/attribute'
import type { RSAA } from '~/actions/types'

import Loader from '~/components/common/Loader'
import { loadRecipeAttributes as loadAttributes } from '~/actions/recipe'
import {
  Section,
  Attributes as Wrapper,
  AttributeBubble,
  AttributeRawValue,
  AttributeType,
  AttributeName
} from './Components'

type Props = {
  recipeId: string,
  loadAttributes: string => RSAA,
  attributes: Array<Attribute>,
  isFetching: boolean
}

class Attributes extends React.Component<Props> {
  componentDidMount() {
    this.props.loadAttributes(this.props.recipeId)
  }

  render() {
    const { isFetching, attributes } = this.props
    if (isFetching) {
      return <Loader />
    }

    return (
      <Section>
        <Wrapper>
          {attributes.map(attribute => (
            <AttributeBubble
              key={attribute.attributeUUID}
              important={attribute.isAllergen}
            >
              <AttributeName>{attribute.name}</AttributeName>
              <AttributeType>{attribute.type}</AttributeType>
              <AttributeType>{attribute.specification}</AttributeType>
              <AttributeRawValue>
                {attribute.quantity}
                {attribute.unit}
              </AttributeRawValue>
            </AttributeBubble>
          ))}
        </Wrapper>
      </Section>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.recipe.attributes.isFetching,
  attributes: state.recipe.attributes.items
})

const mapDispatchToProps = {
  loadAttributes
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Attributes)
