import { put, takeEvery } from 'redux-saga/effects'

import {
  PRINTER_DATA_RECEIVED,
  LOAD_PRINTER_DATA,
  LOAD_PRINTER_DATA_FAILED
} from '~/actions/printer'

function* fetchPrinterData(params) {
  try {
    yield put({
      type: PRINTER_DATA_RECEIVED,
      payload: { entity: params.payload.entity }
    })
  } catch (error) {
    yield put({ type: LOAD_PRINTER_DATA_FAILED, error })
  }
}

export function* printerSagas() {
  yield takeEvery(LOAD_PRINTER_DATA, fetchPrinterData)
}
