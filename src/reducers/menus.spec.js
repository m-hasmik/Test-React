import faker from 'faker'
import reducer, { initialState } from './menus'

import { loadMenus, MENUS_RECEIVED } from '~/actions/menus'

describe('Menus Reducer', () => {
  describe('when Loading Menus', () => {
    it('sets isFetching to true', () => {
      const modifiedState = { ...initialState }
      const action = loadMenus()
      const nextState = reducer(modifiedState, action)
      expect(nextState.isFetching).toBeTruthy()
    })
  })

  describe('when Load Menus was successful', () => {
    it('sets isFetching to false and adds the Menus to the store', () => {
      const newMenu = {
        menuUUID: faker.random.uuid()
      }
      const modifiedState = { ...initialState, isFetching: true }
      const action = {
        type: MENUS_RECEIVED,
        payload: {
          menus: [newMenu]
        }
      }
      const nextState = reducer(modifiedState, action)
      expect(nextState.isFetching).toBeFalsy()
      expect(nextState.available).toEqual([newMenu])
    })
  })
})
