import { arrayToSentence } from './strings'

describe('#arrayToSentence', () => {
  it('constructs a properly formatted english sentence', () => {
    const TEST_ITEMS = ['item 1', 'item 2', 'item 3']
    const expectedResult = 'item 1, item 2, and item 3'
    expect(arrayToSentence(TEST_ITEMS)).toEqual(expectedResult)
  })

  describe('with 1 item', () => {
    it('constructs a properly formatted english sentence', () => {
      const TEST_ITEMS = ['item 1']
      const expectedResult = 'item 1'
      expect(arrayToSentence(TEST_ITEMS)).toEqual(expectedResult)
    })
  })

  describe('with less than 3 items', () => {
    it('constructs a properly formatted english sentence', () => {
      const TEST_ITEMS = ['item 1', 'item 2']
      const expectedResult = 'item 1, and item 2'
      expect(arrayToSentence(TEST_ITEMS)).toEqual(expectedResult)
    })
  })
})
