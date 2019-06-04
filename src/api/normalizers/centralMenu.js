//@flow
import type { CentralMenu } from '~/types/centralMenu'

export const normalizer = (data: Object): CentralMenu => ({
  MenuDescription: data.MenuDescription,
  MenuID: data.MenuID,
  Duration: data.Duration,
  Sector: data.Sector,
  DayPart: data.DayPart
})
