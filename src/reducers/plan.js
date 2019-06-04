// @flow
import moment from 'moment'

import type { RSAA } from '~/actions/types'
import type { Planning } from '~/types/plan'
import type { Recipe } from '~/types/recipe'
import {
  PLAN_RECEIVED,
  LOAD_PLAN,
  REMOVE_PLANNED_RECIPE,
  START_RECIPE_SEARCH,
  CLOSE_RECIPE_SEARCH
} from '~/actions/plan'
import { formatToDate } from '~/helpers/dates'
import { findInPlanning } from '~/helpers/recipes'

type State = {
  isFetching: boolean,
  planning: Planning,
  recipes: Array<Recipe>,
  newRecipesFor: {
    menuId: string,
    schedule: number,
    group: number
  }
}

export const initialState: State = {
  isFetching: false,
  planning: {},
  recipes: [],
  newRecipesFor: {}
}

export const buildPlanning = (planning: Array<Recipe>): Planning =>
  planning.reduce((acc: Object, recipe: Recipe) => {
    const recipeServeAtDate = formatToDate(moment(recipe.plan.serveAt))
    // if Recipe Date does not exist, instantiate new Object for it.
    if (!acc[recipeServeAtDate]) {
      acc[recipeServeAtDate] = {}
    }
    // if Recipe day part does not exist, instantiate new Array of it, to add Recipes
    if (!acc[recipeServeAtDate][recipe.dayPart]) {
      acc[recipeServeAtDate][recipe.dayPart] = []
    }
    // Add Recipe into DayPart of the day it will be served at
    acc[recipeServeAtDate][recipe.dayPart] = [
      ...acc[recipeServeAtDate][recipe.dayPart],
      recipe
    ]
    return acc
  }, {})

const plan = (state: State = initialState, action: RSAA) => {
  switch (action.type) {
    case LOAD_PLAN:
      return {
        ...state,
        isFetching: true
      }
    case PLAN_RECEIVED: {
      return {
        ...state,
        isFetching: false,
        planning: buildPlanning(action.payload.planning),
        recipes: action.payload.planning
      }
    }
    case REMOVE_PLANNED_RECIPE: {
      const exist: boolean = findInPlanning(state.recipes, action.payload.id)
      if (exist) {
        const filteredRecipes: Array<Recipe> = state.recipes.filter(
          recipe => recipe.plan.menuUUID !== action.payload.id
        )
        return {
          ...state,
          planning: buildPlanning(filteredRecipes),
          recipes: filteredRecipes
        }
      }
      return state
    }
    case START_RECIPE_SEARCH: {
      return {
        ...state,
        newRecipesFor: {
          menuId: action.payload.menuId,
          schedule: action.payload.schedule,
          group: action.payload.group
        }
      }
    }
    case CLOSE_RECIPE_SEARCH: {
      const recipesWithPlanning: Array<Recipe> = action.payload.recipes.map(
        (recipe: Recipe) => {
          return {
            ...recipe,
            quantities: {
              original: 10,
              changed: 10
            },
            plan: {
              menuUUID: state.newRecipesFor.menuId,
              serveAt: state.newRecipesFor.schedule,
              order: state.newRecipesFor.group
            }
          }
        }
      )
      const newRecipes = [...state.recipes, ...recipesWithPlanning]
      return {
        ...state,
        newRecipesFor: {},
        planning: buildPlanning(newRecipes),
        recipes: newRecipes
      }
    }
    default: {
      return state
    }
  }
}

export default plan
