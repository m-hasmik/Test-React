import faker from 'faker'
import moment from 'moment'

import { WORKDAYS, WEEKDAYS } from '~/constants/dates'
import { getDate, getCurrentWeek, getCurrentDays } from './dates'

describe('#getDate', () => {
  it('extracts integers from SAP formatted Date String', () => {
    const dateAsInteger = faker.random.number()
    const SAPDate = `Date(${dateAsInteger})`
    expect(getDate(SAPDate)).toEqual(dateAsInteger)
  })

  it('returns zero (0) when there are no integers in the string', () => {
    const SAPDate = `Date()`
    expect(getDate(SAPDate)).toBe(0)
  })

  describe('with non SAP strings', () => {
    it('extracts integers', () => {
      const dateAsInteger = faker.random.number()
      const randomStringFormat = `Random${dateAsInteger}Format`
      expect(getDate(randomStringFormat)).toEqual(dateAsInteger)
    })

    it('returns zero (0) when there are no integers in the string', () => {
      const SAPDate = `StringWith No Number found`
      expect(getDate(SAPDate)).toBe(0)
    })
  })

  describe('with empty input', () => {
    it('returns null', () => {
      expect(getDate()).toBeNull()
    })
  })
})

describe('#getCurrentWeek', () => {
  it('returns an array of momentjs objects', () => {
    const specificDate = moment.utc(new Date('2018-11-02'))
    // expected values
    const thatMonday = moment.utc(new Date('2018-10-29'))
    const thatTuesday = moment.utc(new Date('2018-10-30'))
    const thatWednesday = moment.utc(new Date('2018-10-31'))
    const thatThursday = moment.utc(new Date('2018-11-01'))
    const thatFriday = moment.utc(new Date('2018-11-02'))
    const thatSaturday = moment.utc(new Date('2018-11-03'))
    const thatSunday = moment.utc(new Date('2018-11-04'))

    const result = getCurrentWeek(specificDate)

    expect(result.length).toBe(WEEKDAYS.length)
    expect(result[0]).toEqual(thatMonday.toDate())
    expect(result[1]).toEqual(thatTuesday.toDate())
    expect(result[2]).toEqual(thatWednesday.toDate())
    expect(result[3]).toEqual(thatThursday.toDate())
    expect(result[4]).toEqual(thatFriday.toDate())
    expect(result[5]).toEqual(thatSaturday.toDate())
    expect(result[6]).toEqual(thatSunday.toDate())
  })

  it('hides weekends when requested', () => {
    const specificDate = moment.utc(new Date('2018-11-02'))
    // expected values
    const thatMonday = moment.utc(new Date('2018-10-29'))
    const thatTuesday = moment.utc(new Date('2018-10-30'))
    const thatWednesday = moment.utc(new Date('2018-10-31'))
    const thatThursday = moment.utc(new Date('2018-11-01'))
    const thatFriday = moment.utc(new Date('2018-11-02'))

    const result = getCurrentWeek(specificDate, { withWeekend: false })

    expect(result.length).toBe(WORKDAYS.length)
    expect(result[0]).toEqual(thatMonday.toDate())
    expect(result[1]).toEqual(thatTuesday.toDate())
    expect(result[2]).toEqual(thatWednesday.toDate())
    expect(result[3]).toEqual(thatThursday.toDate())
    expect(result[4]).toEqual(thatFriday.toDate())
  })
})

describe('#getCurrentDays', () => {
  it('returns the next days for the date passed in', () => {
    const specificDate = moment.utc(new Date('2018-11-02'))
    const nextDate = moment.utc(new Date('2018-11-03'))
    const endDate = moment.utc(new Date('2018-11-04'))

    const result0 = getCurrentDays(specificDate, 0)
    expect(result0.length).toBe(1)
    expect(result0[0]).toEqual(specificDate.toDate())

    const result1 = getCurrentDays(specificDate, 1)
    expect(result1.length).toBe(1)
    expect(result1[0]).toEqual(specificDate.toDate())

    const result3 = getCurrentDays(specificDate, 3)
    expect(result3.length).toBe(3)
    expect(result3[0]).toEqual(specificDate.toDate())
    expect(result3[1]).toEqual(nextDate.toDate())
    expect(result3[2]).toEqual(endDate.toDate())

    const result4 = getCurrentDays(specificDate, 4)
    const newEndDate = moment.utc(new Date('2018-11-05'))
    expect(result4.length).toBe(4)
    expect(result4[0]).toEqual(specificDate.toDate())
    expect(result4[1]).toEqual(nextDate.toDate())
    expect(result4[2]).toEqual(endDate.toDate())
    expect(result4[3]).toEqual(newEndDate.toDate())
  })
})
