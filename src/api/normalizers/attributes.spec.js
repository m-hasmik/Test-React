import faker from 'faker'
import { normalizer } from './attributes'

describe('normalizer', () => {
  it('returns a simplified version of the data', () => {
    const rawData = {
      SpecificationInternalID: faker.random.uuid(),
      AllergenText: faker.random.word(),
      CompSpecQuantity: faker.random.number(),
      ComponentSpecification: faker.random.word(),
      SpecificationType: faker.random.word(),
      CompSpecUnit: faker.random.word()
    }

    const expectedOutput = {
      attributeUUID: rawData.SpecificationInternalID,
      isAllergen: true,
      name: rawData.AllergenText,
      quantity: parseFloat(rawData.CompSpecQuantity),
      specification: rawData.ComponentSpecification,
      type: rawData.SpecificationType,
      unit: rawData.CompSpecUnit
    }

    expect(normalizer(rawData)).toEqual(expectedOutput)
  })

  describe('when is not an allergen', () => {
    it('returns a simplified version of the data', () => {
      const rawData = {
        SpecificationInternalID: faker.random.uuid(),
        AllergenText: '',
        CompSpecQuantity: faker.random.number(),
        ComponentSpecification: faker.random.word(),
        SpecificationType: faker.random.word(),
        CompSpecUnit: faker.random.word()
      }

      const expectedOutput = {
        attributeUUID: rawData.SpecificationInternalID,
        isAllergen: false,
        name: rawData.AllergenText,
        quantity: parseFloat(rawData.CompSpecQuantity),
        specification: rawData.ComponentSpecification,
        type: rawData.SpecificationType,
        unit: rawData.CompSpecUnit
      }

      expect(normalizer(rawData)).toEqual(expectedOutput)
    })
  })
})
