// @flow
import axios from 'axios'

import { SERVER_URL } from '~/constants/server'
import type { Recipe } from '~/types/recipe'
import { normalizer } from './normalizers/recipe'

export type Recipes = {
  data: Array<Recipe>
}

const RecipesAPI = {
  get: async (): Promise<Recipes> => {
    return axios
      .get(`${SERVER_URL}/sap/opu/odata/sap/zcm_menuplanning_srv/ZC_RECIPES`)
      .then(response => {
        const recipes = response.data.d.results
        return { data: recipes.map(result => normalizer(result)) }
      })
      .catch(error => {
        return { data: [], error }
      })
  }
}

export default RecipesAPI
