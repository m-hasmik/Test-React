// @flow
import type { Recipe } from '~/types/recipe'

export const getRecipeIds = (recipes: Array<Recipe>): Array<string> =>
  recipes
    .map((recipe: Recipe) => (recipe ? recipe.plan.menuUUID : null))
    .filter(Boolean)
