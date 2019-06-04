// @flow
import axios from 'axios'

import { SERVER_URL } from '~/constants/server'
import type { Menu } from '~/types/menu'
import { normalizer } from './normalizers/menu'

export type Menus = {
  data: Array<Menu>
}

const MenusAPI = {
  get: async (): Promise<Menus> => {
    return axios
      .get(
        `${SERVER_URL}/sap/opu/odata/sap/zcm_menuplanning_srv/ZC_MenuPlanning`,
        {
          params: {
            $filter: 'IsActiveEntity eq true'
          }
        }
      )
      .then(response => {
        const menus = response.data.d.results
        return { data: menus.map(result => normalizer(result)) }
      })
      .catch(error => {
        return { data: [], error }
      })
  },
  getMongo: async (): Promise<Menus> => {
    return axios
      .get(
        `https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchmatrix-mtxou/service/StitchGetService/incoming_webhook/GetSites`
      )
      .then(response => {
        const data = response.data
        return { data }
      })
      .catch(error => {
        return { data: [], error }
      })
  }
}

export default MenusAPI
