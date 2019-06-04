// @flow
import type { Attribute } from '~/types/attribute'

export const normalizer = (data: Object): Attribute => ({
  attributeUUID: data.SpecificationInternalID,
  isAllergen: !!(data.AllergenText && data.AllergenText.length > 0),
  name: data.AllergenText,
  quantity: parseFloat(data.CompSpecQuantity),
  specification: data.ComponentSpecification,
  type: data.SpecificationType,
  unit: data.CompSpecUnit
})
