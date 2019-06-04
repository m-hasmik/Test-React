// @flow
import type { RSAA } from './types'

// constants
export const MENUS_RECEIVED = 'MENUS_RECEIVED'
export const LOAD_MENUS = 'LOAD_MENUS'
export const LOAD_MENUS_FAILED = 'LOAD_MENUS_FAILED'

export const MENUS_MONGO_RECEIVED = 'MENUS_MONGO_RECEIVED'
export const LOAD_MONGO_MENUS = 'LOAD_MONGO_MENUS'
export const LOAD_MONGO_MENUS_FAILED = 'LOAD_MONGO_MENUS_FAILED'

// actions
export const loadMenus = (): RSAA => ({
  type: LOAD_MENUS,
  payload: {}
})

export const loadMongoMenus = (): RSAA => ({
  type: LOAD_MONGO_MENUS,
  payload: {}
})
