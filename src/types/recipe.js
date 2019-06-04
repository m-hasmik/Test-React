// @flow
import type { DayPart } from '~/types/dayPart'

export type Recipe = {
  cost: number,
  currency: string,
  dayPart: DayPart,
  grossProfitMargin: string,
  isOrganic: boolean,
  hasOrphan: boolean,
  name: string,
  photoUrl: string,
  portion: number,
  price: number,
  rating: number,
  recipeUUID: string,
  reference: string,
  type: string,
  plan: {
    menuUUID: string,
    serveAt: ?number,
    order: number
  },
  quantities: {
    original: number,
    changed: number
  }
}
