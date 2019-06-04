// @flow
import {
  LOAD_RECIPE_ATTRIBUTES,
  LOAD_RECIPE_INGREDIENTS,
  LOAD_RECIPE_INSTRUCTIONS,
  LOAD_RECIPE,
  RECIPE_ATTRIBUTES_RECEIVED,
  RECIPE_INGREDIENTS_RECEIVED,
  RECIPE_INSTRUCTIONS_RECEIVED,
  RECIPE_RECEIVED
} from '~/actions/recipe'

import type { RSAA } from '~/actions/types'
import type { Recipe } from '~/types/recipe'
import type { Ingredient } from '~/types/ingredient'
import type { Instruction } from '~/types/instruction'
import type { Attribute } from '~/types/attribute'

type State = {
  isFetching: boolean,
  recipe: Recipe,
  ingredients: {
    isFetching: boolean,
    items: Array<Ingredient>
  },
  instructions: {
    isFetching: boolean,
    items: Array<Instruction>
  },
  attributes: {
    isFetching: boolean,
    items: Array<Attribute>
  }
}

export const initialState: State = {
  isFetching: false,
  recipe: {},
  ingredients: {
    isFetching: false,
    items: []
  },
  instructions: {
    isFetching: false,
    items: []
  },
  attributes: {
    isFetching: false,
    items: []
  }
}

const recipe = (state: State = initialState, action: RSAA) => {
  switch (action.type) {
    case LOAD_RECIPE:
      return {
        ...state,
        isFetching: true
      }
    case LOAD_RECIPE_ATTRIBUTES:
      return {
        ...state,
        attributes: {
          isFetching: true
        }
      }
    case LOAD_RECIPE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          isFetching: true
        }
      }
    case LOAD_RECIPE_INSTRUCTIONS:
      return {
        ...state,
        instructions: {
          isFetching: true
        }
      }
    case RECIPE_RECEIVED:
      return {
        ...state,
        recipe: action.payload.recipe,
        isFetching: false
      }
    case RECIPE_ATTRIBUTES_RECEIVED:
      return {
        ...state,
        attributes: {
          items: action.payload.attributes,
          isFetching: false
        }
      }
    case RECIPE_INGREDIENTS_RECEIVED:
      return {
        ...state,
        ingredients: {
          items: action.payload.ingredients,
          isFetching: false
        }
      }
    case RECIPE_INSTRUCTIONS_RECEIVED:
      return {
        ...state,
        instructions: {
          items: action.payload.instructions,
          isFetching: false
        }
      }
    default:
      return state
  }
}

export default recipe
