// @flow
import {
  ADD_RECIPE,
  CLEAN_SELECTED_RECIPES,
  FILTER_RECIPES,
  LOAD_RECIPES,
  RECIPES_RECEIVED,
  REMOVE_RECIPE
} from '~/actions/recipes'

import type { RSAA } from '~/actions/types'
import type { Recipe } from '~/types/recipe'

type List = Array<Recipe>

type State = {
  isFetching: boolean,
  selected: List,
  available: List,
  filtered: List
}

export const initialState: State = {
  isFetching: false,
  selected: [],
  filtered: [],
  available: []
}

const findRecipeByUUID = (selectedRecipes: List, id: string): boolean => {
  return !!selectedRecipes.find(
    (selectedRecipe: Recipe) => selectedRecipe.recipeUUID === id
  )
}

const removeRecipeByUUID = (selectedRecipes: List, id: string): List => {
  return selectedRecipes.filter(
    (selectedRecipe: Recipe) => selectedRecipe.recipeUUID !== id
  )
}

const filteredRecipes = (recipes: List, value: string): List => {
  const inputValue = value.trim().toLowerCase()
  const pattern = new RegExp(inputValue, 'gi')

  if (inputValue.length === 0) return recipes
  return recipes.filter(recipe => recipe.name.toLowerCase().match(pattern))
}

const recipes = (state: State = initialState, action: RSAA) => {
  switch (action.type) {
    case ADD_RECIPE:
      if (findRecipeByUUID(state.selected, action.payload.recipeUUID)) {
        return state
      }

      return {
        ...state,
        selected: [...state.selected, action.payload]
      }
    case REMOVE_RECIPE:
      if (!findRecipeByUUID(state.selected, action.payload.id)) {
        return state
      }

      return {
        ...state,
        selected: removeRecipeByUUID(state.selected, action.payload.id)
      }
    case FILTER_RECIPES:
      return {
        ...state,
        filtered: filteredRecipes(state.available, action.payload.value)
      }
    case LOAD_RECIPES:
      return {
        ...state,
        isFetching: true
      }
    case RECIPES_RECEIVED:
      return {
        ...state,
        available: action.payload.recipes,
        filtered: action.payload.recipes,
        isFetching: false
      }
    case CLEAN_SELECTED_RECIPES: {
      return {
        ...state,
        selected: []
      }
    }
    default:
      return state
  }
}

export default recipes
