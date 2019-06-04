// @flow
import axios from 'axios'

import { SERVER_URL } from '~/constants/server'
import type { CentralMenu } from '~/types/centralMenu'
import { normalizer } from './normalizers/centralMenu'

export type CentralMenus = {
  data: Array<CentralMenu>
}

const CentralMenusAPI = {
  get: async (): Promise<CentralMenus> => {
    return axios
      .get(
        `https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchmatrix-mtxou/service/StitchGetService/incoming_webhook/webhook0`
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
  },
  getSAP: async (): Promise<CentralMenus> => {
    return axios
      .get(
        `${SERVER_URL}/sap/opu/odata/sap/ZCM_CENTRALMENU_SRV/ZA_CentralMenu?$format=json`
      )
      .then(response => {
        const centralMenus = response.data.d.results
        console.log(response)
        console.log({ data: centralMenus.map(result => normalizer(result)) })
        return { data: centralMenus.map(result => normalizer(result)) }
      })
      .catch(error => {
        return { data: [], error }
      })
  }
}

export default CentralMenusAPI
