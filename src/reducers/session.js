// @flow
import { LOGIN, LOGOUT } from '~/actions/sessions'
import { authService } from '~/helpers/authentication'

import type { RSAA } from '~/actions/types'
import type { Credentials } from '~/actions/sessions'

type State = {
  token: string | null
}

type Action = RSAA & { payload: Credentials }

export const initialState: State = {
  token: null
}

const session = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN: {
      const { username, password } = action.payload
      const token: string = authService.login(username, password)
      return { token }
    }
    case LOGOUT: {
      authService.logout()
      return initialState
    }
    default:
      return state
  }
}

export default session
