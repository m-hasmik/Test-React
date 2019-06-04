// @flow
import { getDate } from '~/helpers/dates'
import type { Menu } from '~/types/menu'

export const normalizer = (data: Object): Menu => ({
  isActive: data.Activation_ac,
  id: data.MenuKey,
  reference: data.MenuID,
  dates: {
    from: getDate(data.DateFrom) || 0,
    to: getDate(data.DateTo) || 0
  },
  activatedId: data.ActiveUUID,
  concept: data.Concept,
  createdAt: getDate(data.CreatedOn),
  createdBy: data.CreatedBy,
  createdByDescription: data.CreatedBy_Text,
  description: data.Description,
  hasActiveId: data.HasActiveEntity,
  hasDraft: data.HasDraftEntity,
  siteId: data.SiteID,
  status: data.Status,
  type: data.MenuType,
  updatedAt: getDate(data.LastChangedOn),
  updatedAtBy: data.LastChangedBy,
  updatedAtDescription: data.LastChangedBy_Text,
  draft: {
    isActive: data.IsActiveEntity,
    createdAt: getDate(data.DraftEntityCreationDateTime),
    updatedAt: getDate(data.DraftEntityLastChangeDateTime)
  }
})
