import { call, put, takeEvery } from 'redux-saga/effects'

import PlanningAPI from '~/api/plan'
import { LOAD_PLAN, LOAD_PLAN_FAILED, PLAN_RECEIVED } from '~/actions/plan'
import { preloadPrinterQueue } from '~/actions/printer'

function* fetchPlan(params: Object) {
  try {
    const plan = yield call(PlanningAPI.getRecipes, params.payload.id)
    yield put({ type: PLAN_RECEIVED, payload: { planning: plan.data } })
    yield put(preloadPrinterQueue(plan.data, 'menu'))
  } catch (error) {
    yield put({ type: LOAD_PLAN_FAILED, error })
  }
}

export function* planSagas() {
  yield takeEvery(LOAD_PLAN, fetchPlan)
}
