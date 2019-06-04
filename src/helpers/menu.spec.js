import faker from 'faker'

import { getRecipeIds } from './menu'

describe('#getRecipeIds', () => {
  it('extracts recipe ids from list', () => {
    const recipeOne = {
      recipeUUID: faker.random.uuid(),
      plan: { menuUUID: faker.random.uuid() }
    }
    const recipeTwo = {
      recipeUUID: faker.random.uuid(),
      plan: { menuUUID: faker.random.uuid() }
    }
    const recipeThree = {
      recipeUUID: faker.random.uuid(),
      plan: { menuUUID: faker.random.uuid() }
    }
    const recipeFour = null

    const recipes = [recipeOne, recipeTwo, recipeThree, recipeFour]
    const expectedResult = [
      recipeOne.plan.menuUUID,
      recipeTwo.plan.menuUUID,
      recipeThree.plan.menuUUID
    ]
    expect(getRecipeIds(recipes)).toEqual(expectedResult)
  })
})
