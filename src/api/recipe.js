// @flow
import axios from 'axios'

import { SERVER_URL } from '~/constants/server'
import type { Recipe } from '~/types/recipe'
import type { Ingredient } from '~/types/ingredient'
import type { Instruction } from '~/types/instruction'
import type { Attribute } from '~/types/attribute'
import { normalizer as recipeNormalizer } from './normalizers/recipe'
import { normalizer as ingredientNormalizer } from './normalizers/ingredient'
import { normalizer as instructionsNormalizer } from './normalizers/instructions'
import { normalizer as attributesNormalizer } from './normalizers/attributes'

type SingleRecipe = {
  data: Recipe
}

type Ingredients = {
  data: Array<Ingredient>
}

type Instructions = {
  data: Array<Instruction>
}

type Attributes = {
  data: Array<Attribute>
}

const RECIPE_PATH = 'sap/opu/odata/sap/zcm_menuplanning_srv/ZC_RECIPES'

const RecipeAPI = {
  get: async (id: string): Promise<SingleRecipe> => {
    return axios
      .get(`${SERVER_URL}/${RECIPE_PATH}(guid'${id}')`)
      .then(response => {
        const recipe = response.data.d
        return { data: recipeNormalizer(recipe), id }
      })
      .catch(error => {
        return { data: {}, error }
      })
  },

  getIngredients: async (id: string): Promise<Ingredients> => {
    return axios
      .get(`${SERVER_URL}/${RECIPE_PATH}(guid'${id}')/to_FormulaItem`)
      .then(response => {
        const ingredients = response.data.d.results
        return {
          data: ingredients.map(ingredient => ingredientNormalizer(ingredient)),
          id
        }
      })
      .catch(error => {
        return { data: {}, error }
      })
  },

  getAttributes: async (id: string): Promise<Attributes> => {
    return axios
      .get(`${SERVER_URL}/${RECIPE_PATH}(guid'${id}')/to_attributes`)
      .then(response => {
        const attributes = response.data.d.results
        return {
          data: attributes.map(attribute => attributesNormalizer(attribute)),
          id
        }
      })
      .catch(error => {
        return { data: {}, error }
      })
  },

  getInstructions: async (id: string): Promise<Instructions> => {
    return axios
      .get(`${SERVER_URL}/${RECIPE_PATH}(guid'${id}')/toRecipeInstructions`)
      .then(response => {
        const instructions = response.data.d.results
        return {
          data: instructions.map(instruction =>
            instructionsNormalizer(instruction)
          ),
          id
        }
      })
      .catch(error => {
        return { data: {}, error }
      })
  }
}

export default RecipeAPI
