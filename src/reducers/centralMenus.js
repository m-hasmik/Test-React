// @flow
import {
  LOAD_CENTRAL_MENUS,
  LOAD_CENTRAL_MENUS_SAP,
  CENTRAL_MENUS_RECEIVED,
  CENTRAL_MENUS_SAP_RECEIVED
} from '~/actions/centralMenus'

import type { RSAA } from '~/actions/types'
import type { CentralMenu } from '~/types/centralMenu'

type List = Array<CentralMenu>

type State = {
  isFetching: boolean,
  available: List
}

export const initialState: State = {
  isFetching: false,
  available: []
}

const centralMenus = (state: State = initialState, action: RSAA) => {
  switch (action.type) {
    case LOAD_CENTRAL_MENUS:
      return {
        ...state,
        isFetching: true
      }
    case LOAD_CENTRAL_MENUS_SAP:
      return {
        ...state,
        isFetching: true
      }
    case CENTRAL_MENUS_RECEIVED:
      return {
        ...state,
        available: action.payload.centralMenus,
        isFetching: false
      }
    case CENTRAL_MENUS_SAP_RECEIVED:
      return {
        ...state,
        available: action.payload.centralMenus,
        isFetching: false
      }
    default:
      return state
  }
}

export default centralMenus
