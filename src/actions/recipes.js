// @flow
import type { Recipe } from '~/types/recipe'
import type { RSAA } from './types'

// constants
export const ADD_RECIPE = 'ADD_RECIPE'
export const REMOVE_RECIPE = 'REMOVE_RECIPE'
export const CLEAN_SELECTED_RECIPES = 'CLEAN_SELECTED_RECIPES'
export const RECIPES_RECEIVED = 'RECIPES_RECEIVED'
export const LOAD_RECIPES = 'LOAD_RECIPES'
export const LOAD_RECIPES_FAILED = 'LOAD_RECIPES_FAILED'
export const FILTER_RECIPES = 'FILTER_RECIPES'

// actions
export const loadRecipes = (): RSAA => ({
  type: LOAD_RECIPES,
  payload: {}
})

export const addRecipe = (recipe: Recipe): RSAA => ({
  type: ADD_RECIPE,
  payload: recipe
})

export const cleanSelectedRecipes = (): RSAA => ({
  type: CLEAN_SELECTED_RECIPES,
  payload: {}
})

export const removeRecipe = (id: string): RSAA => ({
  type: REMOVE_RECIPE,
  payload: { id }
})

export const filterRecipes = (value: string): RSAA => ({
  type: FILTER_RECIPES,
  payload: { value }
})
