// @flow
import moment from 'moment'

import { DATE_FORMAT } from '~/constants/strings'

export const formatToDate = (date: number): string =>
  moment(date).format(DATE_FORMAT)

export const getDate = (rawString: string): ?number =>
  rawString ? Number(rawString.replace(/\D+/g, '')) : null

export const formatToWeekday = (date: number | string): string =>
  moment(date).format('dddd')

type CurrentWeekOptions = {
  withWeekend?: boolean
}

export const getCurrentWeek = (
  date: moment = moment(),
  { withWeekend = true }: CurrentWeekOptions = {}
): Array<Date> => {
  const startOfWeek = date.clone().startOf('isoWeek')
  const endOfWeek = withWeekend
    ? date.clone().endOf('isoWeek')
    : date
        .clone()
        .endOf('isoWeek')
        .subtract(2, 'd')
  let days = []
  let day = startOfWeek

  while (day <= endOfWeek) {
    days.push(day.toDate())
    day = day.clone().add(1, 'd')
  }
  return days
}

export const getCurrentDays = (
  date: moment = moment(),
  count: number = 1
): Array<Date> => {
  if (count === 1 || count === 0) return [date.toDate()]

  const current = date.clone()
  const endDate = date.clone().add(count, 'd')

  let days = []
  let day = current

  while (day < endDate) {
    days.push(day.toDate())
    day = day.clone().add(1, 'd')
  }

  return days
}

export const isBeforeDay = (a: moment, b: moment): boolean => {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false

  const aYear = a.year()
  const aMonth = a.month()

  const bYear = b.year()
  const bMonth = b.month()

  const isSameYear = aYear === bYear
  const isSameMonth = aMonth === bMonth

  if (isSameYear && isSameMonth) return a.date() < b.date()
  if (isSameYear) return aMonth < bMonth
  return aYear < bYear
}

export const isInclusivelyAfterDay = (a: moment, b: moment): boolean => {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false
  return !isBeforeDay(a, b)
}
