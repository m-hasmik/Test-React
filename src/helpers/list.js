// @flow
import get from 'lodash/get'

import type { directions } from '~/types/list'

export const sortItemsBy = (
  key: string | Array<string>,
  items: Array<Object>,
  direction: directions
): Array<Object> => {
  if (direction === 'asc') {
    return items.sort((a: Object, b: Object) =>
      get(a, key) > get(b, key) ? 1 : get(b, key) > get(a, key) ? -1 : 0
    )
  }
  return items.sort((a: Object, b: Object) =>
    get(a, key) > get(b, key) ? -1 : get(b, key) > get(a, key) ? 1 : 0
  )
}
