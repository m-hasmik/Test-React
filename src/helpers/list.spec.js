import { sortItemsBy } from './list'

describe('#sortItemsBy', () => {
  it('sorts array by Object key', () => {
    const TEST_ITEMS = [
      {
        name: 'A name',
        number: '12345678',
        email: 'aname@email.com'
      },
      {
        name: 'c name',
        number: '987654321',
        email: 'Cname@email.com'
      },
      {
        name: 'B name',
        number: '12345',
        email: 'bname@email.com'
      }
    ]
    const expectedResult = [TEST_ITEMS[1], TEST_ITEMS[2], TEST_ITEMS[0]]
    expect(sortItemsBy('name', TEST_ITEMS)).toEqual(expectedResult)
  })

  describe('when value is a number', () => {
    it('sorts array by Object key', () => {
      const TEST_ITEMS = [
        {
          name: 'A name',
          number: '12345678',
          email: 'aname@email.com'
        },
        {
          name: 'c name',
          number: '987654321',
          email: 'Cname@email.com'
        },
        {
          name: 'B name',
          number: '12345',
          email: 'bname@email.com'
        }
      ]
      const expectedResult = [TEST_ITEMS[1], TEST_ITEMS[0], TEST_ITEMS[2]]
      expect(sortItemsBy('number', TEST_ITEMS)).toEqual(expectedResult)
    })
  })
})
