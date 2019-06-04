import faker from 'faker'
import reducer, { initialState } from './recipes'
import {
  addRecipe,
  removeRecipe,
  loadRecipes,
  FILTER_RECIPES,
  RECIPES_RECEIVED
} from '~/actions/recipes'

describe('Recipes Reducer', () => {
  const recipe = {
    recipeUUID: faker.random.uuid()
  }

  describe('when selecting a Recipe', () => {
    it('adds the Recipe to the selected list', () => {
      const action = addRecipe(recipe)
      const nextState = reducer(initialState, action)
      expect(nextState.selected).toEqual([recipe])
    })

    describe('when Recipe was already added to the list', () => {
      const modifiedState = { ...initialState, selected: [recipe] }
      const action = addRecipe(recipe)
      const nextState = reducer(modifiedState, action)
      expect(nextState.selected).toEqual([recipe])
    })
  })

  describe('when removing a Recipe', () => {
    it('finds and remove the Recipe from the selected list', () => {
      const modifiedState = { ...initialState, selected: [recipe] }
      const action = removeRecipe(recipe.recipeUUID)
      const nextState = reducer(modifiedState, action)
      expect(nextState.selected).toEqual([])
    })

    describe('when Recipe does not exist', () => {
      it('returns the current Recipe list', () => {
        const otherRecipe = {
          recipeUUID: faker.random.uuid()
        }
        const modifiedState = { ...initialState, selected: [otherRecipe] }
        const action = removeRecipe(recipe.recipeUUID)
        const nextState = reducer(modifiedState, action)
        expect(nextState.selected).toEqual([otherRecipe])
      })
    })
  })

  describe('when Loading Recipes', () => {
    it('sets isFetching to true', () => {
      const modifiedState = { ...initialState }
      const action = loadRecipes()
      const nextState = reducer(modifiedState, action)
      expect(nextState.isFetching).toBeTruthy()
    })
  })

  describe('when Load Recipes was successful', () => {
    it('sets isFetching to false and adds the Recipes to the store', () => {
      const newRecipe = {
        recipeUUID: faker.random.uuid()
      }
      const modifiedState = { ...initialState, isFetching: true }
      const action = {
        type: RECIPES_RECEIVED,
        payload: {
          recipes: [newRecipe]
        }
      }
      const nextState = reducer(modifiedState, action)
      expect(nextState.isFetching).toBeFalsy()
      expect(nextState.available).toEqual([newRecipe])
    })
  })

  describe('when filtering recipes', () => {
    it('reduces the list with a variable input by name', () => {
      const recipeOne = {
        recipeUUID: faker.random.uuid(),
        name: 'Chicken'
      }
      const recipeTwo = {
        recipeUUID: faker.random.uuid(),
        name: 'Avocado'
      }
      const recipes = [recipeOne, recipeTwo]
      const value = 'avocado'

      const modifiedState = {
        ...initialState,
        available: recipes,
        filtered: recipes
      }
      const action = {
        type: FILTER_RECIPES,
        payload: {
          value: value
        }
      }
      const nextState = reducer(modifiedState, action)
      expect(nextState.available).toEqual(recipes)
      expect(nextState.filtered).toEqual([recipeTwo])
    })
  })
})
