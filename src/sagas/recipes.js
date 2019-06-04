import { call, put, takeEvery } from 'redux-saga/effects'

import RecipesAPI from '~/api/recipes'
import {
  LOAD_RECIPES,
  LOAD_RECIPES_FAILED,
  RECIPES_RECEIVED
} from '~/actions/recipes'

function* fetchRecipes() {
  try {
    const recipes = yield call(RecipesAPI.get)
    yield put({ type: RECIPES_RECEIVED, payload: { recipes: recipes.data } })
  } catch (error) {
    yield put({ type: LOAD_RECIPES_FAILED, error })
  }
}

export function* recipeSagas() {
  yield takeEvery(LOAD_RECIPES, fetchRecipes)
}
