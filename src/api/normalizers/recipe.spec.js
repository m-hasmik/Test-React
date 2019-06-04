import faker from 'faker'
import { normalizer } from './recipe'

describe('normalizer', () => {
  const dateAsInteger = faker.random.number()

  const rawData = {
    DayPart: faker.random.word(),
    description: faker.random.uuid(),
    imagelink: faker.image.imageUrl(),
    Organic: 'NO',
    r_cost: faker.commerce.price(),
    r_currency: faker.random.word(),
    r_gpp: faker.commerce.price(),
    r_portion: faker.random.number(),
    r_price: faker.commerce.price(),
    Recipe: faker.random.alphaNumeric(),
    RecipePrimaryOutput: faker.random.number(),
    RecipeUUID: faker.random.alphaNumeric(),
    MenuPlanDate: `Date(${dateAsInteger})`
  }

  it('returns a simplified version of the data', () => {
    const expectedOutput = {
      cost: Number(rawData.r_cost),
      currency: rawData.r_currency.toLowerCase(),
      dayPart: rawData.DayPart.toLowerCase(),
      grossProfitMargin: rawData.r_gpp,
      isOrganic: false,
      hasOrphan: false,
      name: rawData.description,
      photoUrl: rawData.imagelink,
      portion: rawData.r_portion,
      price: rawData.r_price,
      recipeUUID: rawData.RecipeUUID,
      reference: rawData.Recipe,
      plan: {
        serveAt: dateAsInteger,
        menuUUID: undefined,
        order: 0
      },
      quantities: {
        original: undefined,
        changed: undefined
      }
    }

    expect(normalizer(rawData)).toEqual(expectedOutput)
  })
})
