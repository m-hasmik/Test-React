import faker from 'faker'
import { normalizer } from './instructions'

describe('normalizer', () => {
  const rawData = {
    RecipeUUID: faker.random.uuid(),
    Instructions: faker.random.uuid(),
    LanguageKey: faker.random.locale()
  }

  it('returns a simplified version of the data', () => {
    const expectedOutput = {
      instructionUUID: `InstructionsFrom-${rawData.RecipeUUID}`,
      content: rawData.Instructions,
      lang: rawData.LanguageKey
    }

    expect(normalizer(rawData)).toEqual(expectedOutput)
  })
})
