// @flow
import type { Recipe } from '~/types/recipe'
import type { DayPart } from '~/types/dayPart'

export type DaySchedule = {
  [key: DayPart]: Array<Recipe>
}

export type Planning = {
  [key: string]: DaySchedule
}
