// @flow
import get from 'lodash/get'

import { getDate } from '~/helpers/dates'
import type { Recipe } from '~/types/recipe'

export const normalizer = (data: Object): Recipe => ({
  cost: Number(data.r_cost) || Number(data.RecipeCost),
  currency: (
    get(data, 'r_currency', '€') || get(data, 'Currency', '€')
  ).toLowerCase(),
  dayPart: (get(data, 'DayPart', '') || get(data, 'Daypart', '')).toLowerCase(),
  grossProfitMargin: data.r_gpp,
  isOrganic: !!(data.Organic === 'YES'),
  hasOrphan: false,
  name: get(data, 'description', '') || get(data, 'Description', ''),
  photoUrl: data.imagelink || data.ImageLink,
  portion: data.r_portion,
  price: data.r_price || data.SellingPrice,
  rating: data.star_rating,
  recipeUUID: data.RecipeUUID,
  reference: data.Recipe,
  type: data.RecipeType,
  plan: {
    menuUUID: data.ItemKey,
    serveAt: getDate(data.MenuPlanDate),
    order: Number(get(data, 'DishType', 0))
  },
  quantities: {
    original: data.OriginalMenuQuantity,
    changed: data.ChangedMenuQuantity
  }
})
