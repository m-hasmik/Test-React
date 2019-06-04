// @flow
import { LOAD_CONDITIONS } from '~/actions/conditions'

import type { RSAA } from '~/actions/types'
import type { Conditions } from '~/types/conditions'

type List = Array<Conditions>

type State = {
  isFetching: boolean,
  available: List
}

export const initialState: State = {
  isFetching: false,
  available: []
}

const conditions = (state: State = initialState, action: RSAA) => {
  switch (action.type) {
    case LOAD_CONDITIONS:
      return {
        ...state,
        isFetching: true
      }
    default:
      return state
  }
}

export default conditions
