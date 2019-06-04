import faker from 'faker'
import { normalizer } from './menu'

describe('normalizer', () => {
  const dateAsInteger = faker.random.number()

  const rawData = {
    Activation_ac: faker.random.boolean(),
    Copy_menu_ac: faker.random.boolean(),
    Edit_ac: faker.random.boolean(),
    Preparation_ac: faker.random.boolean(),
    Validation_ac: faker.random.boolean(),
    MenuKey: faker.random.uuid(),
    MenuID: faker.random.uuid(),
    DateFrom: `Date(${dateAsInteger})`,
    DateTo: `Date(${dateAsInteger})`,
    SiteID: faker.random.uuid(),
    Concept: faker.random.uuid(),
    Description: faker.random.words(10),
    MenuType: faker.random.word(),
    Status: faker.random.word(),
    CreatedOn: `Date(${dateAsInteger})`,
    CreatedBy: faker.internet.userName(),
    CreatedBy_Text: faker.internet.userName(),
    LastChangedOn: `Date(${dateAsInteger})`,
    LastChangedBy: faker.internet.userName(),
    LastChangedBy_Text: faker.internet.userName(),
    ActiveUUID: faker.random.uuid(),
    DraftEntityCreationDateTime: `Date(${dateAsInteger})`,
    DraftEntityLastChangeDateTime: `Date(${dateAsInteger})`,
    HasActiveEntity: faker.random.boolean(),
    HasDraftEntity: faker.random.boolean(),
    IsActiveEntity: faker.random.boolean()
  }

  it('returns a simplified version of the data', () => {
    const expectedOutput = {
      isActive: rawData.Activation_ac,
      id: rawData.MenuKey,
      reference: rawData.MenuID,
      dates: {
        from: dateAsInteger,
        to: dateAsInteger
      },
      concept: rawData.Concept,
      description: rawData.Description,
      type: rawData.MenuType,
      status: rawData.Status,
      createdAt: dateAsInteger,
      createdBy: rawData.CreatedBy,
      createdByDescription: rawData.CreatedBy_Text,
      updatedAt: dateAsInteger,
      updatedAtBy: rawData.LastChangedBy,
      updatedAtDescription: rawData.LastChangedBy_Text,
      activatedId: rawData.ActiveUUID,
      hasDraft: rawData.HasDraftEntity,
      hasActiveId: rawData.HasActiveEntity,
      siteId: rawData.SiteID,
      draft: {
        isActive: rawData.IsActiveEntity,
        createdAt: dateAsInteger,
        updatedAt: dateAsInteger
      }
    }

    expect(normalizer(rawData)).toEqual(expectedOutput)
  })
})
