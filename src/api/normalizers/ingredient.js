// @flow
import type { Ingredient } from '~/types/ingredient'

export const normalizer = (data: Object): Ingredient => ({
  ingredientUUID: data.RcpFmlaItemUUID,
  reference: data.SpecificationInternalID,
  lang: data.Lang,
  name: data.ingtext.toLowerCase(),
  type: data.descType,
  material: data.Material,
  quantity: parseFloat(data.RcpFmlaItemQuantity),
  unit: data.RcpFmlaItemUnit
})
