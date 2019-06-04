//@flow
export type CentralPlanningType = {
  dishName: string,
  maxValue: number,
  minValue: number,
  weeks: Array<WeekType>
}

export type WeekType = {
  weekNo: number,
  weekDays: Array<WeekDays>
}

export type WeekDays = {
  key: string,
  value: Object
}

export type ValueType = {
  min: number,
  max: number
}
