import { call, put, takeEvery } from 'redux-saga/effects'

import CentralMenusAPI from '~/api/centralMenus'
import {
  LOAD_CENTRAL_MENUS,
  LOAD_CENTRAL_MENUS_FAILED,
  CENTRAL_MENUS_RECEIVED,
  LOAD_CENTRAL_MENUS_SAP,
  LOAD_CENTRAL_MENUS_SAP_FAILED,
  CENTRAL_MENUS_SAP_RECEIVED
} from '~/actions/centralMenus'

function* fetchCentralMenus() {
  try {
    const centralMenus = yield call(CentralMenusAPI.get)
    yield put({
      type: CENTRAL_MENUS_RECEIVED,
      payload: { centralMenus: centralMenus.data }
    })
  } catch (error) {
    yield put({ type: LOAD_CENTRAL_MENUS_FAILED, error })
  }
}

export function* centralMenuSagas() {
  yield takeEvery(LOAD_CENTRAL_MENUS, fetchCentralMenus)
}

function* fetchCentralMenusSAP() {
  try {
    console.log('test')
    const centralMenus = yield call(CentralMenusAPI.getSAP)
    yield put({
      type: CENTRAL_MENUS_SAP_RECEIVED,
      payload: { centralMenus: centralMenus.data }
    })
  } catch (error) {
    yield put({ type: LOAD_CENTRAL_MENUS_SAP_FAILED, error })
  }
}

export function* centralMenuSAPSagas() {
  yield takeEvery(LOAD_CENTRAL_MENUS_SAP, fetchCentralMenusSAP)
}
