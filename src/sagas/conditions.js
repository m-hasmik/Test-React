import { call, put, takeEvery } from 'redux-saga/effects'

import ConditionsAPI from '~/api/conditions'

import { LOAD_CONDITIONS, LOAD_CONDITION_FAILED } from '~/actions/conditions'

function* fetchConditions() {
  try {
    const Conditions = yield call(ConditionsAPI.get)
    yield put({
      type: LOAD_CONDITIONS,
      payload: { centralMenus: Conditions.data }
    })
  } catch (error) {
    yield put({ type: LOAD_CONDITION_FAILED, error })
  }
}

export function* conditionsSagas() {
  yield takeEvery(LOAD_CONDITIONS, fetchConditions())
}
