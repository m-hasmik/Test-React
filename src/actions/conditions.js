// @flow
import type { RSAA } from './types'

// constants
export const LOAD_CONDITIONS = 'LOAD_CONDITIONS'
export const LOAD_CONDITIONS_FAILED = 'LOAD_CONDITIONS_FAILED'

// actions
export const loadConditions = (): RSAA => ({
  type: LOAD_CONDITIONS,
  payload: {}
})
