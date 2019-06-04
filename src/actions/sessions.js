// @flow
import type { RSAA } from './types'

// constants
export const LOGIN = '@@auth/LOGIN'
export const LOGOUT = '@@auth/LOGOUT'

export type Credentials = {
  username: string,
  password: string
}

// actions
export const addSession = (credentials: Credentials): RSAA => ({
  type: LOGIN,
  payload: credentials
})

export const removeSession = (): RSAA => ({
  type: LOGOUT,
  payload: {}
})
