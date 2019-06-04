import faker from 'faker'
import reducer, { initialState } from './recipe'

import {
  loadRecipe,
  loadRecipeIngredients,
  loadRecipeInstructions,
  loadRecipeAttributes,
  RECIPE_RECEIVED,
  RECIPE_INGREDIENTS_RECEIVED,
  RECIPE_INSTRUCTIONS_RECEIVED,
  RECIPE_ATTRIBUTES_RECEIVED
} from '~/actions/recipe'

describe('Recipe Reducer', () => {
  describe('when Loading Recipes', () => {
    it('sets isFetching to true', () => {
      const modifiedState = { ...initialState }
      const action = loadRecipe(faker.random.uuid())
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
        type: RECIPE_RECEIVED,
        payload: {
          recipe: newRecipe
        }
      }
      const nextState = reducer(modifiedState, action)
      expect(nextState.isFetching).toBeFalsy()
      expect(nextState.recipe).toEqual(newRecipe)
    })
  })

  describe('for Ingredients', () => {
    describe('when Loading Ingredients', () => {
      it('sets isFetching to true', () => {
        const modifiedState = { ...initialState }
        const action = loadRecipeIngredients(faker.random.uuid())
        const nextState = reducer(modifiedState, action)
        expect(nextState.ingredients.isFetching).toBeTruthy()
      })
    })

    describe('when Load Ingredients was successful', () => {
      it('sets isFetching to false and adds the items to the store', () => {
        const newIngredient = {
          ingredientUUID: faker.random.uuid()
        }
        const modifiedState = { ...initialState, isFetching: true }
        const action = {
          type: RECIPE_INGREDIENTS_RECEIVED,
          payload: {
            ingredients: [newIngredient]
          }
        }
        const nextState = reducer(modifiedState, action)
        expect(nextState.ingredients.isFetching).toBeFalsy()
        expect(nextState.ingredients.items).toEqual([newIngredient])
      })
    })
  })

  describe('for Instructions', () => {
    describe('when Loading Instructions', () => {
      it('sets isFetching to true', () => {
        const modifiedState = { ...initialState }
        const action = loadRecipeInstructions(faker.random.uuid())
        const nextState = reducer(modifiedState, action)
        expect(nextState.instructions.isFetching).toBeTruthy()
      })
    })

    describe('when Load Instructions was successful', () => {
      it('sets isFetching to false and adds the items to the store', () => {
        const newInstruction = {
          instructionUUID: faker.random.uuid()
        }
        const modifiedState = { ...initialState, isFetching: true }
        const action = {
          type: RECIPE_INSTRUCTIONS_RECEIVED,
          payload: {
            instructions: [newInstruction]
          }
        }
        const nextState = reducer(modifiedState, action)
        expect(nextState.instructions.isFetching).toBeFalsy()
        expect(nextState.instructions.items).toEqual([newInstruction])
      })
    })
  })

  describe('for Attributes', () => {
    describe('when Loading Attributes', () => {
      it('sets isFetching to true', () => {
        const modifiedState = { ...initialState }
        const action = loadRecipeAttributes(faker.random.uuid())
        const nextState = reducer(modifiedState, action)
        expect(nextState.attributes.isFetching).toBeTruthy()
      })
    })

    describe('when Load Attributes was successful', () => {
      it('sets isFetching to false and adds the items to the store', () => {
        const newAttribute = {
          attributeUUID: faker.random.uuid()
        }
        const modifiedState = { ...initialState, isFetching: true }
        const action = {
          type: RECIPE_ATTRIBUTES_RECEIVED,
          payload: {
            attributes: [newAttribute]
          }
        }
        const nextState = reducer(modifiedState, action)
        expect(nextState.attributes.isFetching).toBeFalsy()
        expect(nextState.attributes.items).toEqual([newAttribute])
      })
    })
  })
})
