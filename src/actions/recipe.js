// @flow
import type { RSAA } from './types'

// constants
export const RECIPE_RECEIVED = 'RECIPE_RECEIVED'
export const LOAD_RECIPE = 'LOAD_RECIPE'
export const LOAD_RECIPE_FAILED = 'LOAD_RECIPE_FAILED'

export const RECIPE_INGREDIENTS_RECEIVED = 'RECIPE_INGREDIENTS_RECEIVED'
export const LOAD_RECIPE_INGREDIENTS = 'LOAD_RECIPE_INGREDIENTS'
export const LOAD_RECIPE_INGREDIENTS_FAILED = 'LOAD_RECIPE_INGREDIENTS_FAILED'

export const LOAD_RECIPE_INSTRUCTIONS = 'LOAD_RECIPE_INSTRUCTIONS'
export const LOAD_RECIPE_INSTRUCTIONS_FAILED = 'LOAD_RECIPE_INSTRUCTIONS_FAILED'
export const RECIPE_INSTRUCTIONS_RECEIVED = 'RECIPE_INSTRUCTIONS_RECEIVED'

export const LOAD_RECIPE_ATTRIBUTES = 'LOAD_RECIPE_ATTRIBUTES'
export const LOAD_RECIPE_ATTRIBUTES_FAILED = 'LOAD_RECIPE_ATTRIBUTES_FAILED'
export const RECIPE_ATTRIBUTES_RECEIVED = 'RECIPE_ATTRIBUTES_RECEIVED'

// actions
export const loadRecipe = (id: string): RSAA => ({
  type: LOAD_RECIPE,
  payload: {
    id
  }
})

export const loadRecipeIngredients = (id: string): RSAA => ({
  type: LOAD_RECIPE_INGREDIENTS,
  payload: {
    id
  }
})

export const loadRecipeInstructions = (id: string): RSAA => ({
  type: LOAD_RECIPE_INSTRUCTIONS,
  payload: {
    id
  }
})

export const loadRecipeAttributes = (id: string): RSAA => ({
  type: LOAD_RECIPE_ATTRIBUTES,
  payload: {
    id
  }
})
