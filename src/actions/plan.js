import type { Recipe } from '~/types/recipe'
import type { RSAA } from './types'

export const PLAN_RECEIVED = 'PLAN_RECEIVED'
export const LOAD_PLAN = 'LOAD_PLAN'
export const LOAD_PLAN_FAILED = 'LOAD_PLAN_FAILED'
export const ADD_PLAN_RECIPE = 'ADD_PLAN_RECIPE'
export const REMOVE_PLANNED_RECIPE = 'REMOVE_PLANNED_RECIPE'
export const START_RECIPE_SEARCH = 'START_RECIPE_SEARCH'
export const CLOSE_RECIPE_SEARCH = 'CLOSE_RECIPE_SEARCH'

// actions
export const loadPlan = (id: string): RSAA => ({
  type: LOAD_PLAN,
  payload: {
    id
  }
})

export const addRecipe = (recipe: Recipe): RSAA => ({
  type: ADD_PLAN_RECIPE,
  payload: recipe
})

export const startRecipeSearch = (
  schedule: number,
  menuId: string,
  group: number
): RSAA => ({
  type: START_RECIPE_SEARCH,
  payload: { schedule, menuId, group }
})

export const closeRecipeSearch = (recipes: Array<Recipe>): RSAA => {
  return {
    type: CLOSE_RECIPE_SEARCH,
    payload: { recipes }
  }
}

export const removeRecipe = (id: string): RSAA => ({
  type: REMOVE_PLANNED_RECIPE,
  payload: { id }
})
