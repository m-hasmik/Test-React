import { call, put, takeEvery } from 'redux-saga/effects'

import MenusAPI from '~/api/menus'
import {
  LOAD_MENUS,
  LOAD_MENUS_FAILED,
  MENUS_RECEIVED,
  LOAD_MONGO_MENUS,
  LOAD_MONGO_MENUS_FAILED,
  MENUS_MONGO_RECEIVED
} from '~/actions/menus'

function* fetchMenus() {
  try {
    const menus = yield call(MenusAPI.get)
    yield put({ type: MENUS_RECEIVED, payload: { menus: menus.data } })
  } catch (error) {
    yield put({ type: LOAD_MENUS_FAILED, error })
  }
}

export function* menuSagas() {
  yield takeEvery(LOAD_MENUS, fetchMenus)
}

function* fetchMenusMongo() {
  try {
    const mongoMenus = yield call(MenusAPI.getMongo)
    console.log(mongoMenus)
    yield put({
      type: MENUS_MONGO_RECEIVED,
      payload: { mongoMenus: mongoMenus.data }
    })
  } catch (error) {
    yield put({ type: LOAD_MONGO_MENUS_FAILED, error })
  }
}

export function* menuMongoSagas() {
  yield takeEvery(LOAD_MONGO_MENUS, fetchMenusMongo)
}
