// @flow
import axios from 'axios'

import type { conditates } from '~/types/conditates'
import { normalizer } from './normalizers/centralMenu'

export type Conditions = {
  data: Array<conditates>
}

const ConditionAPI = {
  get: async (): Promise<Conditions> => {
    return axios
      .get(
        `https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchmatrix-mtxou/service/StitchPostService/incoming_webhook/conditionwebhook0`
      )
      .then(response => {
        console.log(
          'ConditionAPIConditionAPIConditionAPIConditionAPIConditionAPI',
          response
        )
      })
      .catch(error => {
        console.log(
          'ConditionAPIConditionAPIConditionAPIConditionAPIConditionAPI',
          error
        )
        return { data: [], error }
      })
  },

  create: async (): Promise<Conditions> => {
    return axios
      .post(
        `https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchmatrix-mtxou/service/StitchPostService/incoming_webhook/conditionwebhook0`
      )
      .then(response => {
        // const centralMenus = response.data.d.results
        // console.log(response)
        // console.log({ data: centralMenus.map(result => normalizer(result)) })
        // return { data: centralMenus.map(result => normalizer(result)) }
        return response
      })
      .catch(error => {
        return { data: [], error }
      })
  }
}

export default ConditionAPI
