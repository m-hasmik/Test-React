import { all, call, put, takeEvery } from 'redux-saga/effects'

import RecipeAPI from '~/api/recipe'
import {
  LOAD_RECIPE,
  LOAD_RECIPE_FAILED,
  RECIPE_RECEIVED,
  LOAD_RECIPE_INGREDIENTS,
  LOAD_RECIPE_INGREDIENTS_FAILED,
  RECIPE_INGREDIENTS_RECEIVED,
  LOAD_RECIPE_INSTRUCTIONS,
  LOAD_RECIPE_INSTRUCTIONS_FAILED,
  RECIPE_INSTRUCTIONS_RECEIVED,
  LOAD_RECIPE_ATTRIBUTES,
  LOAD_RECIPE_ATTRIBUTES_FAILED,
  RECIPE_ATTRIBUTES_RECEIVED
} from '~/actions/recipe'

function* fetchRecipe(params: Object) {
  try {
    const recipes = yield call(RecipeAPI.get, params.payload.id)
    yield put({ type: RECIPE_RECEIVED, payload: { recipe: recipes.data } })
  } catch (error) {
    yield put({ type: LOAD_RECIPE_FAILED, error })
  }
}

function* fetchRecipeIngredients(params: Object) {
  try {
    const ingredients = yield call(RecipeAPI.getIngredients, params.payload.id)
    yield put({
      type: RECIPE_INGREDIENTS_RECEIVED,
      payload: { ingredients: ingredients.data }
    })
  } catch (error) {
    yield put({ type: LOAD_RECIPE_INGREDIENTS_FAILED, error })
  }
}

function* fetchRecipeInstructions(params: Object) {
  try {
    const instructions = yield call(
      RecipeAPI.getInstructions,
      params.payload.id
    )
    yield put({
      type: RECIPE_INSTRUCTIONS_RECEIVED,
      payload: { instructions: instructions.data }
    })
  } catch (error) {
    yield put({ type: LOAD_RECIPE_INSTRUCTIONS_FAILED, error })
  }
}

function* fetchRecipeAttributes(params: Object) {
  try {
    const attributes = yield call(RecipeAPI.getAttributes, params.payload.id)
    yield put({
      type: RECIPE_ATTRIBUTES_RECEIVED,
      payload: { attributes: attributes.data }
    })
  } catch (error) {
    yield put({ type: LOAD_RECIPE_ATTRIBUTES_FAILED, error })
  }
}

export function* singleRecipeSagas() {
  yield all([
    takeEvery(LOAD_RECIPE, fetchRecipe),
    takeEvery(LOAD_RECIPE_INGREDIENTS, fetchRecipeIngredients),
    takeEvery(LOAD_RECIPE_INSTRUCTIONS, fetchRecipeInstructions),
    takeEvery(LOAD_RECIPE_ATTRIBUTES, fetchRecipeAttributes)
  ])
}
