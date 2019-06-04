// @flow
import {
  LOAD_MENUS,
  MENUS_RECEIVED,
  LOAD_MONGO_MENUS,
  MENUS_MONGO_RECEIVED
} from '~/actions/menus'

import type { RSAA } from '~/actions/types'
import type { Menu } from '~/types/menu'

type List = Array<Menu>

type State = {
  isFetching: boolean,
  available: List
}

export const initialState: State = {
  isFetching: false,
  available: [],
  availableMongo: []
}

const menus = (state: State = initialState, action: RSAA) => {
  switch (action.type) {
    case LOAD_MONGO_MENUS:
    case LOAD_MENUS:
      return {
        ...state,
        isFetching: true
      }
    case MENUS_RECEIVED:
      return {
        ...state,
        available: action.payload.menus,
        isFetching: false
      }
    case MENUS_MONGO_RECEIVED:
      return {
        ...state,
        availableMongo: action.payload.mongoMenus,
        isFetching: false
      }
    default:
      return state
  }
}

export default menus
