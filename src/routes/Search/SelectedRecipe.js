// @flow
import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import type { Recipe } from '~/types/recipe'
import type { RSAA } from '~/actions/types'

import Header from '~/components/common/Header'
import { removeRecipe } from '~/actions/recipes'
import { SelectedRecipe as Card, CardContent, RemoveButton } from './Components'

type Props = Recipe & { removeRecipe: string => RSAA }

const SelectedRecipe = ({ name, recipeUUID, removeRecipe }: Props) => {
  return (
    <Card>
      <CardContent>
        <Header> {name} </Header>
        <RemoveButton onClick={() => removeRecipe(recipeUUID)} role="button">
          <FontAwesomeIcon icon={faTrashAlt} />
        </RemoveButton>
      </CardContent>
    </Card>
  )
}

const mapDispatchToProps = {
  removeRecipe
}

export default connect(
  null,
  mapDispatchToProps
)(SelectedRecipe)
