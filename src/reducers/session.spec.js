import faker from 'faker'
import reducer, { initialState } from './session'
import { addSession, removeSession } from '~/actions/sessions'

describe('Session Reducer', () => {
  const credentials = {
    username: faker.random.word(),
    password: faker.random.alphaNumeric()
  }

  describe('when selecting a Recipe', () => {
    it('adds the Recipe to the selected list', () => {
      const action = addSession(credentials)
      const nextState = reducer(initialState, action)
      expect(nextState.token).not.toEqual(null)
    })
  })

  describe('when removing a Recipe', () => {
    it('finds and remove the Recipe from the selected list', () => {
      const modifiedState = {
        ...initialState,
        token: faker.random.alphaNumeric()
      }
      const action = removeSession()
      const nextState = reducer(modifiedState, action)
      expect(nextState.token).toEqual(null)
    })
  })
})
