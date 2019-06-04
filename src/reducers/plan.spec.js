import faker from 'faker'
import moment from 'moment'

import { formatToDate } from '~/helpers/dates'
import { PLAN_RECEIVED, loadPlan, removeRecipe } from '~/actions/plan'
import reducer, { initialState } from './plan'

describe('Plan Reducer', () => {
  describe('when Loading Plan', () => {
    it('sets isFetching to true', () => {
      const modifiedState = { ...initialState }
      const action = loadPlan(faker.random.uuid())
      const nextState = reducer(modifiedState, action)
      expect(nextState.isFetching).toBeTruthy()
    })
  })

  describe('with recipes', () => {
    // **NOTE**: JavaScript dates work with milliseconds and UNIX timestamps do not.
    const data = [
      {
        dayPart: 'lunch',
        name: 'Lunch Menu Two (2)',
        plan: {
          menuUUID: faker.random.uuid(),
          serveAt:
            moment()
              .add(2, 'hours')
              .unix() * 1000
        }
      },
      {
        dayPart: 'lunch',
        name: 'Lunch Menu Two (3)',
        plan: {
          menuUUID: faker.random.uuid(),
          serveAt:
            moment()
              .add(1, 'days')
              .unix() * 1000
        }
      },
      {
        dayPart: 'lunch',
        name: 'Lunch Menu One (1)',
        plan: {
          menuUUID: faker.random.uuid(),
          serveAt: moment().unix() * 1000
        }
      },
      {
        dayPart: 'breakfast',
        name: 'Breakfast Menu One (1)',
        plan: {
          menuUUID: faker.random.uuid(),
          serveAt: moment().unix() * 1000
        }
      }
    ]

    it('arranges recipes into day and time frame collections', () => {
      const modifiedState = { ...initialState }
      const action = { type: PLAN_RECEIVED, payload: { planning: data } }
      const nextState = reducer(modifiedState, action)

      const today = formatToDate(moment().unix() * 1000)
      const tomorrow = formatToDate(
        moment()
          .add(1, 'days')
          .unix() * 1000
      )

      expect(nextState.planning).toEqual({
        [today]: {
          breakfast: [data[3]],
          lunch: [data[0], data[2]]
        },
        [tomorrow]: {
          lunch: [data[1]]
        }
      })
    })

    it('removes an item from the collection', () => {
      const modifiedState = { ...initialState, recipes: data }
      const action = removeRecipe(data[2].plan.menuUUID)
      const nextState = reducer(modifiedState, action)
      expect(nextState.recipes.length).toBe(data.length - 1)
      expect(nextState.recipes).not.toContain(data[2])
    })
  })
})
