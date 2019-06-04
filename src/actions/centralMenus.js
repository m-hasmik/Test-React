// @flow
import type { RSAA } from './types'

// constants
export const CENTRAL_MENUS_RECEIVED = 'CENTRAL_MENUS_RECEIVED'
export const LOAD_CENTRAL_MENUS = 'LOAD_CENTRAL_MENUS'
export const LOAD_CENTRAL_MENUS_FAILED = 'LOAD_CENTRAL_MENUS_FAILED'

export const CENTRAL_MENUS_SAP_RECEIVED = 'CENTRAL_MENUS_SAP_RECEIVED'
export const LOAD_CENTRAL_MENUS_SAP = 'LOAD_CENTRAL_MENUS_SAP'
export const LOAD_CENTRAL_MENUS_SAP_FAILED = 'LOAD_CENTRAL_MENUS_SAP_FAILED'
// actions
export const loadCentralMenus = (): RSAA => ({
  type: LOAD_CENTRAL_MENUS,
  payload: {}
})

export const loadCentralMenusSAP = (): RSAA => ({
  type: LOAD_CENTRAL_MENUS_SAP,
  payload: {}
})
