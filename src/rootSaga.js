import { all } from 'redux-saga/effects'

import { recipeSagas } from './sagas/recipes'
import { singleRecipeSagas } from './sagas/recipe'
import { menuSagas } from './sagas/menus'
import { menuMongoSagas } from './sagas/menus'
import { conditionsSagas } from './sagas/conditions'
import { centralMenuSagas } from './sagas/centralMenus'
import { centralMenuSAPSagas } from './sagas/centralMenus'
import { planSagas } from './sagas/plan'
import { printerSagas } from './sagas/print'

export default function* rootSaga() {
  yield all([
    recipeSagas(),
    singleRecipeSagas(),
    menuSagas(),
    menuMongoSagas(),
    conditionsSagas(),
    centralMenuSagas(),
    centralMenuSAPSagas(),
    planSagas(),
    printerSagas()
  ])
}
