// @flow
import axios from 'axios'

import { SERVER_URL } from '~/constants/server'
import { normalizer } from './normalizers/recipe'
import type { Recipes } from './recipes'

const PlanningAPI = {
  getRecipes: async (id: string): Promise<Recipes> => {
    const filters = `MenuKey=guid'${id}',IsActiveEntity=true`
    return axios
      .get(
        `${SERVER_URL}/sap/opu/odata/sap/zcm_menuplanning_srv/ZC_MenuPlanning(${filters})/to_Item`
      )
      .then(response => {
        const recipes = response.data.d.results
        return { data: recipes.map(result => normalizer(result)) }
      })
      .catch(error => {
        return { data: error.message, error }
      })
  }
}

export default PlanningAPI
