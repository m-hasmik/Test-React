import faker from 'faker'
import { normalizer } from './ingredient'

describe('normalizer', () => {
  const rawData = {
    SpecificationInternalID: faker.random.uuid(),
    RcpFmlaItemUUID: faker.random.uuid(),
    Lang: faker.random.locale(),
    ingtext: faker.commerce.productName(),
    descType: faker.commerce.productAdjective(),
    Material: faker.commerce.productMaterial(),
    RcpFmlaItemQuantity: faker.random.number(),
    RcpFmlaItemUnit: faker.random.word()
  }

  it('returns a simplified version of the data', () => {
    const expectedOutput = {
      ingredientUUID: rawData.RcpFmlaItemUUID,
      reference: rawData.SpecificationInternalID,
      lang: rawData.Lang,
      name: rawData.ingtext.toLowerCase(),
      type: rawData.descType,
      material: rawData.Material,
      quantity: parseFloat(rawData.RcpFmlaItemQuantity),
      unit: rawData.RcpFmlaItemUnit
    }

    expect(normalizer(rawData)).toEqual(expectedOutput)
  })
})
