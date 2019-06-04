// @flow
import type { Recipe } from '~/types/recipe'

export const findInSelectedRecipes = (
  recipes: Array<Recipe>,
  id: string
): boolean => {
  return !!recipes.find((recipe: Recipe) => recipe.recipeUUID === id)
}

export const findInPlanning = (recipes: Array<Recipe>, id: string): boolean => {
  return !!recipes.find((recipe: Recipe) => recipe.plan.menuUUID === id)
}
