// @flow
import type { RSAA } from '~/actions/types'
import {
  PRELOAD_PRINT,
  PRINTER_DATA_RECEIVED,
  LOAD_PRINTER_DATA,
  CLEAN_PRINT
} from '~/actions/printer'
import { buildPlanning } from './plan'

type State = {
  data: any,
  isFetching: boolean
}

export const initialState: State = {
  data: [],
  isFetching: false
}

const printer = (state: State = initialState, action: RSAA) => {
  switch (action.type) {
    case LOAD_PRINTER_DATA: {
      return {
        ...state,
        isFetching: true
      }
    }
    case PRELOAD_PRINT: {
      const { data } = action.payload
      return {
        data
      }
    }
    case PRINTER_DATA_RECEIVED: {
      const entity = action.payload.entity
      const preloadedData = state.data

      return {
        data: entity === 'menu' ? buildPlanning(preloadedData) : preloadedData,
        isFetching: false
      }
    }
    case CLEAN_PRINT: {
      return {
        data: null,
        isFetching: false
      }
    }
    default: {
      return state
    }
  }
}

export default printer
