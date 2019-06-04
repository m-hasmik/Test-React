// @flow
export type Menu = {
  isActive: boolean,
  id: string,
  reference: string,
  dates: {
    from: number,
    to: number
  },
  concept: string,
  description: string,
  type: string,
  status: string,
  createdAt: ?number,
  createdBy: string,
  createdByDescription: string,
  updatedAt: ?number,
  updatedAtBy: string,
  updatedAtDescription: string,
  activatedId: string,
  hasDraft: boolean,
  hasActiveId: boolean,
  siteId: string,
  draft: {
    isActive: boolean,
    createdAt: ?number,
    updatedAt: ?number
  }
}
