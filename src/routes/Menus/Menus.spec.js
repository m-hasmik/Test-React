import moment from 'moment'

import { filteredByDates } from './Menus'

describe('#filteredByDates', () => {
  it('filters out dates outside of the range', () => {
    const data = [
      {
        name: 'Menu in Range One (1)',
        dates: { from: moment().add(1, 'hours'), to: moment().add(2, 'weeks') }
      },
      {
        name: 'Menu outside range',
        dates: { from: moment().add(3, 'days'), to: moment().add(1, 'weeks') }
      },
      {
        name: 'Menu in Range One (2)',
        dates: { from: moment().add(2, 'days'), to: moment().add(4, 'weeks') }
      }
    ]

    expect(filteredByDates(data, [moment(), moment().add(2, 'days')])).toEqual([
      data[0],
      data[2]
    ])
  })
})
