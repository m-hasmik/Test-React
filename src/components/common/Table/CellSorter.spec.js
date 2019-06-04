import React from 'react'
import { render } from 'react-testing-library'

import { CellSorter } from './CellSorter'

describe('<CellSorter />', () => {
  it('renders', () => {
    const sort = jest.fn()
    render(<CellSorter sort={sort}>Hello World</CellSorter>)
  })
})
