import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import 'jest-styled-components'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock
