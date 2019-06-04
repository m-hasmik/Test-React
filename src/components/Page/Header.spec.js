import React from 'react'
import { cleanup, render } from 'react-testing-library'

import { Header as PageHeader } from './Header'

const renderComponent = props => render(<PageHeader {...props} />)

describe('<PageHeader /> shallow', () => {
  afterEach(cleanup)

  it('contains two sections', () => {
    const { container } = renderComponent()
    const sectionsNumber = container.querySelectorAll(
      '[data-testid="header-section"]'
    ).length
    expect(sectionsNumber).toBe(2)
  })

  it('matches the snapshot', () => {
    const { container } = renderComponent({ title: 'Hello World' })
    expect(container).toMatchSnapshot()
  })
})
