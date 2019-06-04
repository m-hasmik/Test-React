import faker from 'faker'

import { preloadPrinterQueue, cleanPrinterQueue } from '~/actions/printer'
import reducer, { initialState } from './printer'

describe('Printer Reducer', () => {
  describe('when preloading planning view', () => {
    it('sets the data object to a Menu when empty', () => {
      const newData = [faker.random.uuid(), faker.random.uuid()]

      const modifiedState = { ...initialState }
      const action = preloadPrinterQueue(newData)

      const nextState = reducer(modifiedState, action)
      expect(nextState.data).toBe(newData)
    })

    it('replaces previous planning', () => {
      const oldData = [faker.random.uuid(), faker.random.uuid()]
      const newData = [faker.random.uuid(), faker.random.uuid()]

      const modifiedState = { ...initialState, data: oldData }
      const action = preloadPrinterQueue(newData)
      const nextState = reducer(modifiedState, action)
      expect(nextState.data).toBe(newData)
    })
  })

  describe('when clean queue is requested', () => {
    it('resets the store', () => {
      const oldData = [faker.random.uuid(), faker.random.uuid()]

      const modifiedState = { ...initialState, data: oldData }
      const action = cleanPrinterQueue()
      const nextState = reducer(modifiedState, action)
      expect(nextState.data).toBeNull()
      expect(nextState.isFetching).toBeFalsy()
    })
  })
})
